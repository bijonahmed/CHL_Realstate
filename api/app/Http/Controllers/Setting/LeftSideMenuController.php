<?php

namespace App\Http\Controllers\Setting;

use Cart;
use Carbon\Carbon;
use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Log;

class LeftSideMenuController extends Controller
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

    public function dynamicMenuLeftSidebar()
    {
        $menu = [
            [
                'label' => 'Dashboard',
                'path' => '/dashboard',
                'icon' => 'bx bx-home-alt',
                'submenu' => []
            ],
             [
                'label' => 'Transaction Report',
                'path' => '/report/transaction-report',
                'icon' => 'bx bx-message-square-edit',
                'submenu' => []
            ],
            [
                'label' => 'Users Management',
                'path' => '#',
                'icon' => 'bx bx-category',
                'submenu' => [
                    //  ['label' => 'Role List', 'path' => '/user/role-list', 'icon' => 'bx bx-radio-circle'],
                    ['label' => 'Super Admin List', 'path' => '/user/superadmin-list', 'icon' => 'bx bx-radio-circle'],
                    //  ['label' => 'Admin List', 'path' => '/user/admin-list', 'icon' => 'bx bx-radio-circle'],
                   // ['label' => 'Users List', 'path' => '/user/users-list', 'icon' => 'bx bx-radio-circle'],
                    ['label' => 'Customer List', 'path' => '/user/customer-list', 'icon' => 'bx bx-radio-circle']
                ]
            ],
            [
                'label' => 'Installment ',
                'path' => '#',
                'icon' => 'bx bx-category',
                'submenu' => [
                    ['label' => 'Payment', 'path' => '/installment/pyament-list', 'icon' => 'bx bx-radio-circle'],
                  
                ]
            ],
            [
                'label' => 'Mail/SMS',
                'path' => '#',
                'icon' => 'bx bx-category',
                'submenu' => [
                    ['label' => 'Send Mail', 'path' => '/getway/send-mail', 'icon' => 'bx bx-radio-circle'],
                    ['label' => 'Send SMS', 'path' => '/getway/send-sms', 'icon' => 'bx bx-radio-circle'],
                ]
            ],

            [
                'label' => 'Post Management',
                'path' => '#',
                'icon' => 'bx bx-category',
                'submenu' => [
                    ['label' => 'Post Category', 'path' => '/category/post-category-list', 'icon' => 'bx bx-radio-circle'],
                    ['label' => 'Post List', 'path' => '/post/post-list', 'icon' => 'bx bx-radio-circle']
                ]
            ],

            [
                'label' => 'System Management',
                'path' => '#',
                'icon' => 'bx bx-category',
                'submenu' => [
                    ['label' => 'Global Category', 'path' => '/category/global-category-list', 'icon' => 'bx bx-radio-circle'],
                    ['label' => 'Frontend Setting', 'path' => '/setting/global-setting', 'icon' => 'bx bx-radio-circle'],
                    ['label' => 'Featured Properties', 'path' => '/setting/featured-properties-gallery-list', 'icon' => 'bx bx-radio-circle'],
                    ['label' => 'Slider', 'path' => '/setting/slider-list', 'icon' => 'bx bx-radio-circle'],
                    ['label' => 'Our Properties', 'path' => '/setting/properties-list', 'icon' => 'bx bx-radio-circle'],
                    ['label' => 'Gallery', 'path' => '/setting/gallery-list', 'icon' => 'bx bx-radio-circle'],
                    ['label' => 'Review List', 'path' => '/setting/review-list', 'icon' => 'bx bx-radio-circle'],
                    // ['label' => 'Merchant Request', 'path' => '/configration/config-api-key-list', 'icon' => 'bx bx-radio-circle']
                ]
            ]
        ];

        return response()->json($menu);
    }
}
