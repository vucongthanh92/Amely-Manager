import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CustomService } from '../../services/custom.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-progressbar',
  templateUrl: './progressbar.component.html',
  styleUrls: ['./progressbar.component.css']
})
export class ProgressbarComponent implements OnInit {
  public list_progressbar = [];
  public number_inserted = 0;
  public number_updated = 0;
  public number_error = 0;
  public percent = "0%";
  public code = "";
  public is_product = false;
  public isRun = false;
  public interval: any;

  public page = 'product';

  constructor(
    private activeRoute: ActivatedRoute,
    private productService: ProductService,
    private customService: CustomService,
    private router: Router
  ) { 
    this.activeRoute.params.subscribe(params => {
      this.code = params.code;
      swal({
        title: 'Vui lòng đợi...'
      });
      swal.showLoading();
      this.getInfoProgressbar();
    });
  }

  ngOnInit() {
    let that = this;
    this.interval = setInterval(() => {
      that.getInfoProgressbar();
    }, 5000);
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  backPage() {
    this.router.navigate([this.page]);
  }

  getInfoProgressbar() {
    this.productService.getInfoProgressBar(this.code).subscribe(data => {
      var inserted = [];
      var updated = [];
      var error = [];
      
      if (data.error == 'no_data') {
        this.customService.alert("Upload thành công !", 1);
        return;
      } else {
        switch (data.progress_type) {
          case 'product':
            this.page = '/product';
            break;
          case 'quantity':
            this.page = '/product/quantity';
            break;
          default:
            break;
        }
        this.list_progressbar = [];
        if (data.inserted != '') {
          inserted = data.inserted.split("^0^");
          this.number_inserted = inserted.length;
        }
        if (data.updated != '') {
          updated = data.updated.split("^0^");
          this.number_updated = updated.length;
        }
        if (data.error != '') {
          error = data.error.split("^0^");
          this.number_error = error.length;
        }
        let max = Math.max(this.number_inserted, this.number_updated, this.number_error);
        for (let index = 0; index < max; index++) {
          let arr = [inserted[index], updated[index], error[index]];
          this.list_progressbar.push(arr);
        }
        
        let counter = +data.number / +data.total_number * 100;
        
        this.percent = Math.round(counter) + "%";
        
        if (counter >= 100) {
          this.customService.alert("Upload thành công !", 1);
          clearInterval(this.interval);
          return;
        }
      }
    });
  }

  updateProgressbar() {
    return this.productService.updateProgressbar(this.code).subscribe( data => {
      this.customService.alert("Bạn đã dừng tiến trình !", 2);
    });
  }

}
