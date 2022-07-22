describe
  ('transactions test', () => {
    it('should show the list of transactions', () => {
      cy.intercept(
        'GET',
        'http://localhost:9000/api/transactions?limit=25offset=0', {
          fixture: 'transactions.json'
        }
      );

      cy.visit('http://localhost:3000');
      cy.get('[data-cy=transaction]').should('have.length', 1);
      cy.get('[data-cy=transaction_place]').eq(0).contains('Chinese Restaurant');
      cy.get('[data-cy=transaction_date]').eq(0).should('contain', '01/11/2021');
    });
  });
