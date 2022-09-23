describe('Top', () => {
    it('CLick on tag top', () => {  
      cy.visit('http://localhost:3000/')
      cy.get('[data-test-id="top"]').click()
  
      cy.url().should('equal', 'http://localhost:3000/top')
    })
  })