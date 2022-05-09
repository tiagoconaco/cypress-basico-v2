/// <reference types="Cypress" />

//const { get } = require("cypress/types/lodash")


describe('Central de Atendimento ao Cliente TAT', function() {
    
    //Esse comando serve para garantir que sempre antes de cada teste vai acessar essa pagina.
    const user = {}
    beforeEach(function() {
        cy.visit('./src/index.html')
    })
    
    // O be.equal verifica se o parametro que colocamos realmente é o mesmo que está na aplicação.
    it('Verifica o título da aplicação', function() {
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
    })

    it('Preenche os campos obrigatórios e envia o formulário', function(){
        const longText = 'Gostaria de saber se esse teste funcionou hehe Gostaria de saber se esse teste funcionou hehe Gostaria de saber se esse teste funcionou hehe'
        cy.get('input[name="firstName"]')
          .type('Tiago')
        cy.get('input[name="lastName"]')
          .type('Conaco')
        cy.get('input[id="email"]')
          .type('tiago.teste@teste.com.br')
        //Exercício extra 1
        cy.get('textarea[name="open-text-area"]')
          .type(longText, {delay: 0})
        //cy.get('button[type="submit"]').click() 
        cy.contains('button','Enviar').click()

        cy.get('span[class="success"]')
          .should('be.visible')
    })

    //https://github.com/wlsf82/cypress-basico-v2/blob/main/lessons/02.md
    //Exercício extra 2
    it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        cy.get('input[name="firstName"]')
          .type('Tiago')
        cy.get('input[name="lastName"]')
          .type('Conaco')
        cy.get('textarea[name="open-text-area"]')
          .type('Gostaria de saber se esse teste funcionou hehe', {delay: 0})
      
        cy.get('input[id="email"]')
          .type('emailinvalido')

        //cy.get('button[type="submit"]').click()
        cy.contains('button','Enviar').click()  
        
        // Verifica se depois do click o e-mail está valido ou não.
        cy.get('span[class="error"]')
          .should('be.be.visible')      
      })

    //Exercício extra 3  
    it('Verificar se digitar algo diferente de número o campo permanece em branco', function(){
        cy.get('input[type="number"]')
          .type('Teste Sem Número')
          .should('have.value', '')
    })
  
    //Exercício extra 4
    it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário',function(){
        cy.get('input[name="firstName"]').type('Tiago')
        cy.get('input[name="lastName"]').type('Conaco')
        cy.get('input[id="email"]').type('tiago.teste@teste.com.br')
        cy.get('textarea[name="open-text-area"]').type('Gostaria de saber se esse teste funcionou hehe', {delay: 0})

        cy.get('input[id="phone-checkbox"]').check().should('be.checked')
        
        //cy.get('button[type="submit"]').click()  
        cy.contains('button','Enviar').click()

        cy.get('span[class="error"]')
          .should('be.visible')
    })

      //Exercício extra 5
      it('Preenche e limpa os campos nome, sobrenome, email e telefone', function(){
          cy.get('input[name="firstName"]')
            .type('Tiago')
            .should('have.value','Tiago')
            .clear()
            .should('have.have','')

          cy.get('input[name="lastName"]')
            .type('Conaco')
            .should('have.value','Conaco')
            .clear()
            .should('have.value','')

          cy.get('input[id="email"]')
            .type('tiago.teste@teste.com.br')
            .should('have.value','tiago.teste@teste.com.br')
            .clear()
            .should('have.value','')

          cy.get('input[type="number"]')
            .type('47988016184')
            .should('have.value','47988016184')
            .clear()
            .should('have.value','')
      })
      
      //Exercício extra 6
      it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
        //cy.get('button[type="submit"]').click()  
        cy.contains('button','Enviar').click()
          .get('.error')
          .should('be.visible')
      })
      
      //Exercício extra 7
      
      it('Envia o formuário com sucesso usando um comando customizado', function() {
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
      })
      //https://github.com/wlsf82/cypress-basico-v2/blob/main/lessons/03.md
      //Aula 02 -  Exercicio 01
      it('seleciona um produto (YouTube)', function(){
        cy.get('select').select('YouTube')
      })

      //Aula 02 -  Exercicio 02 
      it('Verifique que a seleção anteriro realmente está preenchida', function(){
        cy.get('select').select('YouTube').should('have.value','youtube')
      })

      //Aula 02 -  Exercício extra 1

      it('seleciona um produto (Mentoria) por seu valor (value)-Verifica se foi selecionado de fato a ultima informação', function(){
        cy.get('select').select('mentoria').should('have.value','mentoria')
      })

      // Aula 02 0 Exercício extra 2
      it('seleciona um produto (Blog) por seu índice', function(){
        cy.get('select')
          .select(1)
          .should('have.value','blog')
      })
      // https://github.com/wlsf82/cypress-basico-v2/blob/main/lessons/04.md

      it('Marca o tipo de atendimento Feedback', function(){
        cy.get('input[type="radio"]')
          .check('feedback')
          .should('have.value','feedback')
      })

      it('Marca cada tipo de atendimento e verifica se foi marcado 01', function(){
        cy.get('input[type="radio"]')
          .should('have.length', 3)
          .each(function($radio) {
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')  
          })
      })

      it('Marca ambos checkboxes, depois desmarca o último 1', function(){
        cy.get('input[type="checkbox"]')
          .as('checkboxes').check()
          .each(function($checkbox){
            cy.wrap($checkbox).should('be.checked')
          })
          .last().uncheck()
          .last().should('not.be.checked')
      })
      it('Marca ambos checkboxes, depois desmarca o último 2', function(){
        cy.get('input[type="checkbox"]')
          .check()
          .should('be.checked')
          .last().uncheck()
          .should('not.be.checked')
      })

      //https://github.com/wlsf82/cypress-basico-v2/blob/main/lessons/06.md
      it('Seleciona um arquivo da pasta fixtures', function(){
        cy.get('input[type="file"]')
          .should('not.have.value')
          .selectFile('cypress/fixtures/example.json')
          .should(function($input){
            console.log($input)
            expect($input[0].files[0].name).to.equal('example.json')
          })
      })  

      it('seleciona um arquivo simulando um drag-and-drop', function(){
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('cypress/fixtures/example.json', {action : "drag-drop"})
        .should(function($input){
          expect($input[0].files[0].name).to.equal('example.json')
        })
      })

      it('Seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
        cy.fixture('example.json').as('arquivoExemplo')
        cy.get('input[type="file"]')
          .should('not.have.value')
          .selectFile('@arquivoExemplo')
          .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
          })
      })
      //https://github.com/wlsf82/cypress-basico-v2/blob/main/lessons/07.md

      it('Verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
        cy.get('#privacy a')
          .should('have.attr','target','_blank')
      })

      it('Acessa a página da política de privacidade removendo o target e então clicanco no link',function(){
        cy.get('#privacy a')
          .invoke('removeAttr','target').click()
      }) 

      //https://github.com/wlsf82/cypress-basico-v2/blob/main/lessons/08.md
      //https://github.com/wlsf82/cypress-basico-v2/blob/main/lessons/09.md
})