// import { loadFeature, defineFeature } from "jest-cucumber";
// import supertest from "supertest";
// import app from "../../src/app";
// import { Promotion } from "@prisma/client";
// import { prototype } from "events";

// const feature = loadFeature('tests/features/promotions.feature');
// const request = supertest(app);

// defineFeature(feature, (test) => {
//     let response: supertest.Response;
//     let promotions: Promotion[] = [];

//     afterEach(() => {
//         promotions = [];
//     });

//     // Scenario 1: Cadastro da promoção realizado com sucesso
//     // Given eu estou logada como "Hoteleiro" do hotel "Encantado" com o e-mail "maria@gmail.com" e a senha "let123"
//     // And eu estou na página "Cadastro de promoção" da reserva do quarto "Flores" com o valor da diária por "R$ 1300,00"
//     // When uma requisição POST é enviada para "/promotions" com o desconto de "20"%, promoção "LIMITE_QUARTO", quantidade de quartos "2"
//     // Then o status da resposta deve ser "201"
//     // And é retornada uma mensagem "Cadastro realizado com sucesso"

//     test('Cadastro da promoção bem sucedido', ({ given, when, then, and }) => {
//         given(/^O usuário "(.*)" do hotel "(.*)" está logado com o e-mail "(.*)" e a senha "(.*)"$/, async(user, hotel, email, password) => {
//             expect(user).toBe('Hoteleiro');

//         });
//         and(/^está na página "(.*)" da reserva do quarto "(.*)" com o valor da diária por "(.*)"$/, async(page, room, price) => {
//             expect(page).toBe('Cadastro de promoção');
        
//         });
//         when(/^uma requisição POST é enviada para "(.*)" com desconto de "(.*)"%, promoção "(.*)", quantidade de quartos "(.*)"$/, async(url, discount, type, num_rooms) => {
            
//         });
//     });
// })

