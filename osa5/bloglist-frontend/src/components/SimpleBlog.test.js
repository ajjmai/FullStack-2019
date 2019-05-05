import React from "react";
import { render } from "react-testing-library";
import { prettyDOM } from "dom-testing-library";
import SimpleBlog from "./SimpleBlog";

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
  expect(author).toBeDefined();
  expect(title).toBeDefined();

  const likes = component.container.querySelector(".likes");
  //console.log(prettyDOM(likes));
  expect(likes).toBeDefined();
});
