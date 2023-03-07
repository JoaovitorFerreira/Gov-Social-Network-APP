import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveEventModalComponent } from './pge-remove-modal.component';

describe('RemoveEventModalComponent', () => {
  let component: RemoveEventModalComponent;
  let fixture: ComponentFixture<RemoveEventModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveEventModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveEventModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});