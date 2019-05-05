import React from "react";
import { render, fireEvent, cleanup } from "react-testing-library";
import "jest-dom/extend-expect";
import Blog from "./Blog";
//import { prettyDOM } from "dom-testing-library";

afterEach(cleanup);

describe("<Blog />", () => {
  test("at start the children are not displayed", () => {
    const blog = {
      title: "Coding Blog",
      author: "FreeCodeCamp",
      likes: 5,
      url: "www.test.fi",
      user: {
        username: "Someone else"
      }
    };
    const user = {
      username: "Just me"
    };

    const component = render(<Blog blog={blog} user={user} />);

    const div = component.container.querySelector(".togglableContent");
    expect(div).toHaveStyle("display: none");
  });

  test("after clicking the blog title, children are displayed", () => {
    const blog = {
      title: "Coding Blog",
      author: "FreeCodeCamp",
      likes: 5,
      url: "www.test.fi",
      user: {
        username: "Someone else"
      }
    };
    const user = {
      username: "Just me"
    };

    const component = render(<Blog blog={blog} user={user} />);

    const button = component.container.querySelector(".button");
    //console.log(prettyDOM(button));
    fireEvent.click(button);

    const div = component.container.querySelector(".togglableContent");
    expect(div).not.toHaveStyle("display: none");
  });
});
