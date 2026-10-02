import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsProdutosComponent } from './forms-produtos.component';

describe('FormsProdutosComponent', () => {
  let component: FormsProdutosComponent;
  let fixture: ComponentFixture<FormsProdutosComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsProdutosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
