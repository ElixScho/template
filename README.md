# Next.js + Supabase Authentication Template

A modern authentication template built with Next.js 14, Supabase, and shadcn/ui. Features server-side rendering, cookie-based authentication, and a dark/light theme switcher.

## Features

-   🔐 Complete authentication flow (Sign Up, Sign In, Password Reset)
-   🎨 Styled with Tailwind CSS and shadcn/ui
-   🌓 Dark/Light mode support
-   🔒 Server-side rendering with cookie-based auth
-   📱 Fully responsive design
-   ⚡ Supabase Backend

## Getting Started

1. Create a Supabase project:

    - Go to [https://supabase.com](https://supabase.com)
    - Click "New Project"
    - Set up your database

2. Create a new Next.js project using this template:

    ```bash
    npx create-next-app my-app -e https://github.com/[your-username]/[your-repo-name]
    cd my-app
    ```

3. Set up your environment variables:

    - Copy `.env.example` to `.env.local`
    - Update with your Supabase credentials from Project Settings > API:

    ```bash
    NEXT_PUBLIC_SUPABASE_URL=[YOUR_SUPABASE_PROJECT_URL]
    NEXT_PUBLIC_SUPABASE_ANON_KEY=[YOUR_SUPABASE_ANON_KEY]
    ```

4. Install dependencies and run the development server:
    ```bash
    npm install
    npm run dev
    ```

Your app should now be running on [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── app/                # Next.js app directory
│   ├── (auth-pages)/   # Authentication pages
│   ├── protected/      # Protected routes
│   └── layout.tsx      # Root layout
├── components/         # React components
├── lib/               # Utility functions
└── utils/             # Helper functions
```

## Authentication Routes

-   `/sign-up` - User registration
-   `/sign-in` - User login
-   `/forgot-password` - Password reset request
-   `/protected` - Example protected route
-   `/protected/reset-password` - Password reset page

## Customization

### Theme

The template uses shadcn/ui components with a default style. To customize:

1. Delete `components.json` and run:

    ```bash
    npx shadcn-ui@latest init
    ```

2. Choose your preferred style options during initialization

### Environment Variables

Required environment variables:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new).

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/[your-username]/[your-repo-name])

## Learn More

To learn more about the technologies used in this template, take a look at the following resources:

-   [Next.js Documentation](https://nextjs.org/docs)
-   [Supabase Documentation](https://supabase.com/docs)
-   [shadcn/ui Documentation](https://ui.shadcn.com)
-   [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## License

MIT License
