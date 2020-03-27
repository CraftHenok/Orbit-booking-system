import {Component, OnInit} from '@angular/core';
import {IconNavigation, Navigation} from '../../../models/Navigation';

@Component({
  selector: 'app-adminhomepage',
  templateUrl: './adminhomepage.component.html',
  styleUrls: ['./adminhomepage.component.css']
})
export class AdminhomepageComponent implements OnInit {

  navigationData: Navigation;

  constructor() {
  }

  ngOnInit(): void {
    const iconNavigation = [
      new IconNavigation('/admin', 'Doctors', 'doctor'),
      new IconNavigation('patients', 'Patients', 'patient'),
      new IconNavigation('setting', 'Setting', 'setting'),
    ];
    this.navigationData = new Navigation('/admin', iconNavigation);
  }

}
