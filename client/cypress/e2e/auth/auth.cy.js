/* eslint-disable no-undef */
import { onLoginPage } from "../../support/page_objects/loginPage";

describe("auth", () => {
  it("user should be on the signup page", () => {
    cy.visit("/");
    cy.url().should("eq", "http://localhost:3000/login");
  });

  it("user should be redirected to the login page", () => {
    ["dashboard", "front-desc", "guests", "rooms", "settings"].forEach(
      (path) => {
        onLoginPage.redirectToLoginPage(path);
      }
    );
  });

  it("login cypress fake user", () => {
    cy.visit("/");
    onLoginPage.pressSaveButton();

    onLoginPage.userNameInputHasClass();
    onLoginPage.userEmailInputHasClass();
    onLoginPage.userPasswordInputHasClass();

    onLoginPage.addUserName("cypressUserFake");
    onLoginPage.addUserEmail("cypressUser@email.com");
    onLoginPage.addUserPassword("123456");
    onLoginPage.pressSaveButton();
    onLoginPage.toastMessage("Invalid user credentials");

    onLoginPage.clearUserName();
    onLoginPage.clearUserEmail();
    onLoginPage.clearUserPassword();

    onLoginPage.addUserName("cypressUser");
    onLoginPage.addUserEmail("cypressUser@email.com");
    onLoginPage.addUserPassword("123456");

    cy.intercept("POST", "http://localhost:3000/api/v1/auth/login").as(
      "loginRequest"
    );

    onLoginPage.pressSaveButton();
    onLoginPage.checkLoginRequest('@loginRequest');
  });
});
