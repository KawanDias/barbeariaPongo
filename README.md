# A Barbearia do Pongo

Base Next.js (App Router) + TypeScript + Tailwind + Firebase, preparada para Vercel.

A interface usa exclusivamente Inter/sans-serif e Framer Motion para entradas suaves, hover e microinterações. O login/cadastro atual funciona localmente com `localStorage`; Firebase permanece disponível apenas como integração futura.

Para usar o administrador local, crie `.env.local` a partir de `.env.example` e preencha `NEXT_PUBLIC_LOCAL_ADMIN_PASSWORD` localmente. Esse arquivo é ignorado pelo Git e não deve ser publicado.

## Rotas da aplicação

- `/`: landing dark/premium, serviços, agendamento, mapa, galeria e produtos.
- `/login`: login por e-mail/senha e Google.
- `/cadastro`: cadastro local de cliente com nome, e-mail e senha.
- `/conta`: perfil do cliente e menu de opções.
- `/perfil`: atalho equivalente ao perfil do cliente.
- `/conta/agendamentos`: agendamentos do usuário autenticado.
- `/produtos`: catálogo completo com busca e filtro por categoria.
- `/portfolio`: todos os cortes cadastrados.
- `/portfolio/[id]`: detalhe com até cinco fotos e serviço pré-selecionado.
- `/agendar?service=corte-degrade`: fluxo de agendamento com serviço selecionado.
- `/admin`: painel protegido por `users/{uid}.role == "admin"`.
- `/api/payments/create`: ponto seguro para criar PIX em Mercado Pago/Asaas.
- `/api/payments/webhook`: ponto de validação do webhook de pagamento.
- `/api/notifications/booking`: ponto de integração WhatsApp + Resend.

## Estrutura relevante

```text
src/
  app/
    api/payments/{create,webhook}/route.ts
    api/notifications/booking/route.ts
    admin/page.tsx
    conta/{page.tsx,agendamentos/page.tsx}
    login/page.tsx
    page.tsx
  components/
    ui/Button.tsx
    AuthProvider.tsx
    BookingForm.tsx
    Catalog.tsx
    Gallery.tsx
    InstallPrompt.tsx
  lib/
    firebase.ts
    firestore.ts
    services.ts
```

## Começar

1. `npm install`
2. Copie `.env.example` para `.env.local` e preencha as credenciais do Firebase.
3. Ative Authentication (Google/e-mail), Firestore e Storage no Firebase Console.
4. Publique as regras com `firebase deploy --only firestore:rules` (após configurar o Firebase CLI).
5. `npm run dev`

## Modelo Firestore

- `services/{serviceId}`: `name`, `description`, `priceCents`, `durationMinutes`, `active`.
- `bookings/{YYYY-MM-DD_HHmm}`: cliente, serviço, `date`, `time`, `status`, `paymentStatus`, `paymentId`, timestamps.
- `availability/{YYYY-MM-DD}`: `closed`, `blockedTimes`, `openTime`, `closeTime`.
- `products/{productId}`: `name`, `description`, `priceCents`, `imageUrl`, `stock`, `active`.
- `gallery/{itemId}`: `imageUrl`, `caption`, `createdAt`, `approved`.
- `customers/{uid}`: `name`, `phone`, `email`, `loyaltyCuts`, timestamps.
- `users/{uid}`: `uid`, `name`, `email`, `role` (`cliente` ou `admin`), `createdAt`.
- `professionals/{professionalId}`: `name`, `photoUrl`, `specialties`, `workSchedule`, `active`.
- `products/{productId}`: `name`, `description`, `category`, `priceCents`, `imageUrls` (máximo 5), `emDestaque`, `active`, timestamps.
- `gallery/{itemId}`: `name`, `description`, `serviceId`, `suggestedPriceCents`, `imageUrls` (máximo 5), `emDestaque`, `approved`, timestamps.
- `bookings/{date_time_professionalId}`: `customerId`, `customerName`, `customerPhone`, `customerEmail`, `serviceId`, `serviceName`, `durationMinutes`, `professionalId`, `professionalName`, `date`, `time`, `priceCents`, `status`, `paymentStatus`, `paymentId`, timestamps.

O ID determinístico de `bookings` e a transação `createBooking` evitam double-booking. O pagamento deve ser criado em uma Route Handler/Cloud Function usando segredo do provedor; nunca exponha tokens no browser. O webhook deve validar assinatura, atualizar `paymentStatus` e então mudar `status` para `confirmed`, disparando notificações.

Para promover o primeiro administrador, crie o usuário pelo Firebase Authentication e adicione manualmente `users/{uid}` no Firestore com `role: "admin"`. Usuários novos são criados como `cliente` pelo `AuthProvider`; a regra Firestore impede escrita administrativa por clientes.

O e-mail `barbeariapongo@gmail.com` é reconhecido como administrador no cliente e nas regras Firestore. A senha da conta deve ser criada/atualizada no Firebase Authentication (não é armazenada no código ou no repositório); configure-a no Console do Firebase com a política de senha desejada.

Para ativar o acesso mestre, no Firebase Console habilite o provedor **E-mail/senha** e crie:

```text
E-mail: barbeariapongo@gmail.com
Senha: definida localmente em `NEXT_PUBLIC_LOCAL_ADMIN_PASSWORD`
```

O código não simula uma sessão nem mantém a senha no navegador: o Firebase valida a credencial. Depois de um login válido com esse e-mail, o `AuthProvider` atribui `admin` e `/login` redireciona para `/admin`. Cadastros comuns são autenticados automaticamente pelo Firebase e recebem `role: "cliente"`.
