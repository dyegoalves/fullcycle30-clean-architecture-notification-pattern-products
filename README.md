# Clean Architecture: Notification Pattern na Entidade Product

Refatoração da validação da entidade `Product` para o **Notification Pattern**, substituindo o lançamento imediato de exceções por um acumulador de erros.

Base: [devfullcycle/fc-clean-architecture](https://github.com/devfullcycle/fc-clean-architecture.git)

## Como rodar os testes

Requer Node.js (testado com v22) e npm.

```bash
npm install
npm test
```

`npm test` roda a checagem de tipos (`tsc --noEmit`) e o Jest.

Para rodar só os testes de Product:

```bash
npx jest src/domain/product
```

## Validar no navegador (opcional)

```bash
npm run dev
```

Abrir http://localhost:3000. Form: deixe **Name vazio** e **Price negativo** → a página mostra **os dois erros juntos** (`product: Name is required` e `product: Price must be greater than zero`).

Endpoint: `POST /product` → `201` com o produto, ou `400` com `{ "errors": [...] }`.

## O que mudou

- `Product` e `ProductB` agora estendem `Entity` (herdam `notification`) e, em vez de lançar `Error` na primeira regra quebrada, **acumulam** os erros na notificação.
- A entidade só é considerada inválida se houver erros na notificação; ao final da construção, se houver erros, é lançado um `NotificationError` com **todos** eles.
- Validação delegada a um validator (Yup), no mesmo padrão já usado em `Customer`.

Arquivos:

- `src/domain/product/validator/product.yup.validator.ts` — regras (`Id`, `Name`, `Price`).
- `src/domain/product/factory/product.validator.factory.ts` — factory do validator.
- `src/domain/product/entity/product.ts` / `product-b.ts` — entidades refatoradas.
- `src/domain/product/entity/product.spec.ts` — testes, incluindo o de **múltiplos erros simultâneos**.

## Regras de negócio mantidas

- `Id` obrigatório.
- `Name` obrigatório.
- `Price` deve ser maior ou igual a zero.

## Teste de múltiplos erros

`Name` vazio **e** `Price` negativo ao mesmo tempo: a notificação contém **ambos** os erros (`product: Name is required` e `product: Price must be greater than zero`).
