Feature: Publicar Reservas
  Como um usuário “Hoteleiro”
  Eu quero publicar as reservas do meu hotel
  Para que eu possa disponibilizar os quartos para reserva pelos clientes

  Scenario: Publicar uma reserva com sucesso
    Given que estou logado como usuário “Hoteleiro” com login “thaisnevest” e senha “12345678”
    When uma requisição POST é enviada para "/hotelier/publishedReservation" com os dados:
      | name          | Quarto Standard        |
      | rooms         | 1                      |
      | people        | 2                      |
      | wifi          | true                   |
      | breakfast     | true                   |
      | airConditioner| true                   |
      | parking       | true                   |
      | room_service  | true                   |
      | price         | R$450/diária           |
    Then o status da resposta deve ser "201"
    And a mensagem de confirmação “A reserva do Serrambi Resort foi publicada com sucesso” deve ser retornada
    And a reserva "Quarto Standard" deve estar presente no endpoint "GET /hotelier/publishedReservation"

  Scenario: Publicar uma reserva com dados incompletos
    Given que estou logado como usuário “Hoteleiro” com login “thaisnevest” e senha “12345678”
    When uma requisição POST é enviada para "/hotelier/publishedReservation" com os dados:
      | name          | Quarto Standard        |
      | rooms         | 1                      |
      | wifi          | true                   |
    Then o status da resposta deve ser "400"
    And a mensagem de erro “Os campos obrigatórios não foram preenchidos” deve ser retornada
    And a reserva não deve ser publicada
