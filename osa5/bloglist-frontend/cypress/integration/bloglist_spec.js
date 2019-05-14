describe("Blog", function() {
  beforeEach(function() {
    cy.visit("http://localhost:3000");
  });

  it("front page can be opened", function() {
    cy.contains("Bloglist");
  });

  it("login form can be opened", function() {
    cy.contains("login").click();
  });
});

describe("user has logged in", function() {
  beforeEach(function() {
    cy.visit("http://localhost:3000");
    cy.contains("login").click();
    cy.get("#username").type("maimei");
    cy.get("#password").type("sekred");
    cy.get("#login_button").click();
    cy.contains("Maija Meikäläinen is logged in");
  });

  it("user can see all blogs added by some user", function() {
    cy.contains("users").click();
    cy.contains("Aino Kallas").click();
    cy.contains("added blogs");
    cy.contains("Canonical string reduction");
  });

  it("user can like a blog", function() {
    cy.contains("React patterns by Michael Chan").click();
    cy.contains("React patterns by Michael Chan");
    cy.contains("like").click();
    cy.contains("added by Maija Meikäläinen");
  });

  it("user can log out", function() {
    cy.contains("Log out").click();
    cy.contains("You have to log in to view the bloglist!");
  });
});

describe("Blog app with empty database", function() {
  beforeEach(function() {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "Ada Lovelace",
      username: "ada",
      password: "sekred"
    };
    cy.request("POST", "http://localhost:3003/api/users", user);
    cy.visit("http://localhost:3000");

    cy.contains("login").click();
    cy.get("#username").type("ada");
    cy.get("#password").type("sekred");
    cy.get("#login_button").click();
  });

  it("new user is logged in", function() {
    cy.contains("Ada Lovelace is logged in");
  });

  it("new user can add blog", function() {
    cy.contains("Add blog").click();
    cy.get("#title").type("New Blog in the Block");
    cy.get("#author").type("cypress");
    cy.get("#url").type("www.cypress_example.com");
    cy.contains("save").click();
    cy.contains("New Blog in the Block by cypress");
  });

  it("user can log out", function() {
    cy.contains("Log out").click();
    cy.contains("You have to log in to view the bloglist!");
  });
});

describe("Blog app with empty database and one user + one blog", function() {
  beforeEach(function() {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "Ada Lovelace",
      username: "ada",
      password: "sekred"
    };
    cy.request("POST", "http://localhost:3003/api/users", user);
    cy.visit("http://localhost:3000");

    cy.contains("login").click();
    cy.get("#username").type("ada");
    cy.get("#password").type("sekred");
    cy.get("#login_button").click();

    cy.contains("Add blog").click();
    cy.get("#title").type("New Blog in the Block");
    cy.get("#author").type("cypress");
    cy.get("#url").type("www.cypress_example.com");
    cy.contains("save").click();
    cy.contains("New Blog in the Block by cypress");
  });

  it("user can like a blog", function() {
    cy.get(".blogList")
      .contains("New Blog in the Block by cypress")
      .click();
    cy.contains("New Blog in the Block by cypress");
    cy.contains("0");
    cy.contains("like").click();
    cy.contains("1");
  });
});
