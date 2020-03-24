import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceptionhomepageComponent } from './receptionhomepage.component';

describe('ReceptionhomepageComponent', () => {
  let component: ReceptionhomepageComponent;
  let fixture: ComponentFixture<ReceptionhomepageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceptionhomepageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceptionhomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
