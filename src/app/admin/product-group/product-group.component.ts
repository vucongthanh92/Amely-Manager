import { CustomService } from './../../services/custom.service';
import { ProductGroupService } from './../../services/product-group.service';
import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
@Component({
  selector: 'app-product-group',
  templateUrl: './product-group.component.html',
  styleUrls: ['./product-group.component.css']
})
export class ProductGroupComponent implements OnInit {
  public product_group = [];
  public productGroupDisplay = [];
  public keywordProductGroup: string;
  public statusSort: Boolean = true;
  public offset = 0;
  public limit = 20;
  scrollDistance = 1;
  scrollUpDistance = 2;
  throttle = 300;
  constructor(private productGroupService: ProductGroupService, private customService: CustomService) { }

  ngOnInit() {
    this.getProductGroup();
  }

  onScrollDown(ev: any) {
    this.offset = this.offset + this.limit;
    this.getProductGroup();
  }

  getProductGroup() {
    if (this.product_group.length <= 0) {
      swal({
        title: 'Vui lòng đợi...'
      });
      swal.showLoading();
    }
    this.productGroupService.getProductGroups(-1, this.offset, this.limit).subscribe(data => {
      if (data.hasOwnProperty('error')) {
      } else {
        swal.close();
        this.product_group = this.product_group.concat(data);
        this.productGroupDisplay = this.product_group;
      }
    });
  }
  searchProductGroupByKeyWord() {
    const params: Array<string> = ['title', 'price', 'percent'];
    this.productGroupDisplay = this.customService.searchData(this.product_group, this.keywordProductGroup, params);
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
    this.productGroupDisplay.sort(this.customService.compareValuesSort(param, condition));
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
    this.productGroupDisplay.sort(this.customService.compareValuesNumberSort(param, condition));
  }
}
