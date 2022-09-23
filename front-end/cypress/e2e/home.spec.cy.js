describe('Home', () => {
    it('CLick on tag home', () => {  
      cy.visit('http://localhost:3000/')
      cy.get('[data-test-id="menu"]').click()
  
      cy.url().should('equal', 'http://localhost:3000/')
    })
  })