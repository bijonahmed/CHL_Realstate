<?php

namespace App\Models;
// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use AuthorizesRequests;
use DB;

class InstallmentPayment extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
    public $table = "installment_payment";
    protected $fillable = [
        'customer_id',
        'buying_amt',
        'total_paid',
        'amount',
        'remaining_balance',
        'payment_date',
        'payment_method',
        'created_by',
        'notes',
        'image',

    ];
}
