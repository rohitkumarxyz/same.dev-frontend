# Same.dev Frontend

This is the frontend codebase for the **Same.dev** project, built using **React**, **TypeScript**, and **Vite**. It includes features like a file tree, code editor, and integrations with backend APIs.

## Tech Stack

- **React**: For building the user interface.
- **TypeScript**: For type-safe development.
- **Vite**: For fast development and build tooling.
- **Jotai**: For state management.
- **React-Resizable-Panels**: For creating resizable UI panels.
- **React-Toastify**: For notifications.
- **CodeMirror**: For the code editor.

## Features

- **File Tree**: Displays project files and folders, with sorting like an IDE.
- **Code Editor**: Edit files with syntax highlighting and support for binary files.
- **Preview Mode**: Toggle between code view and preview mode.
- **API Integration**: Fetch and save project data using backend APIs.

## Getting Started

### Prerequisites

Make sure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** or **yarn**

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/same.dev.git
   cd same.dev/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the root directory and add the following:
   ```env
   VITE_PUBLIC_BACKEND_URL=http://your-backend-url
   ```

### Running the Project

Start the development server:
```bash
npm run dev
# or
yarn dev
```

The app will be available at `http://localhost:5173`.

### Building for Production

To build the project for production:
```bash
npm run build
# or
yarn build
```


## Folder Structure

```
frontend/
├── src/
│   ├── component/       # Reusable components (e.g., Filetree, CodeEditor)
│   ├── pages/           # Page components (e.g., ChatPage, LoginPage)
│   ├── service/         # API calls and integrations
│   ├── store/           # State management (e.g., Jotai atoms)
│   ├── data/            # Static data (e.g., file icons, folder structure)
│   ├── utils/           # Utility functions
│   ├── App.tsx          # Main app component
│   └── main.tsx         # Entry point
├── public/              # Static assets
├── .env                 # Environment variables
├── package.json         # Project dependencies and scripts
└── README.md            # Project documentation
```

