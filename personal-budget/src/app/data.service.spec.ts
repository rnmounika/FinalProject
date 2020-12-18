import { TestBed } from '@angular/core/testing';

import { DataService } from './data.service';
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

describe('DataService', () => {
  let httpTestingController: HttpTestingController;
  let service: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,RouterModule.forRoot([])],
      providers: [ HttpClient, HttpTestingController]
    });
    // httpTestingController = TestBed.get(httpTestingController);;
    service = TestBed.inject(DataService);
  });
  // it("should return data", () => {
  //   // let result: Traveller[];
  //   service.login("mounika_rn@gmail.com","May_2020").subscribe()
  //   const req = httpTestingController.expectOne({
  //     method: "POST",
  //     url: "http://localhost:3001/api/login"
  //   });

  //   // req.flush([traveller]);

  //   expect(req.request.body).toEqual(true);
  // });

  // it('#isLoggedIn should return false after creation', inject([DataService], (service: UserService) => {
  //   expect(service.isLoggedIn()).toBeFalsy();
  // }));

  // it('should be created', () => {
  //   expect(service).toBeTruthy();
  // });
});
