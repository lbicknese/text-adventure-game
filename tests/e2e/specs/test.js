// https://docs.cypress.io/api/introduction/api.html

describe('Login processes', () => {
  it('should login', () => {
    cy.clearLocalStorage()
    cy.visit('/')
    cy.get('#logout').should('not.exist')
    cy.contains('h1', 'Login')
    cy.title().should('include', 'Login')
    cy.get('input#username').should('exist')
    cy.get('label[for="username"]').type('luke')
    cy.get('span#username-info').contains(/\w+/)
    cy.get('button#login').contains('Login').click()
    cy.title().should('include', 'Text Adventure')
    cy.contains('#username', 'luke')
    cy.get('#logout').should('exist')
  })
  it('should go to home if already logged in', () => {
    localStorage.setItem('username', 'john')
    cy.visit('/')
    cy.title().should('include', 'Text Adventure')
    cy.contains('#username', 'john')
    cy.get('#logout').contains('Logout').should('exist')
  })
  it('should logout', () => {
    localStorage.setItem('username', 'john')
    cy.visit('/')
    cy.get('#logout').contains('Logout').should('exist')
    cy.get('#logout').click()
    cy.contains('h1', 'Login')
    cy.get('#logout').should('not.exist')
  })
})
