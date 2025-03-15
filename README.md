# WanderNest

Deployed Link = https://wander-nest-production.vercel.app

WanderNest is a property rental platform built with Next.js and TypeScript. It allows users to search, favorite, review, and book properties. Users can also post their properties with all the relevant details, including accommodation and amenities.

## Features

- **Search for Properties**: Users can search for properties with debouncing and filter by categories.
- **Dark/Light Theme**: Switch between light and dark modes for better accessibility.
- **Favorites**: Users can mark properties as favorites and view them in the "Favorites" page.
- **Reviews**: Leave reviews for properties with a 5-star rating and a message.
- **Property Sharing**: Share properties via WhatsApp, Twitter, or email.
- **Reservation**: Reserve a property by selecting a specific date or date range and making a payment using Stripe.
- **Property Posting**: Post new properties with relevant details like accommodation, amenities, and photos.
  
## Tech Stack

- **Frontend**: Next.js, TypeScript, Tailwind CSS, ShadCN (for components)
- **Authentication**: Clerk
- **Database**: Supabase PostgreSQL with Prisma
- **Image Storage**: Supabase Bucket
- **State Management**: Zustand
- **Validation**: Zod
- **Payment**: Stripe

## Installation

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

