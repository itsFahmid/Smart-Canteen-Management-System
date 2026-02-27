<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('customer_id')->constrained('users')->onDelete('cascade');
            $table->string('customer_name', 100);
            $table->decimal('total_amount', 10, 2);
            $table->string('status', 20)->default('pending');
            $table->string('payment_method', 20);
            $table->text('special_notes')->nullable();
            $table->integer('table_number')->nullable();
            $table->integer('estimated_time')->nullable()->default(25);
            $table->string('assigned_staff', 100)->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
