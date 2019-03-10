import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  public is_error = true;
  public is_success = true;
  constructor(private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activeRoute.params.subscribe(params => {
      switch (params.status) {
        case 'error':
          this.is_error = true;
          this.is_success = false;
          break;
        case 'success':
          this.is_error = false;
          this.is_success = true;
          break;
        default:
          this.is_error = false;
          this.is_success = false;
          break;
          
      }
    });
  }

}
