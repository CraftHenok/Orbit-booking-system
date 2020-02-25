import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
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

  doctors: Doctor[] = [];

  currentActive = 0;

  @Output() doctorSelected = new EventEmitter<number>();

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
    this.doctors.push(Doctor.getAllDoctorsTemplate());
  }

  ngOnInit(): void {
    this.doctorsService.getAllDoctors().subscribe(
      result => {
        this.doctors.push(...result);
        this.dataSource = new MatTableDataSource<Doctor>(this.doctors);
        this.dataSource.paginator = this.paginator;
      }
    );
  }

  applyFilter(name: string) {
    if (name !== undefined) {
      this.dataSource.filter = name.trim().toLowerCase();
    }
  }

  doctorClicked(seq: number) {
    this.currentActive = seq;
    this.doctorSelected.emit(seq);
  }

  isActive(seq: number) {
    return {
      'active': seq === this.currentActive
    };
  }
}
