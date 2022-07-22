describe('mijn eerste test', () => {
  it('doet niet veel', () => {
    expect(true).to.equal(true);
  });
  it('application is running', () => {
    cy.visit('http://localhost:3000');
    cy.get('h1').should('exist');
  });
});
