describe('add transaction form', () => {
  it('should add a transaction', () => {
    cy.visit('http://localhost:3000/transactions/add');

    cy.get('[data-cy=user_input]').type('Bart');
    cy.get('[data-cy=date_input]').type('2021-12-07');
    cy.get('[data-cy=place_input]').select('Irish Pub');
    cy.get('[data-cy=amount_input]').type('200');
    cy.get('[data-cy=submit_transaction]').click();

    cy.get('[data-cy=transaction_user]').eq(9).contains('Bart');
    cy.get('[data-cy=transaction_amount]').eq(9).contains('200 €');
    cy.get('[data-cy=transaction').should('have.length', 10);
  });

  it('should remove the transaction', () => {
    cy.visit('http://localhost:3000/transactions');
    cy.get('[data-cy=transaction_remove_btn]').eq(9).click();
    cy.get('[data-cy=transaction]').should('have.length', 9);
  });

  it('should show error with wrong name', () => {
    cy.visit('http://localhost:3000/transactions/add');

    cy.get('[data-cy=user_input]').type('x');
    cy.get('[data-cy=submit_transaction]').click();
    cy.get('[data-cy=labelinput_error]').should('be.visible');
    cy.get('[data-cy=labelinput_error]').eq[0].contains('Min length is 2');

  });
});
