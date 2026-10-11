# Clean Architecture: Notification Pattern na Entidade Product

## Objetivo

Refatorar a validação da entidade `Product` para utilizar o **Notification Pattern**.

Substituir o lançamento imediato de exceções (que interrompem o fluxo) por um **container acumulador de erros**, permitindo que a aplicação identifique e reporte todas as inconsistências de uma única vez.

## Tecnologias e Ferramentas

- **Linguagem:** TypeScript
- **Padrão:** Notification Pattern
- **Testes:** Unitários (Jest ou similar)
- **Base do Projeto:** Repositório Template (obrigatório)

## Estrutura Base (Obrigatória)

Obrigatório usar o código base disponibilizado pelo curso:

- https://github.com/devfullcycle/fc-clean-architecture.git

Projetos que não usarem a estrutura do repositório base não serão aceitos.

## Requisitos Técnicos

### Refatoração

- Modificar a classe `Product` (e suas validações) para usar o padrão `Notification`.
- Ao invés de lançar `Error` imediatamente ao quebrar uma regra, a entidade deve adicionar o erro à notificação.
- A entidade só deve ser considerada inválida se houver erros na notificação.

### Validação

- Garantir que **todas** as regras de negócio atuais da entidade continuem sendo verificadas.

## Critérios de Testes (Obrigatório)

Criar ou adaptar os testes automatizados para validar o novo comportamento.

- **Teste de Múltiplos Erros:** teste específico que force **dois erros de validação simultâneos** (ex.: `Name` vazio e `Price` negativo) e verifique se a notificação contém **ambos** os erros.

## Entregável

- **Link do Repositório:** GitHub com o código refatorado e os testes.
- **README:** instruções de como rodar os testes.

## Regras de Entrega

- **Repositório Único:** apenas um projeto por repositório.
- **Branch Principal:** todo o código na branch `main`.
- **Base Obrigatória:** uso obrigatório da estrutura do repositório base fornecido.
