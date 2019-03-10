import { Injectable } from '@angular/core';
import { Product } from 'src/app/api/models/product';
import { RequestDeleteProducts } from 'src/app/api/models/request-delete-products';
import { ApiService } from 'src/app/api/services/api.service';
import {
  requestEditApproval,
  RequestGetProducts,
  RequestGetProductStores,
  RequestProductStore,
  RequestGetProgressBars,
  RequestPostSearch
} from '../api/models';
import { CustomService } from 'src/app/services/custom.service';
import swal from 'sweetalert2';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private api: ApiService,
    private customService: CustomService
  ) { }

  getStore(storeId: string) {
    return this.api.getStore(storeId);
  }

  getProduct(id: string) {
    return this.api.getProduct(id);
  }

  getProducts(params: RequestGetProducts) {
    return this.api.getProducts(params);
  }

  getProductStore(params: RequestGetProductStores) {
    return this.api.getproductStores(params);
  }

  addproductStore(params: RequestProductStore) {
    return this.api.addproductStore(params);
  }

  putproduct(product: Product, fileImages: Array<any>) {
    const uploadData = new FormData();
    if (product.id) {
      uploadData.append('id', product.id);
    }

    if (fileImages.length > 0) {
      fileImages.map(
        (file, index) => {
          if (file.upload === 1) {
            uploadData.append('image_' + index, file.source, file.filename);
          }
        }
      );
      uploadData.append('total_images', fileImages.length.toString());
    }

    uploadData.append('owner_id', product.owner_id);
    uploadData.append('type', product.type);
    uploadData.append('title', product.title);
    uploadData.append('description', product.description);
    uploadData.append('sku', product.sku);
    uploadData.append('price', product.price);
    uploadData.append('model', product.model);
    uploadData.append('tag', product.tag);
    uploadData.append('tax', product.tax);
    uploadData.append('friendly_url', product.friendly_url);
    uploadData.append('weight', product.weight);
    uploadData.append('expiry_type', product.expiry_type);
    uploadData.append('currency', product.currency);
    uploadData.append('origin', product.origin);
    uploadData.append('product_order', product.product_order);
    uploadData.append('duration', product.duration);
    uploadData.append('storage_duration', product.storage_duration);
    uploadData.append('is_special', product.is_special);
    uploadData.append('product_group', product.product_group);
    uploadData.append('custom_attributes', product.custom_attributes);
    uploadData.append('begin_day', product.begin_day);
    uploadData.append('end_day', product.end_day);
    uploadData.append('manufacturer', product.manufacturer);
    uploadData.append('unit', product.unit);
    uploadData.append('category', product.category);
    uploadData.append('voucher_category', product.voucher_category);
    uploadData.append('ticket_category', product.ticket_category);
    uploadData.append('shop_category', product.shop_category);
    uploadData.append('market_category', product.market_category);
    uploadData.append('adjourn_price', product.adjourn_price);
    uploadData.append('parent_id', product.parent_id);
    uploadData.append('status', product.status);

    return this.api.createProducts(uploadData);
  }

  deleteProduct(requestDeleteProduct: RequestDeleteProducts) {
    return this.api.deleteProduct(requestDeleteProduct);
  }

  editApproval(subject_id: any, subject_type: any) {
    const reqApproval = new requestEditApproval();
    reqApproval.subject_id = subject_id;
    reqApproval.subject_type = subject_type;
    return this.api.editApproval(reqApproval);
  }

  convertStringToArray(params: Array<any>) {
    const categories: Array<any> = [];
    params.map(
      data => {
        categories.push({
          id: data.id,
          title: data.title
        });
      }
    );
    return categories;
  }

  convertArrayToString(params: Array<any>) {
    let arrayCategories: Array<string>;
    let stringCategory: string;
    arrayCategories = params.map(
      data => {
        return data.id;
      }
    );
    stringCategory = arrayCategories.join(',');
    return stringCategory;
  }

  checkParamsProduct(product: Product, itemsShop: Array<string>, itemsMarket: Array<string>, beginDay: string, endDay: string) {
    if (!product.title) {
      swal({
        type: 'error',
        title: 'Bạn chưa điền tên cho sản phẩm',
        showConfirmButton: false,
        timer: 1500
      });
      return false;
    }

    if (!product.sku) {
      swal({
        type: 'error',
        title: 'Bạn chưa điền sku cho sản phẩm',
        showConfirmButton: false,
        timer: 1500
      });
      return false;
    }

    if (!product.owner_id) {
      swal({
        type: 'error',
        title: 'Bạn chưa chọn cửa hàng',
        showConfirmButton: false,
        timer: 1500
      });
      return false;
    }

    if (itemsShop && itemsShop.length === 0) {
      swal({
        type: 'error',
        title: 'Bạn chưa chọn danh mục cửa hàng',
        showConfirmButton: false,
        timer: 1500
      });
      return false;
    }

    if ((!product.price) || (this.customService.checkNumberToInput(product.price))) {
      swal({
        type: 'error',
        title: 'Bạn chưa nhập giá sản phẩm hoặc nhập chữ',
        showConfirmButton: false,
        timer: 1500
      });
      return false;
    }

    if ((!product.adjourn_price) || (this.customService.checkNumberToInput(product.adjourn_price))) {
      swal({
        type: 'error',
        title: 'Bạn chưa nhập giá lưu kho cho sản phẩm hoặc nhập chữ',
        showConfirmButton: false,
        timer: 1500
      });
      return false;
    }

    if ((typeof(product.product_group) === 'undefined') || (product.product_group === '') || (product.product_group === null)) {
      swal({
        type: 'error',
        title: 'Bạn chưa chọn nhóm ngành hàng',
        showConfirmButton: false,
        timer: 1500
      });
      return false;
    }

    if (product.expiry_type === '2') {
      if ( (!beginDay) || (!endDay) || (beginDay === undefined) || (endDay === undefined)) {
        swal({
          type: 'error',
          title: 'Bạn chưa chọn hạn sửa dụng',
          showConfirmButton: false,
          timer: 1500
        });
        return false;
      }
    }

    if (product.is_special === '0') {
      if (!itemsMarket || itemsMarket.length === 0) {
        swal({
          type: 'error',
          title: 'Bạn chưa chọn danh mục chợ',
          showConfirmButton: false,
          timer: 1500
        });
        return false;
      }
    }

    if (product.is_special === '1') {
      if ((product.voucher_category === '') || (product.voucher_category === null) || (product.voucher_category === 'null')) {
        swal({
          type: 'error',
          title: 'Bạn chưa chọn danh mục voucher',
          showConfirmButton: false,
          timer: 1500
        });
        return false;
      }
    }

    if (product.is_special === '2') {
      if ((product.ticket_category === '') || (product.ticket_category === null) || (product.ticket_category === 'null')) {
        swal({
          type: 'error',
          title: 'Bạn chưa chọn danh mục ticket',
          showConfirmButton: false,
          timer: 1500
        });
        return false;
      }
    }

    return true;
  }

  createNewObjectProduct(product: Product) {
    product = new Product();
    product.type = 'shop';
    product.title = '';
    product.description = '';
    product.sku = '';
    product.price = '0';
    product.model = '';
    product.tag = '';
    product.tax = '10';
    product.friendly_url = '';
    product.weight = '1';
    product.expiry_type = '0';
    product.currency = 'VND';
    product.display_currency = 'VND';
    product.origin = '';
    product.is_special = '0';
    product.storage_duration = '1';
    product.duration = '0';
    product.begin_day = '';
    product.end_day = '';
    product.status = '1';
    product.adjourn_price = '0';
    product.category = '';
    product.market_category = '';
    product.voucher_category = '';
    product.ticket_category = '';
    product.custom_attributes = '';
    product.manufacturer = '';
    product.unit = '';
    return product;
  }

  getAllProductGroup() {
    return this.api.getProductGroups({
      status: '-1',
      offset: 0,
      limit: 9999
    });
  }

  getOneProductGroup(id: string) {
    return this.api.getProductGroup(id);
  }

  filterCategories(product: Product) {
    const adminCategories: Array<any> = [];
    const shopCategories: Array<any> = [];
    let searchCategories: Array<string> = [];

    switch (product.is_special) {
      case '0':
        if ((product.market_category) && (product.market_category !== '')) {
          searchCategories = product.market_category.split(',');
        }
        break;
      case '1':
        if ((product.voucher_category) && (product.voucher_category !== '')) {
          searchCategories = product.voucher_category.split(',');
        }
        break;
      case '2':
        if ((product.ticket_category) && (product.ticket_category !== '')) {
          searchCategories = product.ticket_category.split(',');
        }
        break;
    }

    if (searchCategories.length > 0) {
      searchCategories.map(
        data => {
          product.categories.filter(
            category => {
              if (category.id === data) {
                adminCategories.push(category);
              }
            }
          );
        }
      );
    }

    if (product.shop_category) {
      product.shop_category.split(',').map(
        data => {
          product.categories.filter(
            category => {
              if (category.id === data) {
                shopCategories.push(category);
              }
            }
          );
        }
      );
    }

    return {
      'adminCategories': adminCategories,
      'shopCategories': shopCategories,
    };
  }

  getInfoProgressBar(code: string) {
    return this.api.getProgressBar(code);
  }

  getProgressbar(shop_id, progress_type) {
    const requestGetProgressBars = new RequestGetProgressBars();
    requestGetProgressBars.shop_id = shop_id;
    requestGetProgressBars.progress_type = progress_type;
    return this.api.getProgressBars(requestGetProgressBars);
  }

  updateProgressbar(code: string) {
    return this.api.updateProgressbar({code: code});
  }

  turnOn(subject_id: any, subject_type: any) {
    const reqApproval = new requestEditApproval();
    reqApproval.subject_id = subject_id;
    reqApproval.subject_type = subject_type;
    return this.api.editTurnOn(reqApproval);
  }

  turnOff(subject_id: any, subject_type: any) {
    const reqApproval = new requestEditApproval();
    reqApproval.subject_id = subject_id;
    reqApproval.subject_type = subject_type;
    return this.api.editTurnOff(reqApproval);
  }

  excel_products(shop_id, file, type) {
    const uploadData = new FormData();
    uploadData.append('shop_id', shop_id);
    uploadData.append('type', type);
    uploadData.append('file', file);
    return this.api.addExcelProducts(uploadData);
  }

  excel_product_default(shop_id: string, type: string) {
    return this.api.getExcelProducts({
      shopId: shop_id,
      type: type
    });
  }

  getImageByUploadFile(fileInput: any, oldIndex: number) {
    let fileSource: any = null;
    let fileName: any = null;

    if (fileInput.target.files && fileInput.target.files[0]) {
      if ((fileInput.target.files[0].size === 0) || (fileInput.target.files[0].size > 2097152)) {
        return {
          'error': true,
          'alert': 'File hình ảnh lớn hơn 2Mb hoặc bằng 0'
        };
      }
      if ((fileInput.target.files[0].type !== 'image/jpeg') && (fileInput.target.files[0].type !== 'image/png')) {
        return {
          'error': true,
          'alert': 'File bạn chọn không phải là hình ảnh'
        };
      }
      if (oldIndex === 0) {
        fileSource = fileInput.target.files[0];
        fileName = fileInput.target.files[0].name;
      } else {
        fileSource[oldIndex] = (fileInput.target.files[0]);
        fileName[oldIndex] = fileInput.target.files[0].name;
      }
      return {
        'error': false,
        'fileSource': fileSource,
        'fileName': fileName
      };
    }
  }

  checkFormatDatetime(currenTime: string) {
    let valueTime: string;
    valueTime = moment(new Date(currenTime.toString()), 'Asia/Ho_Chi_Minh').format('DD-MM-YYYY');
    if (valueTime === 'Invalid date') {
      valueTime = currenTime;
    }
    return valueTime;
  }

  getProducts2(
    shop_id: number,
    category_id: number,
    approved: number,
    status: number,
    type_product: string,
    keyword: string,
    isPromotion: string,
    offset: number,
    limit: number
  ) {
    const requestGetProducts = new RequestGetProducts();
    if (this.customService.userCurrent.type === 'manager') {
      requestGetProducts.shop_id = this.customService.userCurrent.shop.id;
    } else {
      requestGetProducts.shop_id = shop_id.toString();
    }
    requestGetProducts.category_id = category_id;
    requestGetProducts.approved = approved;
    requestGetProducts.status = status.toString();
    requestGetProducts.type_product = type_product;
    requestGetProducts.keyword = keyword;
    requestGetProducts.isPromotion = isPromotion;
    requestGetProducts.offset = offset;
    requestGetProducts.limit = limit;
    return this.api.getProducts(requestGetProducts);
  }

  getFile(shop_id: string, type: string) {
    return this.api.getFile({shopId: shop_id, type: type});
  }

  searchProduct(shop_id, type, keyword) {
    let requestPostSearch = new RequestPostSearch();
    requestPostSearch.shop_id = shop_id;
    requestPostSearch.type = type;
    requestPostSearch.keyword = keyword;
    return this.api.postSearch(requestPostSearch);
  }
}
