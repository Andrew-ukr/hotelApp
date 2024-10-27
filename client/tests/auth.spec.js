// auth.spec.js
import { test, expect } from "@playwright/test";
import { onLoginPage } from "./loginPage";

test.describe("auth", () => {
  test("user should be on the signup page", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveURL("http://localhost:3000/login");
  });

  test("user should be redirected to the login page", async ({ page }) => {
    const paths = ["dashboard", "front-desc", "guests", "rooms", "settings"];
    for (const path of paths) {
      await onLoginPage.redirectToLoginPage(page, path, expect);
    }
  });

  test("login playwright fake user", async ({ page }) => {
    await page.goto("/");
    await onLoginPage.pressSaveButton(page);

    await onLoginPage.userNameInputHasClass(page, expect);
    await onLoginPage.userEmailInputHasClass(page, expect);
    await onLoginPage.userPasswordInputHasClass(page, expect);

    await onLoginPage.addUserName(page, "cypressUserFake");
    await onLoginPage.addUserEmail(page, "cypressUser@email.com");
    await onLoginPage.addUserPassword(page, "123456");
    await onLoginPage.pressSaveButton(page);
    await onLoginPage.toastMessage(page, "Invalid user credentials", expect);

    await onLoginPage.clearUserName(page);
    await onLoginPage.clearUserEmail(page);
    await onLoginPage.clearUserPassword(page);

    await onLoginPage.addUserName(page, "cypressUser");
    await onLoginPage.addUserEmail(page, "cypressUser@email.com");
    await onLoginPage.addUserPassword(page, "123456");

    const [response] = await Promise.all([
      page.waitForResponse("http://localhost:3000/api/v1/auth/login"),
      onLoginPage.pressSaveButton(page),
    ]);

    await onLoginPage.checkLoginRequest(response, expect);

    await expect(page).toHaveURL("http://localhost:3000/dashboard");
  });
});
