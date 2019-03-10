import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {
  urls = new Array<string>();
  lat: number = 10.7994298;
  lng: number = 106.6860334;
  constructor() { }

  ngAfterViewInit() {
    $(".select2").select2();
    $("#tags").tagsinput();
  }

  ngOnInit() {
  }

  detectFiles(event) {
    this.urls = [];
    let files = event.target.files;
    if (files) {
      for (let file of files) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.urls.push(e.target.result);
        }
        reader.readAsDataURL(file);
      }
    }
  }
}
