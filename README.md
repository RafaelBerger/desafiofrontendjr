# Desafio Frontend

Aplicação web desenvolvida como parte de um desafio técnico, com foco em layout, usabilidade, responsividade e organização de componentes.

##

 # Em Produção

[https://desafiofrontendjr.vercel.app/]


##  Sobre o projeto

A aplicação simula um gerenciador de e-mails com navegação por menus, listagem dinâmica de mensagens e ações sobre os itens.  
O objetivo principal foi criar uma interface moderna, responsiva e intuitiva, seguindo boas práticas de desenvolvimento com React.

##

##  Funcionalidades

-  Tela de login (Simulação de validação usando admin como login e senha)
-  Menu lateral dinâmico consumindo API
-  Listagem de e-mails por categoria
-  Seleção de múltiplos itens
-  Arquivamento de e-mails (remoção da lista)
-  Seleção via clique no card (melhoria de usabilidade para mobile)
-  Alternância de tema (Dark / Light)
-  Layout totalmente responsivo (mobile e desktop)
-  Roteamento com React Router Dom

##

##  Diferenciais implementados

###  Foco em experiência do usuário (UX):

- Feedback claro de seleção  
- Adaptação para mobile (clique no card seleciona o card)


### Simulação de Login:
- Simulação de login e logoff (informações fixas usando *admin* para login e senha)
- Utilização de localStorage para salvar informações da pagina de Login e usá-las para validar para usuario acessar pagina /email caso logado

### Cuidado com dados sensíveis:

- .ENV implementado para armazenar conteúdos sensíveis (APIs)

### Componentização:

- Separação clara de responsabilidades  
- Reutilização de componentes (Card, Button, etc)

##


🛠️ Tecnologias utilizadas

- React.js  
- TypeScript  
- Tailwind CSS  
- Axios  
- Headless UI  (Para usar um dropdown)
- PhosphorIcons (Biblioteca de icones)
- React Router Dom (Biblioteca de roteamento)

---

## 🔌 Integração com API

Os dados são consumidos a partir de endpoints externos:


#### Menus

```http
  https://my-json-server.typicode.com/EnkiGroup/DesafioFrontEnd2026Jr/menus
```


#### Items

```http
  https://my-json-server.typicode.com/EnkiGroup/DesafioFrontEnd2026Jr/items
```
---

##  Responsividade

A aplicação foi projetada para funcionar bem em diferentes tamanhos de tela:

- Desktop 
- Tablet 
- Mobile 

Com adaptação de layout e interações.

---

##  Considerações finais

O foco principal do projeto foi entregar uma aplicação:

- Visualmente agradável  
- Funcional e intuitiva  
- Bem estruturada  
- Próxima de um cenário real de desenvolvimento  

Além dos requisitos obrigatórios, foram adicionadas melhorias de usabilidade e experiência para enriquecer o resultado final.

---

## 📌 Como rodar o projeto

```bash
# instalar dependências
npm install

# adicionar o .env
VITE_ENDPOINT_MENUS=[APIVEMAQUI]
VITE_ENDPOINT_ITEMS=[APIVEMAQUI]


# rodar o projeto
npm run dev
