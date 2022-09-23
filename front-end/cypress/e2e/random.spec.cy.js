describe('Random', () => {
    it('CLick on tag random', () => {  
      cy.visit('http://localhost:3000/')
      cy.get('[data-test-id="random"]').click()
  
      cy.url().should('equal', 'http://localhost:3000/random')
    })
  })