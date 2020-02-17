import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientsdetaildialogComponent } from './patientsdetaildialog.component';

describe('PatientsdetaildialogComponent', () => {
  let component: PatientsdetaildialogComponent;
  let fixture: ComponentFixture<PatientsdetaildialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientsdetaildialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientsdetaildialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
