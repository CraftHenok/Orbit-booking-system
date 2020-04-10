import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowReceptionComponent } from './show-reception.component';

describe('ShowReceptionComponent', () => {
  let component: ShowReceptionComponent;
  let fixture: ComponentFixture<ShowReceptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowReceptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowReceptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
