import signup from '../pages/SignupPage' // import das functions criadas na SignupPage
import signupFactory from '../factories/SignupFactory'
import SignupPage from '../pages/SignupPage'

describe('Signup', () => { //Criar suíte de teste
    /* skip serve para pular teste*/
    it('User should be deliver', function () { // it - comandndo para criar caso de teste dentro da suíte 
        var deliver = signupFactory.deliver()
        signup.go() // comando para navegar e clicar nos botões
        signup.fillForm(deliver) // comando para preencher cadastros
        signup.submit() // comando para submeter cadastro
        const expectedMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'
        // const - CONSTANTE, parecida com variável, mas a diferença é que ela não sofre variação
        signup.modalContentShouldBe(expectedMessage) // verificar mensagem de sucesso no final

    })

    it('Incorrect document', function () { // Segundo caso de teste
        var deliver = signupFactory.deliver() //pegando a massa de teste da page SignupFactory
        deliver.cpf = '000000141aa'
        signup.go()
        signup.fillForm(deliver)
        signup.submit()
        signup.alertMessageShouldBe('Oops! CPF inválido')

    })

    it('Incorrect email', function () { // Terceiro caso de teste
        var deliver = signupFactory.deliver()
        deliver.email = 'user.com.br'
        signup.go()
        signup.fillForm(deliver)
        signup.submit()
        signup.alertMessageShouldBe('Oops! Email com formato inválido.')
    })

    context('Required fields', function () { // criar um contexto usando cypress

        const messages = [ // massa de teste esperada fechado com [] pois é array
            { field: 'name', output: 'É necessário informar o nome' }, // field - Campo / output - saída
            { field: 'cpf', output: 'É necessário informar o CPF' },
            { field: 'email', output: 'É necessário informar o email' },
            { field: 'postalcode', output: 'É necessário informar o CEP' },
            { field: 'number', output: 'É necessário informar o número do endereço' },
            { field: 'delivery_method', output: 'Selecione o método de entrega' },
            { field: 'cnh', output: 'Adicione uma foto da sua CNH' }
            // massa de texte  criada
        ]

        before(function(){ // função de gancho
            SignupPage.go() // subfunção de contexto, indo até site e submetendo o formulário
            SignupPage.submit()
        })
        
        messages.forEach(function(msg){ // chamando a const messages da linha 39
        // msg - mensagem no singular mesmo
        // forEach, função que vai percorrer pela lista de mensagens, pois a messages é array - uma lista
            it(`${msg.field} is required`, function(){ // `` para fazer concatenação, is required para tornar dinâmico
                SignupPage.alertMessageShouldBe(msg.output)
            })
        })
    })

    /*it('Required fields', function () {
        SignupPage.go() // step de acesso a página
        SignupPage.submit() // step de clicar e submeter cadastro
        SignupPage.alertMessageShouldBe('É necessário informar o nome')
        SignupPage.alertMessageShouldBe('É necessário informar o CPF')
        SignupPage.alertMessageShouldBe('É necessário informar o e-mail')
        SignupPage.alertMessageShouldBe('É necessário informar o CEP')
        SignupPage.alertMessageShouldBe('É necessário informar o número do endereço')
        SignupPage.alertMessageShouldBe('Selecione o método de entrega')
        SignupPage.alertMessageShouldBe('Adicione uma foto da sua CNH')
    }) método simples para validar campos*/
})
/* before(function(){
        cy.log('Tudo aqui é executado uma única vez ANTES de TODOS os casos de testes')
    })

    beforeEach(function(){
        cy.log('Tudo aqui é executado sempre ANTES de CADA caso de teste')
    })

    after(function(){
        cy.log('Tudo aqui é executado uma única vez DEPOIS de TODOS os casos de testes')
    })

    afterEach(function(){
        cy.log('Tudo aqui é executado sempre DEPOIS de CADA caso de teste')
    })
    GANCHOS*/
    // var signup = new SignupPage() // para trazer as funções da página SingupPage
    // Se eu colocar essa variável que chama a classe na page object logo após o describe, eu posso usar em todos os casos de teste

/* beforeEach(function () {
 cy.fixture('deliver').then((d) => { // vai trazer massa de texte de fixtures
     this.deliver = d // comando para puxar a promessa de trazer a variável da fixtures
 })
}) */