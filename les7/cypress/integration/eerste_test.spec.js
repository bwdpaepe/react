describe("mijn eerste test", () => {
  it("de applicatie draait", () => {
    cy.visit("http://localhost:3000");
    cy.get("h1").should("exist");
  });
});
