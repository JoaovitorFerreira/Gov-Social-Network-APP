import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormacaoFormComponent } from './formacao-form.component';

describe('FormacaoFormComponent', () => {
  let component: FormacaoFormComponent;
  let fixture: ComponentFixture<FormacaoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormacaoFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormacaoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
