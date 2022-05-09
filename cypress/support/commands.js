

Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    cy.get('#firstName').type('Tiago')
    cy.get('#lastName').type('Conaco')
    cy.get('#email').type('tiago.teste@teste.com.br')
    cy.get('#open-text-area').type('Teste grande a ser Inserido')
    //cy.get('button[type="submit"]').click()
    cy.contains('button','Enviar').click() 
})