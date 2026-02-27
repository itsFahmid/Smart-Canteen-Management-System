<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'hourly_rate',
        'working_hours',
        'total_salary',
        'joined_date',
    ];

    protected $casts = [
        'hourly_rate' => 'decimal:2',
        'working_hours' => 'integer',
        'total_salary' => 'decimal:2',
        'joined_date' => 'date',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
