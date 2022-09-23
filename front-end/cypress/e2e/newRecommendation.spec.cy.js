describe('Test add new recommendation', () => {
  it('New recommendation', () => {
    const newRecommendation = {
      name: "song",
      link: "https://www.youtube.com/watch?v=kbMqWXnpXcA&list=RDMMwZiPs0vqFFU&index=8"
    }

    cy.visit('http://localhost:3000/')
    cy.get('[data-test-id="song"]').type(newRecommendation.name)
    cy.get('[data-test-id="link"]').type(newRecommendation.link)

    cy.intercept('/POST', 'http://localhost:3000/recommendations').as("addRecommendation")
    cy.get('[data-test-id="send"]').click()
    cy.wait("@addRecommendation")

    cy.url().should('equal', 'http://localhost:3000/')
  })
})