Feature: Criar cadastro de clientes
As a Usuário "Hoteleiro" ou "Cliente"
I want to cadastrar-me na plataforma de reserva de hoteis “hotel trancinvânia”
So that eu possa realizar ações no sistema de acordo com meu tipo de usuário

Scenario: Cadastro Bem-Sucedido de Usuário Cliente
  Given Eu estou na página inicial
  And Eu não estou logado
  When Eu clico em “Cadastre-se”
  And preencho o campo “Nome” com “Bárbara Alencar”
  And preencho o campo “E-mail” com “barbara.alencar@gmail.com”
  And preencho o campo “login” com “barbaralencar”
  And preencho o campo “CPF com “021.957.235-12”
  And preencho o campo “Número de Telefone” com “(81) 9934-2351”
  And preencho o campo “Data de Nascimento” com “12/09/1984”
  And preencho o campo “Senha” com “@AmoBolo123”
  And tento realizar meu cadastro
  Then eu posso ver a mensagem “Cadastro Realizado com Sucesso”
  And sou redirecionado para a página “Login”

Scenario: Cadastro Bem-Sucedido de Usuário Hoteleiro
  Given Eu estou na página inicial
  And Eu não estou logado
  When Eu clico em “Anuncie sua propriedade”
  And preencho o campo “Nome” com “Mavis Drácula”
  And preencho o campo “E-mail” com “mavis.dracula@trancinvania.com”
  And preencho o campo “login” com “mavisdracula”
  And  preencho o campo “Endereço do Hotel” com “Rua do Desassossego, 31”
  And preencho o campo “CEP” com “56795-000”
  And preencho o campo “Cidade” com “Solidão”
  And preencho o campo “Estado” com “PE”
  And preencho o campo “CNPJ” com “27. 215. 333/0001-15”
  And preencho o campo “Senha”com “@AmoSexta13”
  Then Eu posso ver a mensagem “Cadastro Realizado com Sucesso”
  And Eu sou redirecionado para a página “Gerenciamento de Reservas”

Scenario: Cadastro Mal-Sucedido de Usuário Cliente por E-mail já cadastrado
  Given Eu estou na página inicial
  And o e-mail ““barbara.alencar@gmail.com” já está cadastrado no sistema
  When Eu clico em “Cadastre-se”
  And preencho o campo “Nome” com “Bárbara Alencar”
  And preencho o campo “E-mail” com “barbara.alencar@gmail.com”
  And preencho o campo “login” com “barbaralencar”
  And preencho o campo “CPF” com “021.957.235-12”
  And preencho o campo “Número de Telefone” com “(81) 9934-2351”
  And preencho o campo “Data de Nascimento” com “12/09/1984”
  And preencho o campo “Senha” com “@AmoBolo123”
  And tento realizar meu cadastro
  Then Eu vejo uma mensagem de erro “E-mail já cadastrado no sistema”
  And Eu vejo as opções de “Login” e “Esqueci a Senha”

Scenario: Cadastro Mal-Sucedido de Usuário Hoteleiro por E-mail já cadastrado
  Given Eu estou na página inicial
  And o e-mail “mavis.dracula@trancinvania.com” já está cadastrado no sistema
  When Eu clico em “Anuncie sua propriedade”
  And preencho o campo “Nome” com “Mavis Drácula”
  And preencho o campo “E-mail” com “mavis.dracula@trancinvania.com”
  And preencho o campo “login” com “mavisdracula”
  And  preencho o campo “Endereço do Hotel” com “Rua do Desassossego, 31”
  And preencho o campo “CEP” com “56795-000”
  And preencho o campo “Cidade” com “Solidão”
  And preencho o campo “Estado” com “PE”
  And preencho o campo “CNPJ” com “27. 215. 333/0001-15”
  And preencho o campo “Senha”com “@AmoSexta13”
  Then Eu vejo uma mensagem de erro “E-mail já cadastrado no sistema”
  And Aparecem as opções de “Login” e “Esqueci a Senha”
  And Os campos aparecem todos vazios
  And Eu permaneço na página de "Cadastro"Scenario: Cadastro Mal-Sucedido de Usuário Cliente por Campo em Branco
  Given Eu estou na página “Inicial”
  And o e-mail ““barbara.alencar@gmail.com” já está cadastrado no sistema
  When Eu clico em “Cadastre-se”
  And preencho o campo “Nome” com “Bárbara Alencar”
  And preencho o campo “E-mail” com “barbara.alencar@gmail.com”
  And preencho o campo “CPF com “”
  And preencho o campo “Número de Telefone” com “(81) 9934-2351”
  And preencho o campo “Data de Nascimento” com “12/09/1984”
  And preencho o campo “Senha” com “@AmoBolo123”
  And tento realizar meu cadastro
  Then Eu vejo uma mensagem de erro “Operação não concluída devido a ausência de preenchimento de campos obrigatórios.”
  And Eu continuo na página de “Cadastro”

Scenario: Cadastro Mal-Sucedido de Usuário Hoteleiro por Campo em Branco
  Given Eu estou na página “Inicial”
  And o e-mail “mavis.dracula@trancinvania.com” já está cadastrado no sistema
  When Eu clico em “Anuncie sua propriedade”
  And preencho o campo “Nome” com “Mavis Drácula”
  And preencho o campo “E-mail” com “mavis.dracula@trancinvania.com”
  And preencho o campo “login” com “mavisdracula”
  And  preencho o campo “Endereço do Hotel” com “Rua do Desassossego, 31”
  And preencho o campo “CEP” com “56795-000”
  And preencho o campo “Cidade” com “Solidão”
  And preencho o campo “Estado” com “PE”
  And preencho o campo “CNPJ” com “27. 215. 333/0001-15”
  And preencho o campo “Senha”com “@AmoSexta13”
  And tento realizar meu cadastro
  Then Eu vejo uma mensagem de erro “Operação não concluída devido a ausência de preenchimento de campos obrigatórios.”
  And Eu continuo na página de “Cadastro”

 Scenario: Cadastro Mal-Sucedido de Usuário Cliente por Senha menor que 6 caracteres
  Given Eu estou na página “Inicial”
  And a senha precisa ser maior que 6 caracteres
  When Eu clico em “Cadastre-se”
  And preencho o campo “Nome” com “Bárbara Alencar”
  And preencho o campo “E-mail” com “barbara.alencar@gmail.com”
  And preencho o campo “CPF com “”
  And preencho o campo “Número de Telefone” com “(81) 9934-2351”
  And preencho o campo “Data de Nascimento” com “12/09/1984”
  And preencho o campo “Senha” com “@Amo”
  And tento realizar meu cadastro
  Then Eu vejo uma mensagem de erro “Erro! Sua senha precisa ser maior que 6 caracteres.”
  And Eu continuo na página de “Cadastro”