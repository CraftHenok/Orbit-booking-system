import {Component, OnInit} from '@angular/core';
import {Navigation} from '../../../models/Navigation';

@Component({
  selector: 'app-doctorhomepage',
  templateUrl: './doctorhomepage.component.html',
  styleUrls: ['./doctorhomepage.component.css']
})
export class DoctorhomepageComponent implements OnInit {

  navigationData: Navigation;

  constructor() {
  }

  ngOnInit(): void {
    this.navigationData = new Navigation('doctors', []);
  }

}
