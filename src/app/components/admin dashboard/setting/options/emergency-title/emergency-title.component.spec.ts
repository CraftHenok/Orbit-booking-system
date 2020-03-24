import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmergencyTitleComponent } from './emergency-title.component';

describe('EmergencyTitleComponent', () => {
  let component: EmergencyTitleComponent;
  let fixture: ComponentFixture<EmergencyTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmergencyTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmergencyTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
