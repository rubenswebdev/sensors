* Instala o nodejs se não tiver
* Instala o Rabbitmq https://www.rabbitmq.com/download.html
* Deixa os 3 scripts rodando ao mesmo tempo o 1, 2, 3
* Abre localhost:3000

---

  Script 1 é só a API que recebe o POST e salva na fila do RabbitMQ

  Script 2 é uma simulação do sensor somente, um script for até 1 milhão que faz post na API do script 1

  Script 3 é o cara que consome a fila e faz a conexão do Socketio acontecer, ele também disponibiliza um mini front pra ver em tempo real as coisas dos 2 primeiros scripts acontecendo.