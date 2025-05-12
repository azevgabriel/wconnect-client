# Projeto Next.js - Sistema de Reservas

Este projeto é uma aplicação web construída com **Next.js 14 (App Router)** focada em autenticação, sistema de reservas e controle de sessões, com uma interface moderna e responsiva.

## ✨ Tecnologias Utilizadas

- **Next.js 14** (App Router)
- **Next-Auth** (com provedor de credenciais)
- **Tailwind CSS** + CSS Modules
- **Zod** _(utilizado apenas no back-end)_
- **React Hook Form**
- **Context API**
- **Lucide React**
- **date-fns**
- ~~**Jest**~~ _(pendente: testes unitários no front-end)_

## ✅ Funcionalidades

- Login e Registro de usuários
- Proteção de rotas com middleware (`next-auth`)
- Sessões persistentes
- Validação de datas (ex: data final não pode ser anterior à inicial)
- Cálculo automático da duração de reservas

## 🧩 Componentes

- **@components/Forms/AuthForm.tsx**: Componente reutilizável para login e registro
- **@components/Cards/TripCard.tsx**: Card com visualização das viagens
- **@components/Modals/ReservationModal.tsx**: Modal para criar/editar reservas
- **@components/Fields/DateInputWithLabel.tsx**: Seletor de datas customizado
- **@components/Shared/Badge.tsx**: Badge com status e cores temáticas

## 📄 Páginas

- Página de **Login**
- Página de **Registro**

## ⚙️ Como Rodar o Projeto

1. **Instale as dependências:**

   ```bash
   npm install
   ```

2. **Configure as variáveis de ambiente:**

   Copie o arquivo `.env.example` para `.env`:

   ```bash
   cp .env.example .env
   ```

   Em seguida, preencha os valores conforme necessário.

3. **Execute o projeto em modo de desenvolvimento:**

   ```bash
   npm run dev
   ```

4. **Abra no navegador:**

   ```
   http://localhost:3000
   ```

## 🧪 Testes

> ⚠️ Os testes unitários no front-end ainda não foram implementados. Pretende-se utilizar **Jest** para cobrir os principais fluxos futuramente.
