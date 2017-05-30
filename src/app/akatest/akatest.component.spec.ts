import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule, MdTab } from '@angular/material';

import { AkatestComponent } from './akatest.component';

describe('AkatestComponent', () => {
  let component: AkatestComponent;
  let fixture: ComponentFixture<AkatestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AkatestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AkatestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
