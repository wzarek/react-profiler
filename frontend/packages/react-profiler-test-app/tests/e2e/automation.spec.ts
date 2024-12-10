import { test } from "@playwright/test";

test.describe("Todo App E2E Tests", () => {
  test("should add, delete, and refresh todos", async ({
    page,
    browserName,
  }) => {
    await page.goto("http://localhost:5174");
    console.log(`[${browserName}] Testing started.`);

    const addTodo = async (todoText: string) => {
      try {
        await page.click("text=Add Todo");
        await page.fill('input[placeholder="Enter todo"]', todoText);
        await page.locator("button:text('Add')").click();
        await page.waitForSelector(
          'input[placeholder="Enter todo"][value=""]',
          {
            timeout: 1000,
          }
        );
      } catch (e) {
        console.error(e);
      }
    };

    const deleteRandomTodo = async () => {
      const todos = await page.$$('li:has(button[aria-label="Delete"])');
      if (todos.length > 0) {
        const randomTodo = todos[Math.floor(Math.random() * todos.length)];
        const deleteButton = await randomTodo.$('button[aria-label="Delete"]');
        if (deleteButton) {
          await deleteButton.click();
        }
      }
    };

    for (let i = 1; i <= 3000; i++) {
      await addTodo(`Test Todo ${i}`);
    }

    await page.click("text=Todo List");

    for (let i = 1; i <= 1000; i++) {
      await deleteRandomTodo();
    }

    console.log(`[${browserName}] Testing completed.`);
  });
});
