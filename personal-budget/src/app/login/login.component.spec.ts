import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { BrowserModule, By } from '@angular/platform-browser';
import { FormsModule,FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';
import { DataService } from '../data.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterModule } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
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
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it(`form should be invalid`, async(() => {
    component.form.controls['username'].setValue('');
    component.form.controls['password'].setValue('');
    // comp.form.controls['text'].setValue('');
    expect(component.form.valid).toBeFalsy();
  }));
    it(`form should be valid`, async(() => {
      component.form.controls['username'].setValue('asd@asd.com');
      component.form.controls['password'].setValue('May');
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


// import { TestBed, async, ComponentFixture } from '@angular/core/testing';
// import { BrowserModule, By } from '@angular/platform-browser';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { DebugElement } from '@angular/core';
// // import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { DataService } from '../data.service';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import {HttpClientModule} from '@angular/common/http';
// import { LoginComponent } from './login.component';
// import { RouterModule } from '@angular/router';

// describe('LoginComponent', () => {
//   let comp: LoginComponent;
//   let fixture: ComponentFixture<LoginComponent>;
//   let de: DebugElement;
//   let el: HTMLElement;

//   beforeEach(async(() => {
//     let data = DataService;
//     TestBed.configureTestingModule({
//       declarations: [
//         LoginComponent
//       ],
//       imports: [
//         RouterModule.forRoot([]),
//         BrowserModule,
//         FormsModule,
//         ReactiveFormsModule,
//         // FormBuilder, FormGroup, Validators,
//         HttpClientTestingModule

//       ],
//       providers:[DataService]
//     }).compileComponents().then(() => {
//       fixture = TestBed.createComponent(LoginComponent);

//       comp = fixture.componentInstance; // LoginComponent test instance
//       // query for the title <h1> by CSS element selector
//       de = fixture.debugElement.query(By.css('form'));
//       el = de.nativeElement;
//     });
//   }));

  // it(`should have as text 'contact page'`, async(() => {
  //   expect(comp.text).toEqual('contact page');
  // }));

  // it(`should set submitted to true`, async(() => {
  //   comp.onSubmit();
  //   expect(comp.submitted).toBeTruthy();
  // }));

//   it(`should call the onSubmit method`, async(() => {
//     spyOn(comp, 'onSubmit');
//     el = fixture.debugElement.query(By.css('button')).nativeElement;
//     el.click();
//     expect(comp.onSubmit).toHaveBeenCalled();
//   }));

//  it(`form should be invalid`, async(() => {
//     comp.form.controls['username'].setValue('');
//     comp.form.controls['password'].setValue('');
//     // comp.form.controls['text'].setValue('');
//     expect(comp.form.valid).toBeFalsy();
//   }));

//   it(`form should be valid`, async(() => {
//     comp.form.controls['username'].setValue('asd@asd.com');
//     comp.form.controls['password'].setValue('May_2020');
//     // comp.form.controls['text'].setValue('text');
//     expect(comp.form.valid).toBeTruthy();
//   }));
// });
