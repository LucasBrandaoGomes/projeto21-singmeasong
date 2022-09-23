describe('Upvote', () => {
    it('CLick on upvote arrow', () => {  
      cy.visit('http://localhost:3000/')
      cy.get('[data-test-id="up"]').click()
  
      cy.url().should('equal', 'http://localhost:3000/top')
    })
  })