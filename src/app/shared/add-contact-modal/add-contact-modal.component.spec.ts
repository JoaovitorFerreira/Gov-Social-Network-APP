import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddContactComponent } from './add-contact-modal.component';

describe('ChangePasswordComponent', () => {
  let component: AddContactComponent;
  let fixture: ComponentFixture<AddContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddContactComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});