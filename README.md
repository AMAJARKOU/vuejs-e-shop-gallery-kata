# Frontend E-shop Gallery Kata

## Tech Stack
- Vue 3
- Vite
- TypeScript
- Pinia (state management)
- Vue Router (routing)
- Vitest (unit testing)

## Setup

```bash
npm install
npm run dev
```

## Features

- Product listing fetched from FakeStore API
- Responsive product grid layout
- Standard shopping cart
  - Add / remove items
  - Increase / decrease quantity
- Cart state management using Pinia
- Navigation between Product List and Cart page using Vue Router
- Automatic 10% discount applied when cart total reaches 1000 €


## Quality & Testing

- Unit tests for Cart business logic (Pinia store)
- Unit tests for Discount rule and calculation
