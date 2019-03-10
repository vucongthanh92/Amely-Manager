import { Injectable } from '@angular/core';
import { User, Shop, Permission, Dashboard } from '../api/models';
import { Product } from 'src/app/api/models/product';
import { ApiService } from 'src/app/api/services';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { isNumber } from 'util';

@Injectable({
  providedIn: 'root'
})
export class CustomService {
  public userCurrent: User;
  public permissions: Permission[] = [];
  public isAdmin: boolean;
  public dashboard: Dashboard;
  public isApprovalProduct = false;
  public isApprovalShop = false;

  // public unamePattern = '^[A-z0-9]{6,50}$';
  public phonePattern = '^[0-9]{9,15}$';
  public numberPattern = '^[0-9]+$';
  public emailPattern = '^[a-z0-9_\.]{1,99}@[a-z0-9]{1,1}(\.[a-z0-9]{1,99}){1,99}$';

  public typeUser: Array<any> = [
    { id: 'normal', title: 'Normal' },
    { id: 'manager', title: 'Manager' },
    { id: 'admin', title: 'Admin' }
  ];

  public statusProduct: Array<any> = [
    { id: -1, title: 'Tất cả' },
    { id: 0, title: 'Đóng' },
    { id: 1, title: 'Mở' }
  ];

  public statusSelect: Array<any> = [
    { id: '0', title: 'Đóng' },
    { id: '1', title: 'Mở' }
  ];

  public expiryTypeProduct: Array<any> = [
    { id: '0', title: 'Không có hạn sử dụng' },
    { id: '1', title: 'Hạn sử dụng tính từ ngày mua' },
    { id: '2', title: 'Hạn sử dụng cố định' }
  ];

  public listTypecategories: Array<any> = [
    { id: '0', title: 'Market' },
    { id: '1', title: 'Voucher' },
    { id: '2', title: 'Ticket' },
    { id: '3', title: 'Shop' }
  ];

  public searchTypeProduct: Array<any> = [
    { id: 'all', title: 'All Product' },
    { id: 'default', title: 'Market' },
    { id: 'voucher', title: 'Voucher' },
    { id: 'ticket', title: 'Ticket' },
    { id: 'featured', title: 'Feature' }
  ];

  public statusApproval: Array<any> = [
    { id: -1, title: 'Tất cả' },
    { id: 0, title: 'Chưa duyệt' },
    { id: 1, title: 'Đã duyệt' }
  ];

  public promotionItemType: Array<any> = [
    { id: '0', title: 'Theo giá' },
    { id: '1', title: 'Theo phần trăm' }
  ];

  public promotionTimeType: Array<any> = [
    { id: '0', title: 'Thời gian kéo dài từ lúc bắt đầu đến lúc kết thúc' },
    { id: '1', title: 'Khoảng thời gian lặp lại hằng ngày' }
  ];

  public typePermissions: Array<any> = ['get', 'post', 'put', 'patch', 'delete'];

  getTagsProduct(params: Array<any>) {
    const tags: Array<string> = [];
    params.map(
      data => {
        tags.push(data.value);
      }
    );
    return tags.join(',');
  }

  constructor(
    private router: Router,
    private api: ApiService,
  ) {
  }

  alert(message, type) {
    switch (type) {
      case 0:
        swal({
          type: 'error',
          title: message,
          showConfirmButton: false,
          timer: 2000
        });
        break;
      case 1:
        swal({
          type: 'success',
          title: message,
          showConfirmButton: false,
          timer: 2000
        });
        break;
      case 2:
        swal({
          type: 'warning',
          title: message,
          showConfirmButton: false,
          timer: 2000
        });
        break;
      default:
        break;
    }
  }

  checkError(data) {
    if (data.hasOwnProperty('error')) {
      const error = data.error;
      switch (error) {
        case 'token_error':
          swal({
            type: 'error',
            title: 'Tài khoản đã bị đăng nhập !',
            showConfirmButton: false,
            timer: 2000
          }).then(() => {
            this.router.navigate(['/login']);
          });
          break;
        case 'username_exist':
          swal({
            type: 'error',
            title: 'Tên đăng nhập đã tồn tại !',
            showConfirmButton: false,
            timer: 2000
          });
          break;
        default:
          break;
      }
    }
  }

  formatCurrency(amount: string, currency: string) {
    let result: string;
    switch (currency) {
        case 'VND':
          result = (+amount).toLocaleString('vi-VN', { style: 'decimal', currency: 'VND' }) + ' ₫';
          break;
        case 'USD':
          result = (+amount).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
          break;
        default:
          result = amount + ' ' + currency;
          break;
      }
      return result;
  }

  compareValuesSort(key: string, order: string = 'asc') {
    return function(a, b) {
      const varA = (typeof a[key] === 'string') ?
        a[key].toLowerCase() : a[key];
      const varB = (typeof b[key] === 'string') ?
        b[key].toLowerCase() : b[key];
      let comparison = 0;
      comparison = varA.localeCompare(varB);
      return (
        (order === 'desc') ? (comparison * -1) : comparison
      );
    };
  }

  compareValuesNumberSort(key: string, order: string = 'asc') {
    return function (a, b) {
      const varA = (typeof a[key] === 'string') ?
        a[key].toLowerCase() : a[key];
      const varB = (typeof b[key] === 'string') ?
        b[key].toLowerCase() : b[key];
      let comparison = 0;
      comparison = varA.localeCompare(varB, 'kn', { numeric: true });
      return (
        (order === 'desc') ? (comparison * -1) : comparison
      );
    };
  }

  searchData(dataTable: any, keyword: string, params: Array<string>) {
    let filterItems: Array<any> = [];
    keyword = keyword.toLowerCase();
    filterItems = dataTable.filter(
      item => {
        let checked: Boolean = false;
        params.map(
          param => {
            const valueItem = (typeof item[param] === 'string') ? item[param].toLowerCase() : item[param];
            if (valueItem.toLowerCase().indexOf(keyword) >= 0) {
              checked = true;
            }
          }
        );
        if (checked === true) {
          return item;
        }
      }
    );
    return filterItems;
  }

  searchTableByKey(dataTable: Product[], keyword: string, params: Array<string>) {
    let filterItems: Array<any> = [];
    keyword = keyword.toLowerCase();
    filterItems = dataTable.filter(
      item => {
        let checked: Boolean = false;
        params.map(
          param => {
            const valueItem = (typeof item[param] === 'string') ? item[param].toLowerCase() : item[param];
            if (valueItem.toLowerCase().indexOf(keyword) >= 0) {
              checked = true;
            }
          }
        );
        if (checked === true) {
          return item;
        }
      }
    );
    return filterItems;
  }

  checkNumberToInput(value) {
    const regNumber = new RegExp('^[0-9]$');
    return regNumber.test(value);
  }

  checkEmailToInput(value: string) {
    const regEmail = /^[a-z0-9_\.]{1,99}@[a-z0-9]{2,}(\.[a-z0-9]{1,99}){1,99}$/;
    return regEmail.test(value);
  }

  getProfile() {
    const user = JSON.parse(localStorage.getItem('usercurrent'));
    if (user) {
      if (user.type === 'manager') {
        this.isAdmin = false;
      } else {
        this.isAdmin = true;
      }
      this.userCurrent = user;
    } else {
      this.userCurrent = null;
      this.router.navigate(['/login']);
    }
  }

  getPermission() {
    if (localStorage.getItem('permission')) {
      const data = JSON.parse(localStorage.getItem('permission'));
      this.permissions = data.permissions;
    } else {
      this.api.getPermissions().subscribe( data => {
        localStorage.setItem('permission', JSON.stringify(data));
        this.permissions = data.permissions;
      });
    }
  }

  alertStatus(index: number, subject_id: number) {
    const transactions = [
      'Bạn đã tặng quà #' + subject_id,
      'Bạn đã đồng ý nhận quà #' + subject_id,
      'Bạn đã từ chối nhận quà #' + subject_id,
      'Bạn đã tạo trao đổi #' + subject_id,
      'Bạn đã xóa trao đổi #' + subject_id,
      'Bạn đã đồng ý trao đổi #' + subject_id,
      'Bạn đã từ chối trao đổi #' + subject_id,
      'Bạn đã tham gia trao đổi #' + subject_id,
      'Bạn đã hủy yêu cầu trao đổi #' + subject_id,
      'Đề xuất trao đổi #' + subject_id + 'bị từ chối',
      'Đề xuất trao đổi #' + subject_id + 'thành công',
      'Đơn hàng #' + subject_id + 'chờ xử lý',
      'Đơn hàng #' + subject_id + 'thành công',
      'Đơn hàng #' + subject_id + 'thất bại',
      'Sử dụng vật phẩm thành công #' + subject_id,
      'Sử dụng vật phẩm thất bại #' + subject_id,
      'Nạp tiền vào ví #' + subject_id,
      'Rút tiền từ ví #' + subject_id,
      'Thanh toán hóa đơn #' + subject_id,
      'Giá trị sản phẩm #' + subject_id,
      'Quảng cáo sản phẩm #' + subject_id,
      'Quảng cáo cửa hàng #' + subject_id,
      'Giao hàng #' + subject_id,
      'Cửa hàng #' + subject_id + 'đã bị từ chối',
      'Cửa hàng #' + subject_id + 'đã được phê duyệt',
      'Trao đổi của bạn đã hết hạn #' + subject_id
    ];
    return transactions[index];
  }

  checkPermission(id: string) {
    if (this.permissions.length > 0) {
      const permission = this.permissions.filter(
        row => {
         return row.id === id;
        }
      );
      return permission[0];
    }
  }
}
