/* eslint-disable no-undef */
import { onLoginPage } from "../../support/page_objects/loginPage";

describe("auth", () => {
  it("user should be on the signup page", () => {
    cy.visit("/");
    cy.url().should("eq", `${Cypress.env("cypressBaseUrl")}/login`);
  });

  it("user should be redirected to the login page", () => {
    ["dashboard", "front-desc", "guests", "rooms", "settings"].forEach(
      (path) => {
        onLoginPage.redirectToLoginPage(path);
      }
    );
  });

  it("inputs should have red frames if they are empty when the submit button is pressed", () => {
    cy.visit("/");
    cy.url().should("eq", `${Cypress.env("cypressBaseUrl")}/login`);

    onLoginPage.pressSaveButton();

    onLoginPage.userNameInputHasClass();
    onLoginPage.userEmailInputHasClass();
    onLoginPage.userPasswordInputHasClass();

    onLoginPage.addUserName("test");
    onLoginPage.addUserEmail("test");
    onLoginPage.addUserPassword("test");
    onLoginPage.pressSaveButton();
    onLoginPage.toastMessage("Invalid user credentials");

    onLoginPage.clearUserName();
    onLoginPage.clearUserEmail();
    onLoginPage.clearUserPassword();
  });

  describe("login cypress fake user", () => {
    beforeEach(() => {
      cy.visit("/");
      cy.url().should("eq", `${Cypress.env("cypressBaseUrl")}/login`);
    });

    it("filling in all credentials with the wrong username", () => {
      onLoginPage.pressSaveButton();

      onLoginPage.userNameInputHasClass();
      onLoginPage.userEmailInputHasClass();
      onLoginPage.userPasswordInputHasClass();

      onLoginPage.addUserName("cypressUserFake");
      onLoginPage.addUserEmail(Cypress.env("cypressUserEmail"));
      onLoginPage.addUserPassword(Cypress.env("cypressUserPassword"));
      onLoginPage.pressSaveButton();
      onLoginPage.toastMessage("Invalid user credentials");
    });

    it("filling in all credentials with the wrong users email", () => {
      onLoginPage.addUserName(Cypress.env("cypressUserName"));
      onLoginPage.addUserEmail("cypressUserFake@email.com");
      onLoginPage.addUserPassword(Cypress.env("cypressUserPassword"));
      onLoginPage.pressSaveButton();
      cy.url().should("eq", `${Cypress.env("cypressBaseUrl")}/login`);
      onLoginPage.toastMessage("Invalid user credentials");
    });

    it("filling in all credentials with the wrong users password", () => {
      onLoginPage.addUserName(Cypress.env("cypressUserName"));
      onLoginPage.addUserEmail(Cypress.env("cypressUserEmail"));
      onLoginPage.addUserPassword("1234567");
      onLoginPage.pressSaveButton();
      cy.url().should("eq", `${Cypress.env("cypressBaseUrl")}/login`);
      onLoginPage.toastMessage("Invalid user credentials");
    });
  });

  describe("login registered cypress user", () => {
    it("filling in all correct credentials", () => {
      cy.visit("/");
      onLoginPage.addUserName(Cypress.env("cypressUserName"));
      onLoginPage.addUserEmail(Cypress.env("cypressUserEmail"));
      onLoginPage.addUserPassword(Cypress.env("cypressUserPassword"));

      cy.intercept({ path: "/api/v1/auth/login" }).as("loginRequest");

      onLoginPage.pressSaveButton();
      onLoginPage.checkLoginRequest("@loginRequest");
      cy.url().should("eq", `${Cypress.env("cypressBaseUrl")}/dashboard`);
    });
  });
});
