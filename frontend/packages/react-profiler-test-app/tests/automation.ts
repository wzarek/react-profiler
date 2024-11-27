import { chromium, firefox, webkit } from "playwright";

(async () => {
  const browsers = [
    { name: "Chromium", instance: chromium },
    { name: "Firefox", instance: firefox },
    { name: "WebKit", instance: webkit },
  ];

  for (const browser of browsers) {
    console.log(`Running automation in ${browser.name}...`);
    const browserInstance = await browser.instance.launch({ headless: false });
    const context = await browserInstance.newContext();
    const page = await context.newPage();

    await page.goto("http://localhost:5173");

    const endTime = Date.now() + 5 * 60 * 1000; // 5 minutes
    while (Date.now() < endTime) {
      const action = Math.random();

      if (action < 0.4) {
        console.log(`[${browser.name}] Adding a Todo`);
        await page.click("text=Add Todo");
        await page.fill(
          'input[placeholder="Enter todo"]',
          `Todo ${Date.now()}`
        );
        await page.click("text=Add");
      } else if (action < 0.7) {
        console.log(`[${browser.name}] Deleting a Todo`);
        const todos = await page.$$('li:has(button:text("Delete"))');
        if (todos.length > 0) {
          const randomTodo = todos[Math.floor(Math.random() * todos.length)];
          const deleteButton = await randomTodo.$('button:text("Delete")');
          await deleteButton?.click();
        }
      } else {
        console.log(`[${browser.name}] Refreshing page`);
        await page.reload();
      }
      await page.waitForTimeout(Math.random() * (2000 - 500) + 500);
    }

    await browserInstance.close();
  }
})();
