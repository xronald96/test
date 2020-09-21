import { TestBed, getTestBed } from "@angular/core/testing";

import { LoginService } from "./login.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientModule } from "@angular/common/http";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { concat, of, throwError } from "rxjs";
describe("LoginService", () => {
  let injector: TestBed;
  let httpMock: HttpTestingController;
  let service: LoginService;
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientModule,
        HttpClientTestingModule,
      ],
    })
  );
  beforeEach(() => {
    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
    service = injector.get(LoginService);
  });

  afterEach(() => {
    httpMock.verify();
  });
  it("should be created", () => {
    const service: LoginService = TestBed.get(LoginService);
    expect(service).toBeTruthy();
  });

  it("Correct login credendials", () => {
    const service: LoginService = TestBed.get(LoginService);
    service.login({ username: "user", password: "pass" }).subscribe((res) => {
      expect(res).toEqual({
        token: "123",
      });
    });
    const req = httpMock.expectOne(
      "https://us-central1-code-challenge-e9f47.cloudfunctions.net/app/token"
    );
    expect(req.request.method).toBe("POST");
    req.flush({ token: "123" });
  });

  it("Error login credendials", () => {
    const service: LoginService = TestBed.get(LoginService);
    service.login({ username: "user", password: "pass1" }).subscribe(
      (res) => {},
      (err) => {
        expect(err).toBeDefined;
      }
    );
    const req = httpMock.expectOne(
      "https://us-central1-code-challenge-e9f47.cloudfunctions.net/app/token"
    );
    expect(req.request.method).toBe("POST");
    req.flush(concat(of("fake_token"), throwError(new Error(""))));
  });
});
