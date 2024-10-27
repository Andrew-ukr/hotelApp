// loginPage.js
class OnLoginPage {
  async userNameInputHasClass(page, expect) {
    const input = await page.locator('[data-cy="userName"]');
    await expect(input).toHaveClass(/!border-app-red-500/);
  }

  async userEmailInputHasClass(page, expect) {
    const input = await page.locator('[data-cy="userEmail"]');
    await expect(input).toHaveClass(/!border-app-red-500/);
  }

  async userPasswordInputHasClass(page, expect) {
    const input = await page.locator('[data-cy="userPassword"]');
    await expect(input).toHaveClass(/!border-app-red-500/);
  }

  async addUserName(page, userName) {
    await page.fill('[data-cy="userName"]', userName);
  }

  async clearUserName(page) {
    await page.fill('[data-cy="userName"]', "");
  }

  async addUserEmail(page, email) {
    await page.fill('[data-cy="userEmail"]', email);
  }

  async clearUserEmail(page) {
    await page.fill('[data-cy="userEmail"]', "");
  }

  async addUserPassword(page, password) {
    await page.fill('[data-cy="userPassword"]', password);
  }

  async clearUserPassword(page) {
    await page.fill('[data-cy="userPassword"]', "");
  }

  async redirectToLoginPage(page, path, expect) {
    await page.goto(`/${path}`);
    await expect(page).toHaveURL("http://localhost:3000/login");
  }

  async pressSaveButton(page) {
    const button = page.locator('[data-cy="saveButtonLoginPage"]');
    await button.click();
  }

  async toastMessage(page, text, expect) {
    await expect(page.locator(`text=${text}`)).toBeVisible();
  }

  async checkLoginRequest(response, expect) {
    const requestBody = JSON.parse(response.request().postData());
    expect(response.status()).toBe(200);
    expect(requestBody.name).toBe("cypressUser");
    expect(requestBody.email).toBe("cypressUser@email.com");
    expect(requestBody.password).toBe("123456");
  }
}

export const onLoginPage = new OnLoginPage();
