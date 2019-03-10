import { RedeemService } from './../../../services/redeem.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Redeem } from '../../../api/models';

@Component({
  selector: 'app-redeem-detail',
  templateUrl: './redeem-detail.component.html',
  styleUrls: ['./redeem-detail.component.css']
})
export class RedeemDetailComponent implements OnInit {
  public redeem_id: any;
  public redeem = new Redeem;
  constructor(private route: ActivatedRoute, private redeemService: RedeemService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.redeem_id = params.id_redeem;
      console.log(this.redeem_id);
    });
    this.getRedeem();
  }

  getRedeem() {
    this.redeemService.getRedeem(this.redeem_id).subscribe(data => {
      this.redeem = data;
      console.log(this.redeem);
    });
  }


}
