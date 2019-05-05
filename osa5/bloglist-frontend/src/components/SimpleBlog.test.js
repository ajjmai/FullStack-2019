import React from "react";
import { render, fireEvent, cleanup } from "react-testing-library";
import "jest-dom/extend-expect";
import { prettyDOM } from "dom-testing-library";
import SimpleBlog from "./SimpleBlog";

afterEach(cleanup);

test("renders content", () => {
  const blog = {
    author: "FreeCodeCamp",
    title: "Coding Blog",
    likes: 3
  };

  const component = render(<SimpleBlog blog={blog} />);

  //component.debug();

  const title = component.container.querySelector(".title");
  const author = component.container.querySelector(".author");
  //console.log(prettyDOM(title));
  //console.log(prettyDOM(author));
  expect(author).toHaveTextContent("FreeCodeCamp");
  expect(title).toHaveTextContent("Coding Blog");

  const likes = component.container.querySelector(".likes");
  //console.log(prettyDOM(likes));
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
