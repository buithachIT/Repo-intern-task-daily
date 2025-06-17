# Real Estate Blog Platform

A modern real estate platform built with Next.js 14, featuring property listings and a blog system with review functionality.

## 🔑 Key Features

### Blog System

- Create, read, update, and delete blog posts
- Review system with star ratings
- User authentication
- Real-time updates with optimistic UI
- Responsive design with skeleton loading

### Property Listings

- Property cards with images and details
- Pagination and filtering
- Featured room rentals section
- Amenity tags and property information

## 🛠️ Tech Stack

### Frontend

- [Next.js 14](https://nextjs.org/) - React framework with App Router
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [SWR](https://swr.vercel.app/) - Data fetching and caching
- [React Toast](https://fkhadra.github.io/react-toastify/) - Notifications

### Backend

- [Prisma](https://www.prisma.io/) - ORM
- [MongoDB](https://www.mongodb.com/) - Database
- [JWT](https://jwt.io/) - Authentication

## 📦 Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/real-estate-blog.git
cd real-estate-blog
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
```

Fill in the required environment variables in `.env.local`:

```env
DATABASE_URL="your_mongodb_connection_string"
JWT_SECRET="your_jwt_secret"
```

4. Run database migrations:

```bash
npx prisma generate
npx prisma db push
```

5. Start the development server:

```bash
npm run dev
# or
yarn dev
```

## 🏗️ Project Structure

# Development

npm run dev

# QA

env-cmd -f .env.qa npm run dev

# Production build

env-cmd -f .env.production npm run build

First build:
![alt text](image.png)
