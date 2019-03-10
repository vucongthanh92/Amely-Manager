import { CustomService } from 'src/app/services/custom.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AdvertiseService } from './../../../services/advertise.service';
import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';

@Component({
  selector: 'app-detail-advertise',
  templateUrl: './detail-advertise.component.html',
  styleUrls: ['./detail-advertise.component.css']
})
export class DetailAdvertiseComponent implements OnInit {
  public advertise: any;
  public advertiseType: string;
  // tslint:disable-next-line:max-line-length
  constructor(private advertiseService: AdvertiseService, private routeActive: ActivatedRoute, private customService: CustomService, private router: Router) { }

  ngOnInit() {
    this.routeActive.params.subscribe(params => {
      this.advertiseService.getAdvertise(params.id).subscribe(
        data => {
          this.advertise = data;
          this.advertiseType = this.advertise.advertise_type;
        }
      );
    });
  }

  deleteAdvertise(id: string) {
    swal({
      title: 'Bạn Muốn Xóa Quảng Cáo',
      text: '',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Có',
      cancelButtonText: 'Không'
    }).then((result) => {
      if (result.value) {
        this.advertiseService.deleteAdvertise(id).subscribe(
          data => {
            if (data.status) {
              swal({
                type: 'success',
                title: 'Xóa quảng cáo thành công',
                showConfirmButton: false,
                timer: 2000
              }).then(() => {
                this.router.navigate(['/advertise']);
              });
            } else {
              swal({
                type: 'error',
                title: 'Xóa quảng cáo thất bại',
                showConfirmButton: false,
                timer: 2000
              });
            }
          }
        );
      }
    });
  }

  formatAmount(amount) {
    return this.customService.formatCurrency(amount + '' , 'VND');
  }

}
