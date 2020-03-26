import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatforadminComponent } from './statforadmin.component';

describe('StatforadminComponent', () => {
  let component: StatforadminComponent;
  let fixture: ComponentFixture<StatforadminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatforadminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatforadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
