import React from "react";
import { render, fireEvent } from "react-testing-library";
import SimpleBlog from "./SimpleBlog";

test("renders content", () => {
  const blog = {
    author: "FreeCodeCamp",
    title: "Coding Blog",
    likes: 3
  };

  const component = render(<SimpleBlog blog={blog} />);

  const title = component.container.querySelector(".title");
  const author = component.container.querySelector(".author");
  expect(author).toHaveTextContent("FreeCodeCamp");
  expect(title).toHaveTextContent("Coding Blog");

  const likes = component.container.querySelector(".likes");
  expect(likes).toHaveTextContent("3");
});

it("clicking the like button twice, calls event handler function twice", async () => {
  const blog = {
    author: "FreeCodeCamp",
    title: "Coding Blog",
    likes: 3
  };

  const mockHandler = jest.fn();

  const { getByText } = render(
    <SimpleBlog blog={blog} onClick={mockHandler} />
  );

  const button = getByText("like");
  fireEvent.click(button);
  fireEvent.click(button);

  expect(mockHandler.mock.calls.length).toBe(2);
});
