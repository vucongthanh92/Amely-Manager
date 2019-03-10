import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/api/models/category';
import { CategoryService } from 'src/app/services/category.service';
import swal from 'sweetalert2';
declare var $: any;
declare var tinymce: any;

@Component({
  selector: 'app-detail-category',
  templateUrl: './detail-category.component.html',
  styleUrls: ['./detail-category.component.css']
})
export class DetailCategoryComponent implements OnInit, AfterViewInit {
  public category: Category;

  constructor(
    private categoryServices: CategoryService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {
    this.category = new Category();
  }

  ngOnInit() {
    this.activeRoute.params.subscribe(params => {
      this.categoryServices.getCategory(params.id).subscribe(
        data => {
          this.category = data;
        }
      );
    });
  }

  ngAfterViewInit() {
  }

  deleteCategory(id: string) {
    swal({
      title: 'Bạn muốn xóa danh mục?',
      text: '',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Có',
      cancelButtonText: 'Không'
    }).then((result) => {
      if (result.value) {
        this.categoryServices.deleteCategory(id).subscribe(
          data => {
            if (data.status) {
              swal({
                type: 'success',
                title: 'Xóa danh mục thành công',
                showConfirmButton: false,
                timer: 2000
              }).then(() => {
                this.router.navigate(['/category']);
              });
            } else {
              swal({
                type: 'error',
                title: 'Xóa danh mục thất bại',
                showConfirmButton: false,
                timer: 2000
              });
            }
          }
        );
      }
    });
  }
}
