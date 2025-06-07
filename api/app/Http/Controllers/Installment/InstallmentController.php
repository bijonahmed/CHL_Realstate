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
            'customer_id'     => 'required|exists:customers,id',
            'amount'          => 'required',
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


        $slug     = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $request->input('name'))));
        $data = array(
            'name'                      => $request->name,
            'slug'                      => $slug,
            'status'                    => !empty($request->status) ? $request->status : "",
        );
        if (empty($request->id)) {
            PostCategory::create($data);
        } else {
            PostCategory::where('id', $request->id)->update($data);
        }

        $response = [
            'message' => 'Successfully insert',
        ];
        return response()->json($response);
    }

    public function GeneralCategoryList(Request $request)
    {

        //dd($request->all());
        $page = $request->input('page', 1);
        $pageSize = $request->input('pageSize', 10);

        // Get search query from the request
        $searchQuery    = $request->searchQuery;
        $selectedFilter = (int)$request->selectedFilter;
        // dd($selectedFilter);
        $query = Categorys::orderBy('id', 'desc');

        if ($searchQuery !== null) {
            $query->where('categorys.name', 'like', '%' . $searchQuery . '%');
        }

        if ($selectedFilter !== null) {

            $query->where('categorys.status', $selectedFilter);
        }
        // $query->whereNotIn('users.role_id', [2]);
        $paginator = $query->paginate($pageSize, ['*'], 'page', $page);

        $modifiedCollection = $paginator->getCollection()->map(function ($item) {
            return [
                'id'            => $item->id,
                'name'          => $item->name,
                'created_at'    => date("Y-M-d H:i:s", strtotime($item->created_at)),
                'updated_at'    => date("Y-M-d H:i:s", strtotime($item->updated_at)),
                'status'        => $item->status == 1 ? 'Active' : 'Inactive',
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
}
