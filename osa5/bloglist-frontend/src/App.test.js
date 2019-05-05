import React from "react";
import { render, waitForElement } from "react-testing-library";
jest.mock("./services/blogs");
import App from "./App";

describe("<App />", () => {
  it("if no user logged, note are not rendered", async () => {
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
});
