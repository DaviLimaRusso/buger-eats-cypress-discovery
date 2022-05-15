var faker = require('faker') // Comando para trazer biblioteca baixada pelo terminal Node
// require é para trazer, faker é o nome da bibliotela, no terminal fizemos npm istall faker --save-dev
var cpf = require('gerador-validador-cpf') // comando para trazer biblioteca baixada pelo Node
// Comando para gerar CPF para testes
export default {

    deliver: function(){
        var firstName = faker.name.firstName()
        var lastName = faker.name.lastName()
        
        var data = {
            name: `${firstName} ${lastName}`, // comando para trazer o nome pela biblioteca instalada, vai trazer dados dinâmicos
            cpf: cpf.generate(), // função para gerar CPF
            email: faker.internet.email(firstName), // comando para trazer um e-mail aleatório baseado no primeiro nome do teste
            whatsapp: '11999999999',
            address: {
                postalcode: '04534011',
                street: 'Rua Joaquim Floriano',
                number: '1000',
                details: 'Apto 142',
                district: 'Itaim Bibi',
                city_state: 'São Paulo/SP'
            },
            delivery_method: 'Moto',
            cnh: 'cnh-digital.jpg'
        }

        return data
    }
}