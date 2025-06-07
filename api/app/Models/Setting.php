<?php

namespace App\Models;
// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use AuthorizesRequests;
use DB;

class Setting extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;


    public $table = "setting";

    protected $fillable = [
        'id',
        'slugan',
        'ongoing_image',
        'complete_image',
        'future_image',
        'customer_message',
        'name',
    ];

    public static function filterEmpList($data = array())
    {
        //dd($data);
        $cond = '';
        if (!empty($data['name'])) {
            $cond .= " AND employee_type.name LIKE '%" . $data['name'] . "%'";
        }
        $cond .= " ORDER BY employee_type.id DESC";
        $sqld = "SELECT * FROM `employee_type` WHERE 1 " . $cond;
        //echo $sqld;exit; 
        $results = DB::select($sqld);
        return $results;
    }
    public static function filterPayGroupList($data = array())
    {
        //dd($data);
        $cond = '';
        if (!empty($data['name'])) {
            $cond .= " AND pay_group.name LIKE '%" . $data['name'] . "%'";
        }
        $cond .= " ORDER BY pay_group.id DESC";
        $sqld = "SELECT * FROM `pay_group` WHERE 1 " . $cond;
        //echo $sqld;exit; 
        $results = DB::select($sqld);
        return $results;
    }
    public static function filterAnnualPay($data = array())
    {
        //dd($data);
        $cond = '';
        if (!empty($data['name'])) {
            $cond .= " AND annual_pay.name LIKE '%" . $data['name'] . "%'";
        }
        $cond .= " ORDER BY annual_pay.id DESC";
        $sqld = "SELECT * FROM `annual_pay` WHERE 1 " . $cond;
        //echo $sqld;exit; 
        $results = DB::select($sqld);
        return $results;
    }
    public static function filterbankMaster($data = array())
    {
        //dd($data);
        $cond = '';
        if (!empty($data['name'])) {
            $cond .= " AND bank_master.name LIKE '%" . $data['name'] . "%'";
        }
        $cond .= " ORDER BY bank_master.id DESC";
        $sqld = "SELECT * FROM `bank_master` WHERE 1 " . $cond;
        //echo $sqld;exit; 
        $results = DB::select($sqld);
        return $results;
    }
    public static function filtertaxtMaster($data = array())
    {
        //dd($data);
        $cond = '';
        if (!empty($data['name'])) {
            $cond .= " AND tax_master.name LIKE '%" . $data['name'] . "%'";
        }
        $cond .= " ORDER BY tax_master.id DESC";
        $sqld = "SELECT * FROM `tax_master` WHERE 1 " . $cond;
        //echo $sqld;exit; 
        $results = DB::select($sqld);
        return $results;
    }
    public static function filterWdges($data = array())
    {
        //dd($data);
        $cond = '';
        if (!empty($data['name'])) {
            $cond .= " AND wedges_pay_mode.name LIKE '%" . $data['name'] . "%'";
        }
        $cond .= " ORDER BY wedges_pay_mode.id DESC";
        $sqld = "SELECT * FROM `wedges_pay_mode` WHERE 1 " . $cond;
        //echo $sqld;exit; 
        $results = DB::select($sqld);
        return $results;
    }
    public static function filterPayItemlist($data = array())
    {
        //dd($data);
        $cond = '';
        if (!empty($data['name'])) {
            $cond .= " AND payroll_pay_item.name LIKE '%" . $data['name'] . "%'";
        }
        $cond .= " ORDER BY payroll_pay_item.id DESC";
        $sqld = "SELECT * FROM `payroll_pay_item` WHERE 1 " . $cond;
        //echo $sqld;exit; 
        $results = DB::select($sqld);
        return $results;
    }
    public static function filterpaymentType($data = array())
    {
        //dd($data);
        $cond = '';
        if (!empty($data['name'])) {
            $cond .= " AND payment_type.name LIKE '%" . $data['name'] . "%'";
        }
        $cond .= " ORDER BY payment_type.id DESC";
        $sqld = "SELECT * FROM `payment_type` WHERE 1 " . $cond;
        //echo $sqld;exit; 
        $results = DB::select($sqld);
        return $results;
    }
    public static function filterBShortCode($data = array())
    {
        //dd($data);
        $cond = '';
        if (!empty($data['name'])) {
            $cond .= " AND bank_short_code.name LIKE '%" . $data['name'] . "%'";
        }
        $cond .= " ORDER BY bank_short_code.id DESC";
        $sqld = "SELECT bank_short_code.*,bank_master.name as bankName FROM `bank_short_code` 
                    LEFT JOIN bank_master ON (bank_master.id=bank_short_code.bank_id) WHERE 1 " . $cond;
        //echo $sqld;exit; 
        $results = DB::select($sqld);
        return $results;
    }
   
}