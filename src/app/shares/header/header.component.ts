import { Component, OnInit } from '@angular/core';
import { TranslateService } from 'src/app/translate.service';
import { ApiService } from 'src/app/api/services';
import { CustomService } from 'src/app/services/custom.service';
import { Router } from '@angular/router';
declare var $: any;
import swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public username: string;
  public fullname: string;
  public icon: string;
  public userCurrentShop: any;
  public userCurrent: any;
  public phone: string;
  public type: string;

  public isDashboard = false;
  public isShop = false;
  public isCategory = false;
  public isProduct = false;
  public isProductGroup = false;
  public isPromotion = false;
  public isAdvertise = false;
  public isOrder = false;
  public isDelivery = false;
  public isRedeem = false;
  public isFinance = false;
  public isUser = false;
  public isSystem = false;
  public isPermission = false;

  constructor(
    private translate: TranslateService,
    private api: ApiService,
    private router: Router,
    public customService: CustomService
  ) {
  }

  ngOnInit() {
    this.customService.getProfile();
    this.customService.getPermission();
    this.fullname = this.customService.userCurrent.fullname;
    this.icon = this.customService.userCurrent.avatar;
    this.phone = this.customService.userCurrent.mobilelogin;
    this.type = this.customService.userCurrent.type;
    this.userCurrent = this.customService.userCurrent;
    
    if (this.customService.userCurrent.type === 'admin') {

    } else {
      this.userCurrentShop = this.customService.userCurrent.shop.id;
    }
    switch (this.customService.userCurrent.rule_id) {
      case '1':
        this.isDashboard = true;
        this.isShop = true;
        this.isCategory = true;
        this.isProduct = true;
        this.isProductGroup = true;
        this.isPromotion = true;
        this.isAdvertise = true;
        this.isOrder = true;
        this.isDelivery = true;
        this.isRedeem = true;
        this.isFinance = true;
        this.isUser = true;
        this.isSystem = true;
        this.isPermission = true;
        this.customService.isApprovalProduct = true;
        this.customService.isApprovalShop = true;
        break;
      case '2':
        this.isDashboard = true;
        this.isShop = true;
        this.isCategory = true;
        this.isProduct = true;
        this.isPromotion = true;
        this.isAdvertise = true;
        this.isOrder = true;
        this.isDelivery = true;
        this.isRedeem = true;
        this.isFinance = true;
        this.isProductGroup = false;
        this.isUser = false;
        this.isSystem = false;
        this.isPermission = false;
        break;
      default:
        this.api.getPermission(this.customService.userCurrent.rule_id).subscribe(data => {
          data.permissions.forEach(e => {
            const permission = this.customService.checkPermission(e.permission_id);
            switch (permission.path) {
              case '/ws/v1/administrator/dashboard':
                this.isDashboard = true;
                break;
              case '/ws/v1/administrator/users':
                this.isUser = true;
                break;
              case '/ws/v1/administrator/systems':
                this.isSystem = true;
                break;
              case '/ws/v1/administrator/shops':
                this.isShop = true;
                break;
              case '/ws/v1/administrator/so':
                this.isOrder = true;
                break;
              case '/ws/v1/administrator/do':
                this.isDelivery = true;
                break;
              case '/ws/v1/administrator/advertise':
                this.isAdvertise = true;
                break;
              case '/ws/v1/administrator/categories':
                this.isCategory = true;
                break;
              case '/ws/v1/administrator/finnance':
                this.isFinance = true;
                break;
              case '/ws/v1/administrator/permission':
                this.isPermission = true;
                break;
              case '/ws/v1/administrator/product_group':
                this.isProductGroup = true;
                break;
              case '/ws/v1/administrator/products':
                this.isProduct = true;
                break;
              case '/ws/v1/administrator/promotion':
                this.isPromotion = true;
                break;
              case '/ws/v1/administrator/redeem':
                this.isRedeem = true;
                break;
              default:
                break;
            }
          });
        });
        break;
    }

    $(document).ready(function() {
      $( '.left_menu' ).click(function() {
        $(this).next('ul').slideToggle(350);
      });

      $('#sidebar-menu ul li').click(function() {
        $('#sidebar-menu ul li').removeClass('active');
        $('#sidebar-menu ul li a').removeClass('active');
        $(this).addClass('active');
        $(this).children('a').addClass('active');
      });
    });
  }

  setLang(lang: string) {
    this.translate.use(lang);
  }

  logOut() {
    swal({
      title: 'Bạn có chắc là đăng xuất?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Có',
      cancelButtonText: 'Không'
    }).then((result) => {
      if (result.value) {
        localStorage.clear();
        this.router.navigate(['/login']);
      }
    });

  }
}
