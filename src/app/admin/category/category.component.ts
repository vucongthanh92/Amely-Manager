import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/api/models/category';
import { CustomService } from 'src/app/services/custom.service';
import swal from 'sweetalert2';
import { Shop } from 'src/app/api/models';
import { ShopService } from 'src/app/services/shop.service';
declare var $: any;
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  public shops: Shop[];
  public categories: Category[] = [];
  public categoriesDisplay: Category[] = [];
  public selectedIdCategory: string[] = [];
  public listTypeCategory: Array<any>;
  public offset = 0;
  public limit = 10;
  public typeCategory = '0';
  public table: any;
  public shop_id = '0';
  public isScroll = false;
  public isTurnOn = false;
  public isTurnOff = false;
  public values = [];
  public selectAction = '0';
  scrollDistance = 1;
  scrollUpDistance = 2;
  throttle = 300;
  public keywordCategories: string;
  public statusSort: Boolean = true;
  public selectedAll: Boolean = false;
  public search = false;
  constructor(
    private categoryService: CategoryService,
    public customService: CustomService,
    public shopService: ShopService,
    public router: Router
  ) {
    this.listTypeCategory = this.customService.listTypecategories;
  }

  onScrollDown(ev: any) {
    this.offset = this.offset + this.limit;
    this.getCategories();
  }

  ngOnInit() {
    if (this.customService.userCurrent.type === 'admin') {
      this.shopService.getShopsApproved(9999999, 0).subscribe( data => {
        if (data.hasOwnProperty('error')) {
        } else {
          this.shops = data;
          this.getCategories();
        }
      });
      this.shop_id = '';
      this.typeCategory = '0';
    } else {
      this.shop_id = this.customService.userCurrent.shop.id;
      this.typeCategory = '3';
      this.getCategories();
    }
  }

  getShop(id: string, type: string) {
    let title = 'AMELY';
    if (type === 'shop') {
      const shop = this.shops.filter(
        row => {
         return row.id === id;
        }
      );
      title = shop[0].title;
    }
    return title;
  }

  selectedAction(value: string) {
    this.selectAction = value;
  }

  action() {
    switch (this.selectAction) {
      case '1':
        this.turnOn();
        break;
      case '2':
        this.turnOff();
        break;
      default:
        break;
    }
    this.selectAction = '0';
  }

  turnOn() {
    this.selectedIdCategory = [];
    this.values.forEach((value, index, data) => {
      if (value === true) {
        this.selectedIdCategory.push(index.toString());
      }
    });
    swal({
      title: 'Bạn có chắc mở danh mục?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Có',
      cancelButtonText: 'Không'
    }).then((result) => {
      if (result.value) {
        swal({
          title: 'Vui lòng đợi...'
        });
        swal.showLoading();
        this.categoryService.turnOn(this.selectedIdCategory, 'category').subscribe(
          data => {
            if (data.status) {
              swal({
                type: 'success',
                title: 'Mở danh mục thành công!',
                showConfirmButton: false,
                timer: 2000
              }).then(() => {
                swal.close();
                this.refresh();
              });
            }
          }
        );
      }
    });
  }

  turnOff() {
    this.customService.alert('turn off', 1);
  }

  refresh() {
    this.offset = 0;
    this.limit = 10;
    this.categories = [];
    this.categoriesDisplay = [];
    this.getCategories();
    this.selectedAll = false;
    this.selectedIdCategory = [];
    this.values = [];
  }

  getCategories() {
    if (this.categories.length <= 0) {
      swal({
        title: 'Vui lòng đợi...'
      });
      swal.showLoading();
    }
    this.categoryService.getCategories(this.shop_id, this.typeCategory, this.offset, this.limit, this.keywordCategories).subscribe(
      data => {
        this.search = false;
        swal.close();
        if (data.hasOwnProperty('error')) {
        } else {
          data.forEach((v, i, d) => {
            if (v.type === 'shop') {
              if (this.customService.userCurrent.type == 'admin') {
                const shop = this.shops.filter(
                  row => {
                  return row.id === v.owner_id;
                  }
                );
                v.type = shop[0].title;
              } else {
                v.type = this.customService.userCurrent.shop.title;
              }
            }
          });
          
          this.categories = this.categories.concat(data);
          this.parentChild();
          this.categoriesDisplay = this.categories;
        }
      }
    );
  }

  parentChild() {
    const root = [];
    const children = [];
    const tmp = [];
    this.categories.forEach(e => {
      if (e.parent_id) {
        children.push(e);
      } else {
        root.push(e);
      }
    });
    root.forEach((v, i, d) => {
      tmp.push(v);
      children.forEach((value, index, data) => {
        if (value.parent_id === v.id) {
          tmp.push(value);
          delete children[index];
        }
      });
    });

    children.forEach(e => {
      tmp.push(e);
    });
    this.categories = tmp;
  }

  changeSubtypeCategory() {
    this.offset = 0;
    this.limit = 10;
    this.categories = [];
    this.categoriesDisplay = [];
    this.getCategories();
  }

  searchCategoriesByKeyWord() {
    this.offset = 0;
    this.categories = [];
    this.categoriesDisplay = [];
    this.selectedAll = false;
    this.selectedIdCategory = [];
    this.values = [];
    this.getCategories();
    // const params: Array<string> = ['title', 'sort_order', 'type'];
    // this.categoriesDisplay = this.customService.searchData(this.categories, this.keywordCategories, params);
  }

  sortTableByBranch(param: string) {
    let condition: string;
    if (this.statusSort === true) {
      condition = 'asc';
      this.statusSort = false;
    } else {
      condition = 'desc';
      this.statusSort = true;
    }
    this.categoriesDisplay.sort(this.customService.compareValuesSort(param, condition));
  }

  sortTableByNumber(param: string) {
    let condition: string;
    if (this.statusSort === true) {
      condition = 'asc';
      this.statusSort = false;
    } else {
      condition = 'desc';
      this.statusSort = true;
    }
    this.categoriesDisplay.sort(this.customService.compareValuesNumberSort(param, condition));
  }

  selectAllCategory() {
    if (this.selectedAll) {
      this.values.forEach((value, index, data) => {
        this.values[index] = true;
      });
    } else {
      this.values.forEach((value, index, data) => {
        this.values[index] = false;
      });
    }
  }

  onValueSelectionChange(e, valueId: string): void {
    if (e.checked) {
      this.selectedIdCategory.push(valueId);
    } else {
      const index = this.selectedIdCategory.indexOf(valueId);

      if (index > -1) {
        this.selectedIdCategory.splice(index, 1);
      }
    }
  }
}
