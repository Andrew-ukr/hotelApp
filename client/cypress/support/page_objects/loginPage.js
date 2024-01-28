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
    cy.get('[data-cy="userName"]').type(userName);
  }

  clearUserName() {
    cy.get('[data-cy="userName"]').clear();
  }

  addUserEmail(email) {
    cy.get('[data-cy="userEmail"]').type(email);
  }

  clearUserEmail() {
    cy.get('[data-cy="userEmail"]').clear();
  }

  addUserPassword(password) {
    cy.get('[data-cy="userPassword"]').type(password);
  }

  clearUserPassword() {
    cy.get('[data-cy="userPassword"]').clear();
  }

  redirectToLoginPage(path) {
    cy.visit(path);
    cy.url().should("eq", "http://localhost:3000/login");
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
      .get(request)
      .then((api) => {
        expect(api.response.statusCode).to.equal(200);
        expect(api.request.body.name).to.equal("cypressUser");
        expect(api.request.body.email).to.equal("cypressUser@email.com");
        expect(api.request.body.password).to.equal("123456");
      });
  }
}

export const onLoginPage = new OnLoginPage();
