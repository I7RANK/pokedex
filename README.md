# Pokédex App

A lightweight Pokédex built with Nuxt 3 and Tailwind CSS that allows users to browse, search, and favorite Pokémon in an intuitive and responsive interface.

## 🚀 Features

- Browse Pokémon with infinite scroll
- Real-time search functionality
- Mark your favorite Pokémon
- Responsive design
- Loading animations and skeleton UI

## 📄 Project Setup

```bash
npm install
npm run dev
```

## 🧠 Technical Decisions & Technologies Used

This project was built using **Nuxt 3** with the Composition API and TypeScript to ensure a modern and maintainable codebase.

### 🛠️ Core Technologies

- **Nuxt 3 + TypeScript**: Provides structure and strong typing for scalable Vue applications.
- **Tailwind CSS**: Enables fast and consistent styling without custom CSS files.
- **PokeAPI**: Serves as the single source of data for all Pokémon.

### 📦 Thinking About Scalability

Even though this is a small project, I approached it as if it needed to handle large datasets:

- I implemented **lazy loading** and **infinite scroll** to keep the app performant and avoid loading all Pokémon upfront.
- UI components are split and reusable, with props and controlled state.
- Loading states and error handling are present to keep the experience smooth even under network issues.
- The structure is modular, making it easy to integrate **Pinia** or another state management solution in the future.

### 🧠 Technical Decisions

- I chose to make a single fetch request to the PokeAPI to retrieve all Pokémon at once. This allowed me to:
  - Implement a fast, client-side search that doesn’t require additional API calls.
  - Use a performant infinite scroll since data is stored in memory.
- While this might not scale well in real-world apps with massive datasets, it improves UX and keeps logic simpler for this use case.

- I also configured **Prettier**, including a plugin to auto-sort Tailwind CSS classes. This ensures a clean, consistent code style that’s easier to read and maintain for other developers.

### 🧩 Areas for Improvement

- Store favorite Pokémon in **localStorage**
- Include tests for core logic and components
