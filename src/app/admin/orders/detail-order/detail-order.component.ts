import { CustomService } from './../../../services/custom.service';
import { User } from './../../../api/models/user';
import { PO } from './../../../api/models/po';
import { ResponseSO } from './../../../api/models/response-so';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SoService } from '../../../services/so.service';
import { Snapshot } from '../../../api/models';
declare var $: any;
declare var tinymce: any;
@Component({
  selector: 'app-detail-order',
  templateUrl: './detail-order.component.html',
  styleUrls: ['./detail-order.component.css']
})
export class DetailOrderComponent implements OnInit {
  osId: any;
  order: ResponseSO;
  snapshots: Snapshot[];
  po: PO;
  customer: User;
  constructor(private soService: SoService, private route: ActivatedRoute, private customService: CustomService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.osId = params.soId;
    });
    this.soService.getSO(this.osId).subscribe(
      data => {
        this.order = data;
        console.log(this.order);
        
        this.snapshots = this.order.items;
        this.customer = data.customer;
      }
    );
  }

  formatAmount(amount) {
    return this.customService.formatCurrency(amount + '' , 'VND');
  }
}
