import { TestBed } from "@angular/core/testing";

import { AuthService } from "./auth.service";

describe("AuthService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();
  });
  it("isAuthenticated() false", () => {
    const service: AuthService = TestBed.get(AuthService);
    localStorage.removeItem("token");
    expect(service.isAuthenticated()).toBeFalsy();
  });
  it("isAuthenticated() true", () => {
    const service: AuthService = TestBed.get(AuthService);
    localStorage.setItem("token", "1212");
    expect(service.isAuthenticated()).toBeTruthy();
  });
});
