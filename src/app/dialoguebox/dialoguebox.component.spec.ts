import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogueboxComponent } from './dialoguebox.component';

describe('DialogueboxComponent', () => {
  let component: DialogueboxComponent;
  let fixture: ComponentFixture<DialogueboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogueboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogueboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
