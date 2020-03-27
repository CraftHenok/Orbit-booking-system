import {Component, OnInit} from '@angular/core';
import {Navigation} from '../../../models/Navigation';

@Component({
  selector: 'app-doctorhomepage',
  templateUrl: './doctorhomepage.component.html',
  styleUrls: ['../../reception dashboard/receptionhomepage/receptionhomepage.component.css']
})
export class DoctorhomepageComponent implements OnInit {

  navigationData: Navigation;

  constructor() {
  }

  ngOnInit(): void {
    this.navigationData = new Navigation('/doctor', []);
  }

}
