import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventModalPGEComponent } from './pge-event-modal.component';

describe('EventModalPGEComponent', () => {
  let component: EventModalPGEComponent;
  let fixture: ComponentFixture<EventModalPGEComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventModalPGEComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventModalPGEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});