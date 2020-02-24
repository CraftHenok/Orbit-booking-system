import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditdoctorComponent } from './editdoctor.component';

describe('EditdoctorComponent', () => {
  let component: EditdoctorComponent;
  let fixture: ComponentFixture<EditdoctorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditdoctorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditdoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
