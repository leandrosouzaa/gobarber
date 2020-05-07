# Recuperação de Senha

  **RF**
      - O usuário deve poder recuperar sua senha informando o seu e-mail;
      - O usuário deve receber um e-mail con instruções de recuperação de senha;
      - O usuário deve poder restar sua senha;

  **RNF**
      - Utilizar Mailtrap para testar envios em abiente de dev;
      - Utilizar Amazon SES para envios em produção;
      - O envio de e-mails deve acontecer em segundo plano (background job);

  **RN**
      - O link enviado por email para resetar a senha, deve expirar em 2h;
      - O usuário precisa confirmar a nova senha ao resetar sua senha;

# Atualização do Perfil
   **RF**
      - O Usuário deve poder atualizar seu nome, email e senha;
      - As notificações do prestador devem ser armazenadas no MongoDB

   **RNF**

   **RN**
      - O usuário não pode alterar seu e-mail para um e-mail já utilizado;
      - Para atualizar sua senha, o usuário deve informar a senha antiga;
      - Para atualizar sua senha, o usuário precisa confirmar sua senha;



# Painel do Prestador
   **RF**
      - O usuário deve poder listar seus agendamentos de um dia específico;
      - O prestador deve receber uma notificação sempre que hourver um novo agendamento;
      - O prestador deve poder visualizar o as notificações não lidas;
   **RNF**
      - Os agendamentos do prestador no dia devem ser armazenados em cache;
      - As notificações do prestador devem ser armazenadas no MongoDB;
      - As notificações do prestador devem ser enviadas em tempo-real utilizando o Socket.io;

   **RN**
      - A notificação deve ter um status de lida ou não lida para que o prestador possa controlar;



# Agendamento de serviços
   **RF**
      - O usuário deve poder listar todos os prestadores já cadastrados;
      - O usuário deve poder listar os dias de um mês com pelo menos um horário disponível de um prestador;
      - O usuário deve poder listar horários disponíveis em uma dia específico de um prestador;
      - O usuário deve poder realizar um novo agendamento com um prestador;
   **RNF**
      - A listagem de prestadores deve ser armazenada em cache;

   **RN**
      - Cada agendamento deve dura 1 hora exatamente;
      - Os agendamentos devem estar disponíveis entre 8h as 18h (Primeiro às 8, último às 17h);
      - O usuário não pode agendar em um horário que já passou;
      - O usuário não pode marcar um horário consigo mesmo;







