Feature: Avaliar Reserva
As a usuário “Cliente”
I want to avaliar uma reserva que já foi feita
So that outros usuários possam ver a minha opinião sobre a reserva

Scenario: Ver avaliação de uma reserva
Given eu estou na página do  “Hotel Transamérica” 
When eu seleciono “Hotel Transamérica”
And eu seleciono “Avaliações”
Then eu vejo a classificação “Bom” da reserva e a nota “4,5”
And eu vejo as últimas 10 avaliações do “Hotel Transamérica”

Scenario: Avaliação de reserva bem sucedida
Given eu estou na página de “Minhas Reservas”
And ja reservei “Hotel fazenda em Gravatá”
When eu seleciono “Avaliar Reserva” abaixo da reserva de “Hotel fazenda em Gravatá”
And eu atribuo nota “3.7” em “Avaliação” e um comentario “Valeu a pena”
And eu Seleciono “Confirmar”
Then eu recebo uma mensagem  “Avaliação bem sucedida”
And eu vou para a página de “Minhas Reservas”
And eu vejo o status de concluída para a reserva do “Hotel fazenda em Gravatá ”