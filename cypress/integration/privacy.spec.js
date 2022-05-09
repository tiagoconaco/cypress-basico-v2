


      it.only('Testa a página da política de privavidade de forma independente',function(){
        cy.visit('./src/privacy.html')
        
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT - Política de privacidade')
          .get('#title:contains(CAC TAT - Política de privacidade)').should('be.visible')
          .get('p').should('have.length', 4).last().contains('Talking About Testing')
          
      }) 