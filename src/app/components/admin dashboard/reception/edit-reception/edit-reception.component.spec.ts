import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditReceptionComponent } from './edit-reception.component';

describe('EditReceptionComponent', () => {
  let component: EditReceptionComponent;
  let fixture: ComponentFixture<EditReceptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditReceptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditReceptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
