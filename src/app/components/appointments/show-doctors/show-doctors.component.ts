import {Component, OnInit} from '@angular/core';
import {DoctorsService} from '../../../services/Doctors/doctors.service';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-show-doctors',
  templateUrl: './show-doctors.component.html',
  styleUrls: ['./show-doctors.component.css']
})
export class ShowDoctorsComponent implements OnInit {

  displayedColumns: string[] = ['name'];
  dataSource;

  constructor(private doctorsService: DoctorsService) {
  }

  ngOnInit(): void {
    this.doctorsService.getAllDoctors().subscribe(
      result => {
        this.dataSource = new MatTableDataSource(result);
      }
    );
  }

  applyFilter($event: KeyboardEvent) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
