import { ProductGroup } from './../../../api/models/product-group';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductGroupService } from '../../../services/product-group.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-product-group-detail',
  templateUrl: './product-group-detail.component.html',
  styleUrls: ['./product-group-detail.component.css']
})
export class ProductGroupDetailComponent implements OnInit {
  public productGroup = new ProductGroup();
  constructor(private routeActive: ActivatedRoute, private productGroupService: ProductGroupService, private router: Router) { }

  ngOnInit() {
    swal({
      title: 'Vui lòng đợi...'
    });
    swal.showLoading();
    this.routeActive.params.subscribe(params => {
      this.productGroupService.getProductGroup(params.pg_id).subscribe(data => {
        swal.close();
        this.productGroup = data;
      });
    });
  }

  deletePG(id: string) {
    swal({
      title: 'Bạn muốn xóa nhóm ngành hàng?',
      text: '',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it'
    }).then(() => {
      swal({
        title: 'Vui lòng đợi...'
      });
      swal.showLoading();
      this.productGroupService.deleteProductGroup(id).subscribe(data => {
        if (data.status) {
          swal.close();
            swal({
              type: 'success',
              title: 'Xóa nhóm ngành hàng thành công',
              showConfirmButton: false,
              timer: 2000
            }).then(() => {
              this.router.navigate(['/product-group']);
            });
          } else {
            swal({
              type: 'error',
              title: 'Xóa nhóm ngành hàng thất bại',
              showConfirmButton: false,
              timer: 2000
            });
          }
        });
    });


  }

}
