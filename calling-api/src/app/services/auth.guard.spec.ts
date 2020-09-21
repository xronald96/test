import { TestBed, async, inject } from "@angular/core/testing";

import { AuthGuard } from "./auth.guard";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientModule } from "@angular/common/http";
import { AuthService } from "./auth.service";
export class AuthMockService {}
describe("AuthGuard", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuard],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientModule,
      ],
    });
  });

  it("should ...", inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));
  it("canActive false", inject([AuthGuard], (guard: AuthGuard) => {
    localStorage.removeItem("token");
    expect(guard.canActivate()).toBeFalsy();
  }));
  it("canActive true", inject([AuthGuard], (guard: AuthGuard) => {
    localStorage.setItem("token", "1212");
    expect(guard.canActivate()).toBeTruthy();
  }));
});
