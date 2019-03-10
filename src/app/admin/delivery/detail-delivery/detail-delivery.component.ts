import { DO } from './../../../api/models/do';
import { ShopService } from 'src/app/services/shop.service';
import { DoService } from './../../../services/do.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomService } from '../../../services/custom.service';
@Component({
  selector: 'app-detail-delivery',
  templateUrl: './detail-delivery.component.html',
  styleUrls: ['./detail-delivery.component.css']
})
export class DetailDeliveryComponent implements OnInit {
  public doId: string;
  public delivery = new DO;
  public total: number;

  constructor(
    private route: ActivatedRoute,
    private doService: DoService,
    private shopService: ShopService,
    private customService: CustomService,
  ) { }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.doId = params.code_delivery;
      this.doService.getDO(this.doId).subscribe(data => {
        this.delivery = data;
        this.total = ((+this.delivery.so.shipping_fee) + (+this.delivery.so.total));
      });
    });
  }

  formatAmount(amount) {
    return this.customService.formatCurrency(amount + '' , 'VND');
  }
}
