import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RhAdminComponent } from './rh-admin.component';

describe('RhAdminComponent', () => {
  let component: RhAdminComponent;
  let fixture: ComponentFixture<RhAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RhAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RhAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
