import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IdiomasFormComponent } from './idiomas-form.component';

describe('IdiomasFormComponent', () => {
  let component: IdiomasFormComponent;
  let fixture: ComponentFixture<IdiomasFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IdiomasFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IdiomasFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
