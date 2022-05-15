// Page Object, para REUSAR códigos para casos de testes
class SignupPage {
    go(){
        cy.visit('/') // comando para visitar a página onde os testes serão feitos, o / já está puxando do cypress.json, baseUrl
        cy.get('a[href="/deliver"]').click() // comando para pegar o elemento HTML da página para encontrar onde queremos ir, e então, o .click() fará o click na página 
        cy.get('#page-deliver form h1').should('have.text', 'Cadastre-se para  fazer entregas')
        // .should('have.text', ... ) comando para dizer o que esperamos que aconteça, no caso acima, pegamos o texto que aparece na próxima página, seria um "Checkpoint"  
    }

    fillForm(deliver) { // preencher dados de cadastro do entregador
        cy.get('input[name="fullName"]').type(deliver.name) // preenchendo o nome pegando da super_variável
        cy.get('input[name="cpf"]').type(deliver.cpf) // mesmo caso para os outros
        cy.get('input[name="email"]').type(deliver.email)
        cy.get('input[name="whatsapp"]').type(deliver.whatsapp)
        cy.get('input[name="postalcode"]').type(deliver.address.postalcode)
        cy.get('input[type="button"][value="Buscar CEP"]').click()
        cy.get('input[name="address-number"]').type(deliver.address.number)
        cy.get('input[name="address-details"]').type(deliver.address.details)
        cy.get('input[name="address"]').should('have.value', deliver.address.street)
        cy.get('input[name="district"]').should('have.value', deliver.address.district)
        cy.get('input[name="city-uf"]').should('have.value', deliver.address.city_state)
        cy.contains('.delivery-method li', deliver.delivery_method).click() //.contains, para verificar texto escrito dentro do botão, para assim, clicar no botão correto
        cy.get('input[accept^="image"]').attachFile('/images/' + deliver.cnh) // Comando para inserir imagem no anexo da página, lemre-se: foto está na pasta FIXTURES
    }

    submit() { // submentendo ao botão de cadastro
        cy.get('form button[type="submit"]').click()

    }
    modalContentShouldBe(expectedMessage) { // constante criada no código, mensagem para confirmar sucesso no cadastro
        cy.get('.swal2-container .swal2-html-container').should('have.text', expectedMessage)
    }

    alertMessageShouldBe(expectedMessage) { // alerta de verificação do erro, relacionado ao teste 2, de CPF inválido
        cy.get('span.alert-error').should('have.text', expectedMessage)
    }

    alertMessageShouldBe(expectedMessage) { // alerta de verificação do erro, relacionado ao teste 3, de email inválido
        //cy.get('span.alert-error').should('have.text', expectedMessage)
        cy.contains('span.alert-error', expectedMessage).should('be.visible')
        /*Contains, comando para pegar mais de um alert, onde ele usa o expectedMessage pra
        pegar pelo alert mas tbm pela mensagem, e o be.visible para ser o mesmo efeito do have.text, mas combinando texto com classe
        e verifica se está visível*/
    }
}

export default new SignupPage; // exportar Page Object, com funções para o teste
// o new, serve para exportar como nova instância, pois colocamos a variável q chama a page object, direto no import da página de cadastro