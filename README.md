AI Resume Builder ----------------------------------

Welcome to the "AI Resume Builder"! This application leverages the power of Google Gemini AI to help users craft professional resumes effortlessly. It features a React frontend and a Node.js/Express backend with a MySQL database.

Prerequisites ------------------------------------

Before you begin, ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [MySQL](https://www.mysql.com/) (Running locally or via a cloud provider)
- Git

Installation & Setup ------------------------------------

Follow these steps to set up the project locally.

1. Clone the Repository 

Clone the project to your local machine:

```bash

git clone https://github.com/smriti260402/Ai_Resume_Builder.git
cd AiResumeBuilder

```

----------------------------------------------------------------------------------------

2. Server Setup (Backend) 

The backend handles API requests, authentication, and AI generation.

    1.  Navigate to the server directory:
    
        ```bash

        cd server

        ```

    2.  Install dependencies:

        ```bash

        npm install

        ```

    3.  Configure Environment Variables:

    Create a file named `.env` in the `server` directory. Copy the content below and replace the placeholders with your actual credentials:

    ```env

    PORT=5000
    GEMINI_API_KEY=your_google_gemini_api_key
    DATABASE_URL="mysql://root:yourpassword@localhost:3306/airesumebuilder"
    JWT_SECRET="your_super_secret_jwt_key"
    
    ```
       PORT: Port for the server (default 5000).
       GEMINI_API_KEY: Your API key from Google AI Studio.
       DATABASE_URL: Connection string for your MySQL database.
       JWT_SECRET: Secret key for signing JSON Web Tokens.

    4.  Database Setup:

        Sync the Prisma schema with your database (this will create the necessary tables):

        ```bash

        npx prisma db push

        ```

    5.  Run the Server:
           Development Mode (auto-restart on changes):

            ```bash

            npm run dev

            ```
           Production Start:

            ```bash

            npm start

            ```
        The server should now be running on `http://localhost:5000`.

----------------------------------------------------------------------------------------

 3. Client Setup (Frontend)

The frontend provides the user interface for building resumes.

    1.  Navigate to the client directory:

        Open a new terminal window/tab and run:

        ```bash

        cd client

        ```
        (If you are in the server folder, use `cd ../client`)

    2.  Install dependencies:

        ```bash

        npm install

        ```

    3.  Run the Client:

        Start the development server:

        ```bash

        npm run dev

        ```
        The terminal will show the local URL (typically `http://localhost:5173`). Open this link in your browser to use the app.

Tech Stack

-   Frontend: React, Vite
-   Backend: Node.js, Express.js
-   Database: MySQL, Prisma ORM
-   AI: Google Gemini (`@google/generative-ai`)
-   Authentication: JWT (JSON Web Tokens)
