import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleUserModalComponent } from './single-user-modal.component';

describe('RemoveEventModalComponent', () => {
  let component: SingleUserModalComponent;
  let fixture: ComponentFixture<SingleUserModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleUserModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleUserModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});