# 🏡 WanderNest – Seamless Vacation Rental Experience

🔗 **Live Demo:** [https://wander-nest-production.vercel.app](https://wander-nest-production.vercel.app)  
📦 **GitHub Repo:** [WanderNest](https://github.com/MusarrafAM/WanderNest)

---

## 📌 Project Overview

**WanderNest** is a modern and secure vacation rental platform that enables users to **search**, **book**, and **review** properties, while allowing hosts to **list accommodations** with full control over features, pricing, and availability.

Unlike traditional rental apps, WanderNest emphasizes **interactivity, user engagement, visual clarity**, and **modern development practices**, built entirely using **Next.js**, **TypeScript**, and **Supabase**. The project offers a **scalable architecture**, clean UI, and real-world integrations such as **Stripe for payments** and **Clerk for authentication**.

---

## 🧠 Why These Technologies?

| Tech | Role | Justification |
|------|------|---------------|
| **Next.js** | Frontend Framework | SSR & routing out of the box for optimal SEO and performance |
| **TypeScript** | Type Safety | Reduces bugs and improves code maintainability |
| **Tailwind CSS + ShadCN** | Styling & Components | Utility-first CSS and prebuilt accessible components for rapid UI development |
| **Supabase (PostgreSQL + Buckets)** | Database & Media | Modern backend-as-a-service with real-time DB and media support |
| **Prisma** | ORM | Simplifies DB interactions and ensures type-safe queries |
| **Zustand** | State Management | Lightweight and scalable for local/global state handling |
| **Stripe** | Payments | Secure and developer-friendly checkout experience |
| **Clerk** | Authentication | Plug-and-play auth with roles and session management |
| **Zod** | Validation | Schema-based runtime validation to prevent malformed input |

---

## 💡 Features at a Glance

- 🔍 Debounced **search** with category filtering  
- 🌙 **Light/Dark mode** toggle  
- ❤️ Save and view **favorite properties**  
- ⭐ **Rate and review** properties (5-star + comment)  
- 🔗 Share via **WhatsApp, Twitter, or Email**  
- 📅 Book stays with date picker + **Stripe** checkout  
- 🏠 **Host dashboard** to post and manage properties  
- 📸 Upload photos and list amenities using Supabase Buckets

---

## ✅ Best Practices Followed

- 🔒 Role-based secure routing via Clerk  
- ♻️ Reusable components and layout patterns (e.g., layout.tsx, modals, toasts)  
- 📦 Modular folder structure with clear separation of concerns (`hooks/`, `lib/`, `components/`)  
- 🧼 ESLint + Prettier for consistent code style  
- 🚫 Client-side data validation with Zod  
- ⌨️ Strong typing across the stack with TypeScript  
- 🔐 Sensitive environment config via `.env.local`

---

## 🧩 Applied Algorithms & Patterns

- **Debounced Search**: Optimized search queries using `setTimeout` and cleanup logic  
- **Optimistic UI Updates**: Instant feedback for favorites and reviews before server confirmation  
- **Responsive Layouts**: Grid and Flexbox patterns with Tailwind for mobile-first design  
- **Design Patterns Used**:
  - **Container/Presentational Pattern**
  - **Hook-based abstraction for logic (e.g., `useDebounce`, `useFavorite`)**
  - **Atomic Design Principles** for reusable UI elements

---

## 🧪 Testing Strategy

| Test Type | Tools | Coverage |
|-----------|-------|----------|
| **Manual Integration Testing** | DevTools, Mobile Viewports | UI responsiveness, flow from search → book → pay |
| **API Endpoint Testing** | Supabase Table Rules & Logs | Validates real-time data and permissions |
| **Client-Side Testing** *(Planned)* | Jest + React Testing Library | Component behavior (e.g., modals, filters)  
| **User Feedback (UAT)** | Collected via surveys | Feedback-driven updates for UI & UX  

---

## 🚀 Deployment Instructions

### Frontend: **Vercel**
- Connect your GitHub repo
- Add the following environment variables under project settings:
  ```env
  NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
  NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
  STRIPE_SECRET_KEY=your_stripe_secret_key
  CLERK_FRONTEND_API=your_clerk_frontend_api
  CLERK_API_KEY=your_clerk_api_key

### Database: **Supabase**
- Create a new project
- Enable storage buckets
- Configure tables for users, properties, bookings, reviews

### Payments: **Stripe**
- Enable Checkout & Webhooks
- Copy the `STRIPE_SECRET_KEY` to your `.env.local` file


## 💻 Run Locally

To run this project locally, follow these steps:

### Prerequisites

- Node.js
- npm (or Yarn)
- Supabase account
- Stripe account
- Clerk account

### Steps

1.  Clone the repository:

    ```bash
    git clone https://github.com/MusarrafAM/WanderNest
    cd wandernest
    ```

2.  Install dependencies:

    ```bash
    npm install
    ```

3.  **Set up environment variables:**

    Create a `.env.local` file in the root of your project and add the following variables:

    ```env
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    STRIPE_SECRET_KEY=your_stripe_secret_key
    CLERK_FRONTEND_API=your_clerk_frontend_api
    CLERK_API_KEY=your_clerk_api_key
    ```

4.  Run the development server:

    ```bash
    npm run dev
    ```

 Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.


# Screenshot
![Image](https://github.com/user-attachments/assets/d2365247-0f03-4f1c-9242-cd10bf72e8ed)

![Image](https://github.com/user-attachments/assets/a6900413-26e3-4ae5-8eeb-87fad752a166)

![Image](https://github.com/user-attachments/assets/9681989b-9162-4c52-81d2-f6ffff2f0c95)

![Image](https://github.com/user-attachments/assets/e6d2853a-e0b5-4fd7-a420-787e6b0a4a2c)

![Image](https://github.com/user-attachments/assets/288c51f9-f882-4ac0-8118-9eee52acc7bf)

![Image](https://github.com/user-attachments/assets/c600ff9b-13d3-437b-844a-c8e9ac9c3a87)

![Image](https://github.com/user-attachments/assets/3095425e-18d4-4b6d-859f-25aa62e4f034)

![Image](https://github.com/user-attachments/assets/5be8f998-59e8-42e3-bf2c-6094a73b4d01)

![Image](https://github.com/user-attachments/assets/bb02c5a3-92c3-4e0b-8a78-f66b10148e06)

