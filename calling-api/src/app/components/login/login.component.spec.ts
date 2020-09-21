import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { LoginComponent } from "./login.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientModule } from "@angular/common/http";
import { By } from "@angular/platform-browser";
import { LoginService } from "src/app/services/login.service";
import { of, throwError, concat } from "rxjs";
class LoginMockService {
  login(credentials) {
    if (credentials.username === "user" && credentials.password === "pass") {
      return of("fake_token");
    } else {
      return concat(of("fake_token"), throwError(new Error("")));
    }
  }
}

describe("LoginComponent", () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientModule,
      ],
      providers: [
        {
          provide: LoginService,
          useClass: LoginMockService,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
  it("button disabled", () => {
    expect(
      fixture.debugElement.nativeElement.querySelector("button").disabled
    ).toBeTruthy();
  });
  it("button is not disabled", () => {
    component.credentials.get("username").setValue("username");
    component.credentials.get("password").setValue("pass");
    component.credentials.updateValueAndValidity();
    fixture.detectChanges();
    expect(
      fixture.debugElement.nativeElement.querySelector("button").disabled
    ).toBeFalsy();
  });

  it("Error credentials", () => {
    component.credentials.get("username").setValue("ErrorUsername");
    component.credentials.get("password").setValue("ErrorPassword");
    component.credentials.updateValueAndValidity();
    component.login();
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css(".error-message"))).toBeTruthy();
  });
  it("Good credentials", () => {
    component.credentials.get("username").setValue("user");
    component.credentials.get("password").setValue("pass");
    component.credentials.updateValueAndValidity();
    component.login();
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css(".error-message"))).toBeFalsy();
  });
});
