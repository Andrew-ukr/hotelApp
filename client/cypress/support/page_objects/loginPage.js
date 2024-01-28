/* eslint-disable no-undef */

class OnLoginPage {
  userNameInputHasClass() {
    cy.get('[data-cy="userName"]').should("have.class", "!border-app-red-500");
  }

  userEmailInputHasClass() {
    cy.get('[data-cy="userEmail"]').should("have.class", "!border-app-red-500");
  }

  userPasswordInputHasClass() {
    cy.get('[data-cy="userPassword"]').should(
      "have.class",
      "!border-app-red-500"
    );
  }

  addUserName(userName) {
    cy.get('[data-cy="userName"]').type(userName).should('have.value', userName);
  }

  clearUserName() {
    cy.get('[data-cy="userName"]').clear().should('have.value', '');
  }

  addUserEmail(email) {
    cy.get('[data-cy="userEmail"]').type(email).should('have.value', email);
  }

  clearUserEmail() {
    cy.get('[data-cy="userEmail"]').clear().should('have.value', '');
  }

  addUserPassword(password) {
    cy.get('[data-cy="userPassword"]').type(password).should('have.value', password);
  }

  clearUserPassword() {
    cy.get('[data-cy="userPassword"]').clear().should('have.value', '');
  }

  redirectToLoginPage(path) {
    cy.visit(path);
    cy.url().should("eq", `${Cypress.env("cypressBaseUrl")}/login`);
  }

  pressSaveButton() {
    cy.get('[data-cy="saveButtonLoginPage"]').then((button) => {
      cy.wrap(button).should("exist");
      cy.wrap(button).click({ force: true });
    });
  }

  toastMessage(text) {
    cy.contains(text);
  }

  checkLoginRequest(request) {
    cy.wait(request)
      .then((api) => {
        expect(api.response.statusCode).to.equal(200);
        expect(api.request.body.name).to.equal(Cypress.env("cypressUserName"));
        expect(api.request.body.email).to.equal(
          Cypress.env("cypressUserEmail")
        );
        expect(api.request.body.password).to.equal(
          Cypress.env("cypressUserPassword")
        );
      });
  }
}

export const onLoginPage = new OnLoginPage();
