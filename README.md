# 🖥️ TeamBlog – Frontend

Frontend do **TeamBlog**, desenvolvido para consumir a API REST do backend em **Spring Boot**, oferecendo uma experiência moderna de blog com autenticação, perfil de usuário, comentários e área administrativa.

---

## 🚀 Tecnologias Utilizadas

* **Next.js (App Router)**
* **React**
* **TypeScript**
* **TailwindCSS**
* **shadcn/ui**
* **Lucide Icons**

---

## ✨ Funcionalidades

### 🔐 Autenticação

* Login e registro de usuários
* Autenticação via **JWT**
* Login social com **Google** e **GitHub** (OAuth2)
* Proteção de rotas autenticadas

### 👤 Perfil do Usuário

* Visualização do perfil
* Edição de nome, bio, localização e website
* Upload e troca de avatar

### 📝 Blog

* Listagem de posts
* Visualização de post individual
* Comentários em posts
* Respostas a comentários (threaded comments)

### 🧾 Pedidos

* Criação de pedidos
* Visualização da posição na fila
* Histórico de pedidos do usuário

### 🛠️ Área Administrativa

* Gerenciamento de posts
* Gerenciamento de pedidos
* Dashboard administrativo

---

## 🔑 Autenticação

### JWT

* Token armazenado no navegador
* Enviado automaticamente nas requisições protegidas

```http
Authorization: Bearer <token>
```

* Perfil carregado via:

```http
GET /api/profile/me
```

### OAuth2

Autenticação social realizada via backend:

* Google
* GitHub

O frontend apenas redireciona o usuário para o provedor e recebe o token após o login.

---

## 🌐 Integração com Backend

* Comunicação via **API REST**
* Backend em **Spring Boot**
* Autenticação centralizada no servidor
* Controle de permissões baseado em roles

---

## ▶️ Executando o Projeto

```bash
npm install
npm run dev
```

A aplicação estará disponível em:

```
http://localhost:3000
```

---

## ⚙️ Variáveis de Ambiente

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

---

## 📌 Observações

* Interface moderna e responsiva
* Componentes reutilizáveis
* Arquitetura preparada para crescimento
* Fácil integração com novas funcionalidades

---



⭐ Se esse projeto te ajudou, deixa uma estrela!
