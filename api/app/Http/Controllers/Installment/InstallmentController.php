<?php

namespace App\Http\Controllers\Installment;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Auth;
use Validator;
use Helper;
use App\Models\User;
use App\Models\Categorys;
use App\Category;
use App\Models\AttributeValues;
use App\Models\Attribute;
use App\Models\InstallmentPayment;
use App\Models\MiningCategory;
use App\Models\MiningHistory;
use App\Models\Mystore;
use App\Models\PostCategory;
use App\Models\SubAttribute;
use App\Models\ProductAttributes;
use App\Models\ProductAttributeValue;
use App\Models\Product;
use Illuminate\Support\Str;
use App\Rules\MatchOldPassword;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;
use DB;

class InstallmentController extends Controller
{
    protected $userid;
    public function __construct()
    {
        $this->middleware('auth:api');
        $id = auth('api')->user();
        if (!empty($id)) {
            $user = User::find($id->id);
            $this->userid = $user->id;
        }
    }

    public function createPayment(Request $request)
    {
        //dd($request->all());


        $request->validate([
            'customer_id'     => 'required',
            'amount'          => 'required',
            'buying_amt'      => 'required',
            // 'total_paid'      => 'required',
            'payment_date'    => 'required',
            'payment_method'  => 'required',
            'notes'           => 'nullable',
            'image'           => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ], [
            'customer_id.required'    => 'Please select a customer.',
            'customer_id.exists'      => 'The selected customer does not exist.',
            'amount.required'         => 'Please enter the installment amount.',
            'amount.numeric'          => 'The amount must be a number.',
            'payment_date.required'   => 'Please choose a payment date.',
            'payment_date.date'       => 'The payment date must be a valid date.',
            'payment_method.required' => 'Please select a payment method.',
            'payment_method.string'   => 'The payment method must be valid.',
            'notes.string'            => 'The notes must be a string.',
            'image.image'             => 'The uploaded file must be an image.',
            'image.mimes'             => 'Only jpeg, png, jpg, or gif formats are allowed.',
            'image.max'               => 'The image must not be larger than 2MB.',
        ]);


        $data = array(
            'customer_id'             => $request->customer_id,
            'buying_amt'              => $request->buying_amt,
            'amount'                  => $request->amount,
            'remaining_balance'       => $request->remaining_balance,
            'payment_date'            => $request->payment_date,
            'payment_method'          => $request->payment_method,
            'created_by'              => $this->userid,
            'notes'                   => $request->notes,
        );

        if (empty($data['total_paid'])) {
            $data['total_paid'] = $request->amount;
        } else {
            $data['total_paid'] = $request->total_paid;
        }
        // dd($data);

        if (!empty($request->file('image'))) {
            $files = $request->file('image');
            $fileName = Str::random(20);
            $ext = strtolower($files->getClientOriginalExtension());
            $path = $fileName . '.' . $ext;
            $uploadPath = '/backend/files/';
            $upload_url = $uploadPath . $path;
            $files->move(public_path('/backend/files/'), $upload_url);
            $file_url = $uploadPath . $path;
            $data['image'] = $file_url;
        }


        if (empty($request->id)) {
            InstallmentPayment::create($data);
        } else {
            InstallmentPayment::where('id', $request->id)->update($data);
        }

        $response = [
            'message' => 'Successfully insert',
        ];
        return response()->json($response);
    }

    public function getInstallmentList(Request $request)
    {

        //dd($request->all());
        $page        = $request->input('page', 1);
        $pageSize    = $request->input('pageSize', 10);
        $customer_id = (int)$request->customerId;
        // dd($selectedFilter);
        $query = InstallmentPayment::orderBy('id', 'desc');

        if (!empty($customer_id)) {
            $query->where('customer_id', $customer_id);
        }

        $paginator = $query->paginate($pageSize, ['*'], 'page', $page);

        $modifiedCollection = $paginator->getCollection()->map(function ($item) {
            $checkCustomer = User::where('id', $item->customer_id)->first();
            $createdBy = User::where('id', $item->created_by)->first();

            return [
                'id'            => $item->id,
                'name'          => !empty($checkCustomer) ? $checkCustomer->name : "",
                'createdBy'     => !empty($createdBy) ? $createdBy->name : "",
                'total_paid'    => $item->total_paid,
                'payment_method' => strtoupper($item->payment_method),
                'created_at'    => date("d-M-Y", strtotime($item->created_at)),
            ];
        });
        // Return the modified collection along with pagination metadata
        return response()->json([
            'data' => $modifiedCollection,
            'current_page' => $paginator->currentPage(),
            'total_pages' => $paginator->lastPage(),
            'total_records' => $paginator->total(),
        ], 200);
    }


    public function checkInstallment(Request $request)
    {
        //dd($request->all());
        $id    = $request->id;
        $data  = InstallmentPayment::where('id', $id)->first();

        $response = [
            'data'         => $data,
            'moneyRecipt' => !empty($data->image) ? url($data->image) : "",
            'message' => 'success'
        ];
        return response()->json($response, 200);
    }



    public function installmentUserData()
    {
        //dd($request->all());
        $id      = $this->userid;
        $data    = InstallmentPayment::where('customer_id', $id)->get();
        $lastrow = InstallmentPayment::where('customer_id', $id)
            ->orderBy('payment_date', 'desc') // or 'id'
            ->first();

        $result = [];
        $amount = 0;
        foreach ($data as $key => $v) {
            $amount += (float)$v->amount; // accumulate total amount
            $result[] = [
                'id'            => $v->id,
                'total_paid'    => $v->total_paid,
                'amount'        => $v->amount,
                'payment_date'  => date("Y-M-d", strtotime($v->payment_date)),
                'payment_method' => strtoupper($v->payment_method),
                'image' => !empty($v->image) ? url($v->image) : "",
            ];
        }
        $balaneOfRem = $lastrow->buying_amt - $amount;
        $buying_amt  = !empty($lastrow->buying_amt) ? $lastrow->buying_amt : "";

        $data['installment']   = $result;
        $data['rembalance']    = !empty($lastrow) ? number_format($balaneOfRem, 2) : "";
        $data['buyAmt']        = $buying_amt;
        return response()->json($data);
    }
}
