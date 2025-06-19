<?php

namespace App\Http\Controllers\Report;

use App\Category;
use App\Http\Controllers\Controller;
use App\Models\Attribute;
use App\Models\AttributeValues;
use App\Models\Booking;
use App\Models\Categorys;
use App\Models\InstallmentPayment;
use App\Models\MiningCategory;
use App\Models\MiningHistory;
use App\Models\Mystore;
use App\Models\PostCategory;
use App\Models\Product;
use App\Models\ProductAttributes;
use App\Models\ProductAttributeValue;
use App\Models\Room;
use App\Models\RoomImages;
use App\Models\Setting;
use App\Models\SubAttribute;
use App\Models\User;
use App\Rules\MatchOldPassword;
use Auth;
use BcMath\Number;
use Carbon\Carbon;
use DB;
use Helper;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Validator;

class ReportController extends Controller
{
    protected $userid;
    public function __construct()
    {
        $this->middleware('auth:api');
        $user = auth('api')->user();
        if (!$user) {
            return response()->json(['message' => 'Unauthenticated'], 401);
        }
        $this->userid = $user->id;
    }


    public function filterByReport(Request $request)
    {

        // dd($request->all());

        $fromDate     =  $request->fromDate;
        $toDate       =  $request->toDate;
        $customerId   =  $request->customer_id;

        $chkUser = User::where('id',$customerId)->select('id','name','buying_amt')->first();

       

        $query = InstallmentPayment::query()
            ->select(
                'installment_payment.*',
                'users.name as customername'
            )
            ->leftJoin('users', 'installment_payment.customer_id', '=', 'users.id');


       
        if ($fromDate && $toDate) {
            $query->whereBetween(\DB::raw('DATE(installment_payment.created_at)'), [$fromDate, $toDate]);
        }
     
        if ($customerId) {
            $query->where('installment_payment.customer_id', $customerId);
        }
     
        $rdata = $query->get();

        
        $data['rdata']         = $rdata; 
        $data['buying_amount'] = !empty($chkUser) ? $chkUser->buying_amt : 0; 

        return response()->json($data, 200);
 
    }
}
