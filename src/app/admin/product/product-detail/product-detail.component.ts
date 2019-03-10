import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/api/models/product';
import { ProductService } from 'src/app/services/product.service';
import { ProductGroup } from 'src/app/api/models/product-group';

import swal from 'sweetalert2';
import * as moment from 'moment';
import { Store } from '../../../api/models';
import { CustomService } from '../../../services/custom.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})

export class ProductDetailComponent implements OnInit {
  public product: Product;
  public productGroup: ProductGroup;
  selectedIdproduct: string[];
  public categories: {
    adminCategories: Array<any>,
    shopCategories: Array<any>
  };
  public stores: Store[] = [];

  constructor(
    private productService: ProductService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    public customService: CustomService
  ) {
    this.productGroup = new ProductGroup();
    this.product = new Product();
  }

  ngOnInit() {
    this.selectedIdproduct = [];
    this.activeRoute.params.subscribe(params => {
      this.productService.getProduct(params.id).subscribe(
        data => {
          if (data.status) {
            this.product = data;
            this.categories = this.productService.filterCategories(this.product);
            this.product.begin_day = moment.unix(Number(this.product.begin_day)).format('DD/MM/YYYY');
            this.product.end_day = moment.unix(Number(this.product.end_day)).format('DD/MM/YYYY');
            this.productService.getOneProductGroup(this.product.product_group).subscribe( response => {
                if (response.hasOwnProperty('error')) {
                } else {
                  this.productGroup = response;
                }
            });
            if (data.shop.hasOwnProperty('stores')) {
              if (data.shop.stores.length > 0) {
                this.stores = data.shop.stores;
              }
            }
          }
        }
      );
    });
  }

  deleteProduct() {
    swal({
      title: 'Bạn muốn xóa sản phẩm này',
      text: '',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it'
    }).then((result) => {
      if (result.value) {
        const productId: Array<string> = [];
        productId.push(this.product.id);
        this.productService.deleteProduct({
          id: productId,
          image: null
        }).subscribe(
          data => {
            if (data.status) {
              swal(
                'Deleted!',
                'Sản phẩm đã được xóa',
                'success'
              );
              this.router.navigate(['/product/non-approval']);
            }
          }
        );
      }
    });
  }

  editApproval() {
    this.selectedIdproduct.push(this.product.id);
    this.productService.editApproval(this.selectedIdproduct, 'product').subscribe(
      data => {
      swal({
        type: 'success',
        title: 'Duyệt sản phẩm thành công',
        showConfirmButton: false,
        timer: 2000
      }).then(() => {
        location.reload();
      });
    });
  }

  formatPrice(price) {
    return this.customService.formatCurrency(price + '' , 'VND');
  }
}
