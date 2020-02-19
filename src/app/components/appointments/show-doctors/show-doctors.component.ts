import {Component, OnInit, ViewChild} from '@angular/core';
import {DoctorsService} from '../../../services/Doctors/doctors.service';
import {MatTableDataSource} from '@angular/material/table';
import {Doctor} from '../../../models/Doctor';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-show-doctors',
  templateUrl: './show-doctors.component.html',
  styleUrls: ['./show-doctors.component.css']
})
export class ShowDoctorsComponent implements OnInit {

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

  applyFilter($event: KeyboardEvent) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
