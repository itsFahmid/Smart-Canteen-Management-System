<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'customer_id',
        'customer_name',
        'total_amount',
        'status',
        'payment_method',
        'special_notes',
        'table_number',
        'estimated_time',
        'assigned_staff',
    ];

    protected $casts = [
        'total_amount' => 'decimal:2',
        'table_number' => 'integer',
        'estimated_time' => 'integer',
    ];

    public function customer()
    {
        return $this->belongsTo(User::class, 'customer_id');
    }

    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }
}
