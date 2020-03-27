import {Component, Input, OnInit} from '@angular/core';
import {Navigation} from '../../models/Navigation';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  @Input() navigationData: Navigation;

  constructor() { }

  ngOnInit(): void {
  }

}
