import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorhomepageComponent } from './doctorhomepage.component';

describe('DoctorhomepageComponent', () => {
  let component: DoctorhomepageComponent;
  let fixture: ComponentFixture<DoctorhomepageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorhomepageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorhomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
