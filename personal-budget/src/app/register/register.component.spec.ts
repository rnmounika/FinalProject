import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { BrowserModule, By } from '@angular/platform-browser';
import { FormsModule,FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';
import { DataService } from '../data.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterModule } from '@angular/router';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let el: HTMLElement;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      imports: [
                RouterModule.forRoot([]),
                BrowserModule,
                FormsModule,
                ReactiveFormsModule,
                // FormBuilder, FormGroup, Validators,
                HttpClientTestingModule

              ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });



  // it(`Email address is required`, async(() => {
  //   component.form.controls['email'].setValue('');
  //   // component.form.controls['confirmPassword'].setValue('');
  //   // component.form.controls['lastName'].setValue('');
  //   // comp.form.controls['text'].setValue('');
  //   expect(component.form.valid).toBeTruthy();
  // }));
  it(`form should be invalid`, async(() => {
    component.form.controls['firstName'].setValue('');
    component.form.controls['lastName'].setValue('');
    component.form.controls['email'].setValue('mounika@gmail.com');
    component.form.controls['password'].setValue('');
    component.form.controls['confirmPassword'].setValue('');
    // component.form.controls['lastName'].setValue('');
    // comp.form.controls['text'].setValue('');
    expect(component.form.valid).toBeFalsy();
  }));
    it(`form should be valid`, async(() => {
      component.form.controls['firstName'].setValue('Mounika');
      component.form.controls['lastName'].setValue('RN');
      component.form.controls['email'].setValue('mounika@gmail.com');
      component.form.controls['password'].setValue('123456');
      component.form.controls['confirmPassword'].setValue('123456');
         // comp.form.controls['text'].setValue('text');
    expect(component.form.valid).toBeTruthy();
  }));
    it(`should call the onSubmit method`, async(() => {
    spyOn(component, 'onSubmit');
    el = fixture.debugElement.query(By.css('button')).nativeElement;
    el.click();
    expect(component.onSubmit).toHaveBeenCalled();
  }));

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
