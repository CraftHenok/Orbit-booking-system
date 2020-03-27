import {Component, OnInit} from '@angular/core';
import {Navigation} from '../../../models/Navigation';

@Component({
  selector: 'app-receptionhomepage',
  templateUrl: './receptionhomepage.component.html',
  styleUrls: ['./receptionhomepage.component.css']
})
export class ReceptionhomepageComponent implements OnInit {

  navigationData: Navigation;

  constructor() {
  }

  ngOnInit(): void {
    this.navigationData = new Navigation('/reception', []);
  }

}
