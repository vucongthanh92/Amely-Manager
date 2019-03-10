import { Router } from '@angular/router';
import { ProductGroupService } from './../../../services/product-group.service';
import { Component, OnInit } from '@angular/core';
import { RequestProductGroup } from '../../../api/models';
import swal from 'sweetalert2';

@Component({
  selector: 'app-product-group-add',
  templateUrl: './product-group-add.component.html',
  styleUrls: ['./product-group-add.component.css']
})
export class ProductGroupAddComponent implements OnInit {
  public title = '';
  public description = '';
  public price = 0;
  public percent = 0;
  public selectedStatus: number;
  public selectedPrice = 0;
  constructor(private productGroupService: ProductGroupService, private router: Router) { }

  ngOnInit() {
  }

  addProductGroup() {
    if (!this.title) {
      swal({
        type: 'warning',
        text: 'Tên nhóm ngành hàng không được để trống',
        showConfirmButton: false,
        confirmButtonColor: '#049F0C',
        confirmButtonText: 'Yes',
      });
    }  else {
      swal({
        title: 'Vui lòng đợi...'
      });
      swal.showLoading();
      // tslint:disable-next-line:max-line-length
      this.productGroupService.addProductGroup(this.title, this.description, this.percent, this.price, this.selectedStatus).subscribe(data => {
        if (data.status) {
          swal({
            type: 'success',
            title: 'Tạo nhóm ngành hàng thành công',
            showConfirmButton: false,
            timer: 2000
          }).then(() => {
            swal.close();
              this.router.navigate(['/product-group']);
            });
          } else {
            swal({
              type: 'error',
              title: 'Tạo nhóm ngành hàng thất bại',
              showConfirmButton: false,
              timer: 2000
            });
          }
      });
    }
  }

  selectStatus(value: number) {
    this.selectedStatus = value;
  }

  selectPrice(value: number) {
    this.selectedPrice = value;
  }
}
