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

  it("user can login", function() {
    cy.contains("login").click();
    cy.get("#username").type("maimei");
    cy.get("#password").type("sekred");
    cy.get("#login_button").click();
    cy.contains("Maija Meikäläinen is logged in");
  });
});
