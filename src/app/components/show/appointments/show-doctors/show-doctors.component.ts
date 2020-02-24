import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {DoctorsService} from '../../../../services/Doctors/doctors.service';
import {MatTableDataSource} from '@angular/material/table';
import {Doctor} from '../../../../models/Doctor';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-show-doctors',
  templateUrl: './show-doctors.component.html',
  styleUrls: ['./show-doctors.component.css']
})
export class ShowDoctorsComponent implements OnInit {

  private docName: string;

  @Input()
  set doctorName(name: string) {
    this.docName = (name && name.trim()) || '';
    this.applyFilter(name);
  }

  get name(): string {
    return this.docName;
  }


  displayedColumns: string[] = ['name'];
  dataSource;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private doctorsService: DoctorsService) {
  }

  ngOnInit(): void {
    this.doctorsService.getAllDoctors().subscribe(
      result => {
        this.dataSource = new MatTableDataSource<Doctor>(result);
        this.dataSource.paginator = this.paginator;
      }
    );
  }

  applyFilter(name: string) {
    if (name !== undefined) {
      this.dataSource.filter = name.trim().toLowerCase();
    }
  }

}
