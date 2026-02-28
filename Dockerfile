FROM php:8.3-cli

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libsqlite3-dev \
    libxml2-dev \
    libcurl4-openssl-dev \
    libonig-dev \
    zip \
    unzip \
    && docker-php-ext-install pdo pdo_sqlite mbstring xml curl bcmath fileinfo \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /app

# Copy composer files first for caching
COPY composer.json composer.lock ./
RUN composer install --no-dev --optimize-autoloader --no-scripts

# Copy the rest of the application
COPY . .

# Re-run composer scripts
RUN composer dump-autoload --optimize

# Create SQLite database and run migrations
RUN touch database/database.sqlite

# Set permissions
RUN chmod -R 775 storage bootstrap/cache database

# Expose port
EXPOSE 8000

# Start command - migrate on boot, then serve
CMD php artisan migrate --seed --force 2>/dev/null; php artisan serve --host=0.0.0.0 --port=${PORT:-8000}
