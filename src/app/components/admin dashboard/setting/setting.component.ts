import {Component, OnInit} from '@angular/core';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';

/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface FoodNode {
  name: string;
  link: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Manage static data',
    link: '',
    children: [
      {name: 'Appointment type', link: 'appointmentType'},
      {name: 'Appointment status', link: 'appointmentStatus'},
      {name: 'Emergency title', link: 'emergencyTitle'},
      {name: 'Patient title', link: 'patientTitle'},
      {name: 'Duration', link: 'duration'},
    ]
  },
  {
    name: 'Sync',
    link: '',
    children: [
      {name: 'Orbit', link: ''},
    ]
  }
];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  link: string;
  level: number;
}


@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {

  treeControl;
  treeFlattener;
  dataSource;

  constructor() {
    this.treeControl = new FlatTreeControl<ExampleFlatNode>(
      node => node.level, node => node.expandable);

    this.treeFlattener = new MatTreeFlattener(
      this.transformer, node => node.level, node => node.expandable, node => node.children);

    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);


    this.dataSource.data = TREE_DATA;
  }

  private transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      link: node.link,
      level,
    };
  };

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  ngOnInit(): void {

  }

}
