
describe('Acessar Conta', function() {

    it('Realizar Login', function() {

        cy.viewport(1440,900)
        cy.visit('https://supercampo.sandbox.clubecdp.com.br/')
        cy.get('li a[href="/login?targetUri=%2F"]').click()
        cy.get('p[class="title-auth mb-lg"]').should('have.text', 'Acesse sua conta')

        var login = {
            usuario: 'davi.russo@cws.digital',
            senha: 'Mudar12!'
        }

        cy.get('input[id="username"]').type(login.usuario)
        cy.get('input[type="password"]').type(login.senha)
        cy.get('input[type="submit"]').click()
        cy.get('span[id="hello-user"]').should('have.text', 'Olá, Davi')
    })
})