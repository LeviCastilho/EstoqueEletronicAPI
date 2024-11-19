# EstoqueEletronicAPI

Descrição do Projeto:

EstoqueEletronicAPI é um serviço que se concentra em oferecer um gerenciamento de estoque, aonde nos permite fazer a gestão de fornecedores, categorias e itens!

# Funcionalidades
- Gerenciar Fornecedores: Podemos criar, recuperar, atualizar e excluir fornecedores.
- Gerenciar Categorias: Podemos criar, recuperar, atualizar e excluir categorias.
- Gerenciar Itens: Podemos criar e adicionar os itens para as categorias com seus fornecedores, recuperar, atualizar e excuir esses itens.

## ☕ Usando EstoqueEletronicAPI

Para usar EstoqueEletronicAPI localmente, siga estas etapas:

1. Clone o repositório
Primeiro, você deve clonar o repositório para o seu ambiente local. Execute o seguinte comando no terminal:

Código no bash:
```
<git clone https://github.com/LeviCastilho/EstoqueEletronicAPI.git>
```

2. Acesse o diretório do projeto
depois de clonar, navegue até a pasta em que está o projeto:

Código no bash:
```
<cd "pastaEstoqueEletronicAPI">
```

3. Instale as dependências
Agora, instale todas as dependências necessárias usando o npm:

Código no bash: 
```
<npm install>
```

4. Execute o servidor de desenvolvimento
Após a instalação das dependências, você pode rodar o projeto normalmente:

Código no bash: 
```
<npx ts-node src/app.ts>
```

5. Acesse a aplicação
Com o servidor em execução, abra o navegador e vá para http://localhost:3000

PRONTO! Agora você pode usar o EstoqueEletronicAPI localmente para gerenciar o seu estoque!

## Documentação da API
A documentação completa da API pode ser encontrada no link "https://documenter.getpostman.com/view/37604490/2sAXxWYUBU"

## 🛠 Contribuidores

Agradecimento a contribuição do projeto:

- **Jotinha14** - Desenvolvimento da busca no banco.
- **Br3no4k** - Implementação dos tratamentos de erros.
- **LeviCastilho** - Desenvolvimento da estrutura base.

## 🚀 Tecnologias Utilizadas

- **Express**: A biblioteca principal para desenvolver todo o fluxo de dados, verificações e tratamentos de erros.
- **Knex**: Utilizada para conectar no banco de dados pgAdmin4.
