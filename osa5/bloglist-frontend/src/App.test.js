import React from "react";
import { render, waitForElement } from "react-testing-library";
jest.mock("./services/__mocks__/blogs");
import App from "./App";

describe("<App />", () => {
  test("if no user logged, blogs are not rendered", async () => {
    const component = render(<App />);
    component.rerender(<App />);

    await waitForElement(() =>
      component.container.querySelector(".loginButton")
    );

    expect(component.container).toHaveTextContent("username");
    expect(component.container).toHaveTextContent("password");

    const blogs = component.container.querySelector(".blogs");
    expect(blogs).not.toBeInTheDocument();
  });

  test("if user is logged, some blogs are rendered", async () => {
    const user = {
      username: "tester",
      token: "1231231214",
      name: "Teuvo Testaaja"
    };

    localStorage.setItem("loggedBlogappUser", JSON.stringify(user));

    const component = render(<App />);
    component.rerender(<App />);

    await waitForElement(() => component.getByText("Add new blog"));

    const blogs = component.container.querySelector(".blogs");
    expect(blogs).toBeInTheDocument();
    expect(component.container).toHaveTextContent(
      "Teuvo Testaaja is logged in"
    );
  });
});
