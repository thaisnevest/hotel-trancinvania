Feature: Gerenciar Reservas
  Como um usuário "Hoteleiro"
  Eu quero gerenciar as reservas do meu hotel
  Para que eu possa visualizar, editar ou cancelar as reservas existentes

  Scenario: Visualizar detalhes de uma reserva
    Given que estou logado como usuário "Hoteleiro" com login "thaisnevest" e senha "12345678"
    When uma requisição GET é enviada para "/hotelier/publishedReservation/1"
    Then o status da resposta deve ser "200"
    And os detalhes da reserva devem incluir:
      | id            | 1                      |
      | name          | Quarto Standard        |
      | rooms         | 1                      |
      | people        | 2                      |
      | wifi          | true                   |
      | breakfast     | false                  |
      | airConditioner| true                   |
      | parking       | true                   |
      | room_service  | true                   |
      | price         | R$978/diária           |
      | new_price     | R$900/diária           |

  Scenario: Editar uma reserva existente
    Given que estou logado como usuário "Hoteleiro" com login "thaisnevest" e senha "12345678"
    And a reserva "Quarto Standard" está cadastrada com os campos:
      | rooms         | 1                      |
      | people        | 2                      |
    When uma requisição PUT é enviada para "/hoteleiro/publishedReservation/1" com os dados:
      | name          | Suíte Tripla           |
      | rooms         | 1                      |
      | people        | 3                      |
    Then o status da resposta deve ser "200"
    And a mensagem "A reserva foi atualizada" deve ser retornada
    And a reserva "Suíte Tripla" deve refletir as alterações quando consultada no endpoint "GET /hotelier/publishedReservation/1"

  Scenario: Cancelar uma reserva existente
    Given que estou logado como usuário "Hoteleiro" com login "thaisnevest" e senha "12345678"
    When uma requisição DELETE é enviada para "/hotelier/publishedReservation/1"
    Then o status da resposta deve ser "200"
    And a mensagem "A reserva foi cancelada" deve ser retornada
    And a reserva "Quarto Standard" não deve estar presente no endpoint "GET /hotelier/publishedReservation/1"
