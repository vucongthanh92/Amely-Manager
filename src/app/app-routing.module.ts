import { DetailAdvertiseComponent } from './admin/advertise/detail-advertise/detail-advertise.component';
import { ProductGroupDetailComponent } from './admin/product-group/product-group-detail/product-group-detail.component';
import { ProductGroupComponent } from './admin/product-group/product-group.component';
import { ProductQuantityComponent } from './admin/product/product-quantity/product-quantity.component';
import { WebsiteComponent } from './admin/config/website/website.component';
import { SettingComponent } from './admin/config/setting/setting.component';
import { PolicyComponent } from './admin/config/policy/policy.component';
import { IntegratedComponent } from './admin/config/integrated/integrated.component';
import { CensorshipComponent } from './admin/config/censorship/censorship.component';
import { ActivateComponent } from './admin/config/activate/activate.component';
import { SystemComponent } from './admin/system/system.component';
import { UserDetailComponent } from './admin/user/user-detail/user-detail.component';
import { UserComponent } from './admin/user/user.component';
import { FinanceComponent } from './admin/finance/finance.component';
import { DetailDeliveryComponent } from './admin/delivery/detail-delivery/detail-delivery.component';
import { UpdateProfileComponent } from './admin/profile/update-profile/update-profile.component';
import { AddShopComponent } from './admin/shop/add-shop/add-shop.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { ShopComponent } from './admin/shop/shop.component';
import { AddProductComponent } from './admin/product/add-product/add-product.component';
import { ProductDetailComponent } from './admin/product/product-detail/product-detail.component';
import { UpdateProductComponent } from './admin/product/update-product/update-product.component';
import { PromotionComponent } from './admin/promotion/promotion.component';
import { AddPromotionComponent } from './admin/promotion/add-promotion/add-promotion.component';
import { EditPromotionComponent } from './admin/promotion/edit-promotion/edit-promotion.component';
import { DetailPromotionComponent } from './admin/promotion/detail-promotion/detail-promotion.component';
import { AdvertiseComponent } from './admin/advertise/advertise.component';
import { OrdersComponent } from './admin/orders/orders.component';
import { DeliveryComponent } from './admin/delivery/delivery.component';
import { LoginComponent } from './authentication/login/login.component';
import { AddAdvertiseComponent } from './admin/advertise/add-advertise/add-advertise.component';
import { ProfileComponent } from './admin/profile/profile.component';
import { DetailShopComponent } from './admin/shop/detail-shop/detail-shop.component';
import { UpdateShopComponent } from './admin/shop/update-shop/update-shop.component';
import { DetailOrderComponent } from './admin/orders/detail-order/detail-order.component';
import { RedeemComponent } from './admin/redeem/redeem.component';
import { RedeemDetailComponent } from './admin/redeem/redeem-detail/redeem-detail.component';
import { CategoryComponent } from './admin/category/category.component';
import { AddCategoryComponent } from './admin/category/add-category/add-category.component';
import { EditCategoryComponent } from './admin/category/edit-category/edit-category.component';
import { DetailCategoryComponent } from './admin/category/detail-category/detail-category.component';
import { AuthGuard } from './auth.guard';
import { FinanceDetailComponent } from './admin/finance/finance-detail/finance-detail.component';
import { ExcelComponent } from './admin/config/excel/excel.component';
import { StaticPageComponent } from './admin/config/static-page/static-page.component';
import { StoresComponent } from './admin/stores/stores.component';
import { UpdateStoreComponent } from './admin/stores/update-store/update-store.component';
import { AddStoreComponent } from './admin/stores/add-store/add-store.component';
import { UserAddComponent } from './admin/user/user-add/user-add.component';
import { ProductGroupAddComponent } from './admin/product-group/product-group-add/product-group-add.component';
import { ProgressbarComponent } from './admin/progressbar/progressbar.component';
import { Page404Component } from './authentication/page404/page404.component';
import { PermissionComponent } from './admin/permission/permission.component';
import { AddPermissionComponent } from './admin/permission/add-permission/add-permission.component';
import { EditPermissionComponent } from './admin/permission/edit-permission/edit-permission.component';
import { ProductComponent } from './admin/product/product.component';
import { ResultComponent } from './authentication/result/result.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard],
        data: {
          permission: false,
          path: '/ws/v1/administrator/dashboard',
          method: 'GET'
        }
      },
      {
        path: 'shop',
        component: ShopComponent,
        canActivate: [AuthGuard],
        data: {
          permission: true,
          path: '/ws/v1/administrator/shops',
          method: 'PUT'
        }
      },
      {
        path: 'shop/add',
        component: AddShopComponent,
        canActivate: [AuthGuard],
        data: { 
          permission: true,
          path: '/ws/v1/administrator/shops',
          method: 'POST'
        }
      },
      {
        path: 'shop/:id',
        component: DetailShopComponent,
        canActivate: [AuthGuard],
        data: { 
          permission: true,
          path: '/ws/v1/administrator/shops',
          method: 'GET'
        }
      },
      {
        path: 'shop/update/:id',
        component: UpdateShopComponent,
        canActivate: [AuthGuard],
        data: { 
          permission: true,
          path: '/ws/v1/administrator/shops',
          method: 'POST'
        }
      },
      {
        path: 'stores/add/:id',
        component: AddStoreComponent,
        canActivate: [AuthGuard],
        data: { 
          permission: true,
          path: '/ws/v1/administrator/stores',
          method: 'GET'
        }
      },
      {
        path: 'stores/update/:shop_id/:store_id',
        component: UpdateStoreComponent,
        canActivate: [AuthGuard],
        data: { 
          permission: true,
          path: '/ws/v1/administrator/stores',
          method: 'POST'
        }
      },
      {
        path: 'category',
        component: CategoryComponent,
        canActivate: [AuthGuard],
        data: { 
          permission: true,
          path: '/ws/v1/administrator/categories',
          method: 'PUT'
        }
      },
      {
        path: 'category/add',
        component: AddCategoryComponent,
        canActivate: [AuthGuard],
        data: { 
          permission: true,
          path: '/ws/v1/administrator/categories',
          method: 'POST'
        }
      },
      {
        path: 'category/:id',
        component: DetailCategoryComponent,
        canActivate: [AuthGuard],
        data: { 
          permission: true,
          path: '/ws/v1/administrator/categories',
          method: 'GET'
        }
      },
      {
        path: 'category/edit/:id',
        component: EditCategoryComponent,
        canActivate: [AuthGuard],
        data: { 
          permission: true,
          path: '/ws/v1/administrator/categories',
          method: 'GET'
        }
      },
      {
        path: 'product/add',
        component: AddProductComponent,
        canActivate: [AuthGuard],
        data: { 
          permission: true,
          path: '/ws/v1/administrator/products',
          method: 'POST'
        }
      },
      {
        path: 'product/quantity',
        component: ProductQuantityComponent,
        canActivate: [AuthGuard],
        data: { 
          permission: true,
          path: '/ws/v1/administrator/product_store',
          method: 'PUT'
        }
      },
      {
        path: 'product',
        component: ProductComponent,
        canActivate: [AuthGuard],
        data: { 
          permission: true,
          path: '/ws/v1/administrator/products',
          method: 'PUT'
        }
      },
      {
        path: 'product/detail/:id',
        component: ProductDetailComponent,
        canActivate: [AuthGuard],
        data: { 
          permission: true,
          path: '/ws/v1/administrator/products',
          method: 'GET'
        }
      },
      {
        path: 'product/update/:id',
        component: UpdateProductComponent,
        canActivate: [AuthGuard],
        data: { 
          permission: true,
          path: '/ws/v1/administrator/products',
          method: 'GET'
        }
      },
      {
        path: 'product-group',
        component: ProductGroupComponent,
        canActivate: [AuthGuard],
        data: { 
          permission: true,
          path: '/ws/v1/administrator/product_group',
          method: 'PUT'
        }
      },
      {
        path: 'product-group/add',
        component: ProductGroupAddComponent,
        canActivate: [AuthGuard],
        data: { 
          permission: true,
          path: '/ws/v1/administrator/product_group',
          method: 'POST'
        }
      },
      {
        path: 'product-group/:pg_id',
        component: ProductGroupDetailComponent,
        canActivate: [AuthGuard],
        data: { 
          permission: true,
          path: '/ws/v1/administrator/product_group',
          method: 'GET'
        }
      },
      {
        path: 'promotion',
        component: PromotionComponent,
        canActivate: [AuthGuard],
        data: { 
          permission: true,
          path: '/ws/v1/administrator/promotion',
          method: 'PUT'
        }
      },
      {
        path: 'promotion/add',
        component: AddPromotionComponent,
        canActivate: [AuthGuard],
        data: { 
          permission: true,
          path: '/ws/v1/administrator/promotion',
          method: 'POST'
        }
      },
      {
        path: 'promotion/detail/:id',
        component: DetailPromotionComponent,
        canActivate: [AuthGuard],
        data: { 
          permission: true,
          path: '/ws/v1/administrator/promotion',
          method: 'GET'
        }
      },
      {
        path: 'promotion/update/:id',
        component: EditPromotionComponent,
        canActivate: [AuthGuard],
        data: { 
          permission: true,
          path: '/ws/v1/administrator/promotion',
          method: 'GET'
        }
      },
      {
        path: 'advertise',
        component: AdvertiseComponent,
        canActivate: [AuthGuard],
        data: { 
          permission: true,
          path: '/ws/v1/administrator/advertise',
          method: 'PUT'
        }
      },
      {
        path: 'advertise/add',
        component: AddAdvertiseComponent,
        canActivate: [AuthGuard],
        data: { 
          permission: true,
          path: '/ws/v1/administrator/advertise',
          method: 'POST'
        }
      },
      {
        path: 'advertise/:id',
        component: DetailAdvertiseComponent,
        canActivate: [AuthGuard],
        data: { 
          permission: true,
          path: '/ws/v1/administrator/advertise',
          method: 'GET'
        }
      },
      {
        path: 'orders',
        component: OrdersComponent,
        canActivate: [AuthGuard],
        data: { 
          permission: true,
          path: '/ws/v1/administrator/so',
          method: 'PUT'
        }
      },
      {
        path: 'order/:soId',
        component: DetailOrderComponent,
        canActivate: [AuthGuard],
        data: { 
          permission: true,
          path: '/ws/v1/administrator/so',
          method: 'GET'
        }
      },
      {
        path: 'delivery',
        component: DeliveryComponent,
        canActivate: [AuthGuard],
        data: { 
          permission: true,
          path: '/ws/v1/administrator/do',
          method: 'PUT'
        }
      },
      {
        path: 'delivery/:code_delivery',
        component: DetailDeliveryComponent,
        canActivate: [AuthGuard],
        data: { 
          permission: true,
          path: '/ws/v1/administrator/do',
          method: 'GET'
        }
      },
      {
        path: 'advertise',
        component: AdvertiseComponent,
        canActivate: [AuthGuard],
        data: { 
          permission: true,
          path: '/ws/v1/administrator/advertise',
          method: 'PUT'
        }
      },
      {
        path: 'advertise/add',
        component: AddAdvertiseComponent,
        canActivate: [AuthGuard],
        data: { 
          permission: true,
          path: '/ws/v1/administrator/advertise',
          method: 'POST'
        }
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard],
        data: { 
          permission: true,
          path: '/ws/v1/administrator/profile',
          method: 'GET'
        }
      },
      {
        path: 'profile/update',
        component: UpdateProfileComponent,
        canActivate: [AuthGuard],
        data: { 
          permission: true,
          path: '/ws/v1/administrator/profile',
          method: 'GET'
        }
      },
      {
        path: 'redeem/:id_redeem',
        component: RedeemDetailComponent,
        canActivate: [AuthGuard],
        data: { 
          permission: true,
          path: '/ws/v1/administrator/redeem',
          method: 'GET'
        }
      },
      {
        path: 'admin/progress/:code',
        component: ProgressbarComponent,
        data: { 
          permission: true,
          path: '/ws/v1/administrator/progressbar',
          method: 'GET'
        }
      },
      {
        path: 'redeem',
        component: RedeemComponent,
        canActivate: [AuthGuard],
        data: { 
          permission: true,
          path: '/ws/v1/administrator/redeem',
          method: 'PUT'
        }
      },
      {
        path: 'finance',
        component: FinanceComponent,
        canActivate: [AuthGuard],
        data: { 
          permission: true,
          path: '/ws/v1/administrator/finance',
          method: 'PUT'
        }
      },
      {
        path: 'finance/:trading_id',
        component: FinanceDetailComponent,
        canActivate: [AuthGuard],
        data: { 
          permission: true,
          path: '/ws/v1/administrator/finance',
          method: 'GET'
        }
      },
      {
        path: 'admin/system',
        component: SystemComponent,
        canActivate: [AuthGuard],
        data: { 
          permission: true,
          path: '/ws/v1/administrator/systems',
          method: 'GET'
        }
      },
      {
        path: 'admin/user',
        component: UserComponent,
        canActivate: [AuthGuard],
        data: { 
          permission: true,
          path: '/ws/v1/administrator/users',
          method: 'PUT'
        }
      },
      {
        path: 'admin/user/add',
        component: UserAddComponent,
        canActivate: [AuthGuard],
        data: { 
          permission: true,
          path: '/ws/v1/administrator/users',
          method: 'POST'
        }
      },
      {
        path: 'admin/user/:username',
        component: UserDetailComponent,
        canActivate: [AuthGuard],
        data: { 
          permission: true,
          path: '/ws/v1/administrator/users',
          method: 'GET'
        }
      },
      {
        path: 'admin/config/activate',
        component: ActivateComponent
      },
      {
        path: 'admin/config/censorship',
        component: CensorshipComponent
      },
      {
        path: 'admin/config/excel',
        component: ExcelComponent
      },
      {
        path: 'admin/config/integrated',
        component: IntegratedComponent
      },
      {
        path: 'admin/config/policy',
        component: PolicyComponent
      },
      {
        path: 'admin/config/setting',
        component: SettingComponent
      },
      {
        path: 'admin/config/static-page',
        component: StaticPageComponent
      },
      {
        path: 'admin/config/website',
        component: WebsiteComponent
      },
      {
        path: 'admin/permission',
        component: PermissionComponent,
        canActivate: [AuthGuard],
        data: { 
          permission: true,
          path: '/ws/v1/administrator/permission',
          method: 'PUT'
        }
      },
      {
        path: 'admin/permission/add',
        component: AddPermissionComponent,
        canActivate: [AuthGuard],
        data: { 
          permission: true,
          path: '/ws/v1/administrator/permission',
          method: 'POST'
        }
      },
      {
        path: 'admin/permission/:id',
        component: EditPermissionComponent,
        canActivate: [AuthGuard],
        data: { 
          permission: true,
          path: '/ws/v1/administrator/permission',
          method: 'GET'
        }
      },
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '404',
    component: Page404Component
  },
  { path: '**', redirectTo: '404' }
];

@NgModule({
  exports: [ RouterModule ],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  declarations: []
})
export class AppRoutingModule { }
