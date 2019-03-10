import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/api/models/category';
import { Shop } from 'src/app/api/models/shop';

import { CategoryService } from 'src/app/services/category.service';
import { ShopService } from 'src/app/services/shop.service';
import { CustomService } from 'src/app/services/custom.service';

import { SlugifyPipe } from 'src/app/slugify.pipe';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {
  public marketCategories: Category[];
  public category: Category;
  public logo: any;
  public enabledCategory: Array<any>;
  public listTypeCategory: Array<any>;

  public shops: Shop[];
  public shopId = '';
  public shopCategories: Category[];
  public isLoading: Boolean = false;

  constructor(
    private categoryService: CategoryService,
    private shopService: ShopService,
    private customService: CustomService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private slugifyPipe: SlugifyPipe
  ) {
    this.category = new Category();
    this.enabledCategory = this.customService.statusProduct;
    this.listTypeCategory = this.customService.listTypecategories;
  }

  ngOnInit() {
    this.activeRoute.params.subscribe(params => {
      this.categoryService.getCategory(params.id).subscribe(
        data => {
          this.category = data;
          this.shopId  = this.category.owner_id;
          this.categoryService.getCategories(this.shopId, '3', 0, 99999, '').subscribe(
            result => {
              this.shopCategories = result;
            }
          );
        }
      );
    });

    this.categoryService.getCategories('0', '0', 0, 99999, '').subscribe(
      data => {
        if (data && data.length > 0) {
          this.marketCategories = data.filter(
            row => {
             return row.id !== this.category.id;
            }
          );
        }
      }
    );

    this.shopService.getShopsByLimitOffset(9999, 0).subscribe(
      data => {
        this.shops = data;
      }
    );
  }

  changeShopToCategory() {
    this.shopCategories = [];
    this.categoryService.getCategories(this.shopId, '3', 0, 99999, '').subscribe(
      result => {
        if (result && result.length > 0) {
          this.shopCategories = result;
        }
      }
    );
  }

  detectFiles(event) {
    const files = event.target.files;
    this.logo = files[0];
    if (files) {
      for (const file of files) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.category.logo = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    }
  }

  saveCategory() {
    if (!this.category.title) {
      swal({
        type: 'error',
        title: 'Bạn chưa điền tên cho danh mục',
        showConfirmButton: false,
        timer: 1500
      });
      return false;
    }

    if (!this.category.friendly_url || this.category.friendly_url === '') {
      this.category.friendly_url = this.slugifyPipe.transform(this.category.title);
    } else {
      this.category.friendly_url = this.slugifyPipe.transform(this.category.friendly_url);
    }

    if (this.category.subtype === '3') {
      this.category.type = 'shop';
      if ((!this.shopId) || (this.shopId === '')) {
        swal({
          type: 'error',
          title: 'Bạn chưa chọn cửa hàng',
          showConfirmButton: false,
          timer: 1500
        });
        return false;
      }
      this.category.owner_id = this.shopId;
    } else {
      this.category.type = 'AMELY';
      this.category.owner_id = this.customService.userCurrent.id;
    }

    this.categoryService.putCategory(this.category, this.logo).subscribe(
      data => {
        if (data.status) {
          this.isLoading = true;
          swal({
            type: 'success',
            title: 'Sửa Category thành công',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            this.router.navigate(['/category/' + this.category.id]);
          });
        } else {
          this.isLoading = false;
          swal({
            type: 'error',
            title: 'Sửa Category thất bại',
            showConfirmButton: false,
            timer: 1500
          });
        }
      }
    );
  }
}
