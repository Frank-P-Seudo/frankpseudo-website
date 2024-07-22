const driver = window.driver.js.driver;

export const driverObj = driver({
  showProgress: true,
  showButtons: ["next", "previous"],
  steps: [
    {
      element: "document",
      popover: {
        title: "Welcome!",
        description: "Custom-make your own news channel.",
      },
    },
    {
      element: "#token",
      popover: {
        title: "API key from TheNewsAPI",
        description:
          "Sign up at <a href='https://www.thenewsapi.com'>TheNewsAPI</a> and get an API key for free.",
      },
    },
  ],
});
