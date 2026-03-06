# ArtefactToDoList

A simple To-Do List application built with Next.js, TypeScript, and Material-UI.

## Technologies

This project utilizes the following technologies:

- **Next.js:** A React framework for production.
- **React:** A JavaScript library for building user interfaces.
- **TypeScript:** A superset of JavaScript that adds static typing.
- **Material-UI:** A popular UI framework for React.
- **tRPC:** For building end-to-end type-safe APIs.
- **Zustand:** A small, fast, and scalable state management solution for React.
- **React Hook Form:** For form management.
- **Zod:** For schema validation.
- **Tailwind CSS:** A utility-first CSS framework for rapidly designing UIs.

## Features

- **CRUD Operations:** Create, read, update, and delete tasks.
- **Task Listing:** View all tasks in a list.
- **Task Form:** Add and edit tasks using a form.
- **API Endpoints:** API endpoints for managing tasks.

## Project Structure

The project's file structure is as follows:

```
ArtefactToDoList/
├── public/
├── src/
│   ├── app/
│   │   ├── (routes)/
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── client/
│   │   │   └── trpc.ts
│   │   ├── components/
│   │   │   ├── forms/
│   │   │   │   ├── TaskForm.tsx
│   │   │   │   └── models/
│   │   │   │       └── Task.ts
│   │   │   ├── ui/
│   │   │   │   ├── TaskList.tsx
│   │   │   │   ├── TaskListHeader.tsx
│   │   │   │   └── components/
│   │   │   │       └── ToastTemplate.tsx
│   │   │   └── views/
│   │   │       └── AppView.tsx
│   │   ├── store/
│   │   │   ├── useTaskDialogStore.ts
│   │   │   └── useToastStore.ts
│   │   ├── utils/
│   │   │   ├── createMetadataTitle.ts
│   │   │   └── handleError.ts
│   │   ├── api/
│   │   │   └── trpc/
│   │   │       ├── TrpcProvider.tsx
│   │   │       └── [trpc]/
│   │   │           └── route.ts
│   │   ├── favicon.ico
│   │   └── globals.css
│   ├── server/
│   │   ├── caller.ts
│   │   ├── database/
│   │   │   └── database.ts
│   │   ├── router.ts
│   │   └── trpc.ts
│   └── utils/
│       └── schemas/
│           └── tasks.schema.ts
├── .gitignore
├── README.md
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
└── tsconfig.json
```

## Execution

To run the project locally, follow these steps:

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/MateusZucco/ArtefactToDoList.git
    ```

2.  **Install dependencies:**

    ```bash
    cd ArtefactToDoList
    npm install
    ```

3.  **Start the development server:**

    ```bash
    npm run dev
    ```

4.  **Open the application in your browser:**

    [http://localhost:3000](http://localhost:3000)
