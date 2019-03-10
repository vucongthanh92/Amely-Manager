import { Component, OnInit } from '@angular/core';
import { SystemService } from '../../services/system.service';
import { CustomService } from '../../services/custom.service';
@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.css']
})
export class SystemComponent implements OnInit {
  public systems: any;
  public title = '';
  public name = '';
  public value = '';
  public idSystem = '';
  public titleAdd = '';
  public nameAdd = '';
  public valueAdd = '';
  constructor(private systemService: SystemService, public customService: CustomService) { }

  ngOnInit() {
    this.getSystem();
  }

  getSystem() {
    this.systemService.getSystem().subscribe(data => {
      this.systems = data;
    });
  }

  addSystem() {
    this.systemService.addSystem(this.titleAdd, this.nameAdd, this.valueAdd).subscribe(data => {
      if (data.hasOwnProperty('error')) {
      } else {
        this.customService.alert('Tạo systems thành công !', 1);
        this.getSystem();
      }
    });
  }

  selectSystem(system) {
    this.title = system.title;
    this.idSystem = system.id;
    this.name = system.name;
    this.value = system.value;
  }

  updateSystem() {
    this.systemService.updateSystem(this.idSystem, this.title, this.name, this.value).subscribe(data => {
      if (data.hasOwnProperty('error')) {
      } else {
        this.customService.alert('Cập nhật systems thành công !', 1);
        this.getSystem();
      }
    });
  }

}
