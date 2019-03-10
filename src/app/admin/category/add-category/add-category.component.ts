import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/api/models/category';
import { CategoryService } from 'src/app/services/category.service';
import { CustomService } from 'src/app/services/custom.service';
import { ShopService } from 'src/app/services/shop.service';
import { Shop } from 'src/app/api/models/shop';

import { SlugifyPipe } from 'src/app/slugify.pipe';
import swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit, AfterViewInit {
  public marketCategories: Category[] = [];
  public category: Category;
  public logo: any;
  public logoUrl = '';
  public enabledCategory: Array<any>;
  public listTypeCategory: Array<any>;

  public subtype = '0';
  public parent_id = '0';
  public enabled = '0';
  public sort_order = '0';
  public title = '';
  public shopCategories: Shop[];
  public shopId = '';
  public isLoading: Boolean = false;
  constructor(
    private categoryService: CategoryService,
    private shopService: ShopService,
    public customService: CustomService,
    private router: Router,
    private slugifyPipe: SlugifyPipe
  ) {
    this.category = new Category();
    this.category.creator_id = this.customService.userCurrent.id;
    this.category.title = '';
    this.category.description = '';
    this.category.subtype = '0';
    this.category.parent_id = '0';
    this.category.sort_order = '0';
    this.category.enabled = '0';
    this.category.owner_id = '1';
    this.category.type = 'AMELY';

    this.enabledCategory = this.customService.statusSelect;
    this.listTypeCategory = this.customService.listTypecategories;
  }

  ngOnInit() {
    if (this.customService.userCurrent.type === 'admin') {
      this.shopId = '';
      this.category.subtype = '0';
    } else {
      this.shopId = this.customService.userCurrent.shop.id;
      this.category.owner_id = this.shopId;
      this.category.type = 'shop';
      this.category.subtype = '3';
    }

    this.getCategories();

    this.shopService.getShopsByLimitOffset(9999, 0).subscribe(
      data => {
        this.shopCategories = data;
      }
    );
  }

  selectTypeCategories() {
    switch (this.category.subtype) {
      case '3':
        this.category.type = 'shop';
        break;
      default:
        this.category.owner_id = '1';
        this.category.type = 'AMELY';
        break;
    }
    this.getCategories();
  }

  getCategories() {
    this.category.parent_id = '0';
    this.categoryService.getCategories(this.shopId, this.category.subtype, 0, 99999999, '').subscribe(data => {
      if (data.hasOwnProperty('error')) {
        this.marketCategories = [];
      } else {
        this.marketCategories = data;
      }
    });
  }

  selectShop() {
    this.getCategories();
    this.category.owner_id = this.shopId;
  }

  detectFiles(event) {
    const files = event.target.files;
    this.logo = files[0];
    if (files) {
      for (const file of files) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.logoUrl = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    }
  }

  ngAfterViewInit() {
  }

  convertToFriendlyURL(params: string) {
    this.category.friendly_url = this.slugifyPipe.transform(params);
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

    this.categoryService.putCategory(this.category, this.logo).subscribe(
      data => {
        if (data.status) {
          this.isLoading = true;
          swal({
            type: 'success',
            title: 'Tạo danh mục thành công',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            this.router.navigate(['/category/' + data.id]);
          });
        } else {
          this.isLoading = false;
          swal({
            type: 'error',
            title: 'Tạo danh mục thất bại',
            showConfirmButton: false,
            timer: 1500
          });
        }
      }
    );
  }
}
