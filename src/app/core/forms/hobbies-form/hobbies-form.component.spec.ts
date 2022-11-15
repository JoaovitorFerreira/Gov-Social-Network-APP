import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HobbiesFormComponent } from './hobbies-form.component';

describe('HobbiesFormComponent', () => {
  let component: HobbiesFormComponent;
  let fixture: ComponentFixture<HobbiesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HobbiesFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HobbiesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
