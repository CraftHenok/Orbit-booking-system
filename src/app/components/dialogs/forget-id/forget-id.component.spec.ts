import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgetIdComponent } from './forget-id.component';

describe('ForgetIdComponent', () => {
  let component: ForgetIdComponent;
  let fixture: ComponentFixture<ForgetIdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgetIdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgetIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
