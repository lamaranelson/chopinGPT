# ChopinGPT

## T3 App

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

ChopinGPT is a ready to deploy web application that brings the legendary composer Fryderyk Franciszek Chopin back to life using the power of OpenAI's GPT-4 model and ElevenLabs' text-to-speech technology. Engage in conversations with "Chopin" and experience his insights as if he were here today.

## Tech Stack

- Next.js 15
- TypeScript
- Tailwind CSS for styling
- Prisma as ORM with a MySQL db to store changes in the system prompt. (If you are not deploying the app you can also use SQLite with Prisma)
- OpenAI API for the LLM
- ElevenLabs API for text-to-speech

## Installation

### Clone the Repository

```bash
git clone https://github.com/your_username/chopingpt.git
cd chopingpt
```

### Install Dependencies

```bash
yarn install
```

### Set Up Environment Variables

Create a `.env` file in the root directory and add the following:

```env
OPENAI_API_KEY=your_openai_api_key
ELEVEN_LABS_API_KEY=your_elevenlabs_api_key
DATABASE_URL=mysql://user:password@localhost:3306/chopingpt
```

### Set Up the Database

1. Ensure your MySQL server is running
2. Run Prisma migrations:

```bash
npx prisma migrate dev --name init
```

3. Generate the Prisma Client:

```bash
npx prisma generate
```

### Run the Development Server

```bash
yarn dev
```

The application should now be running at http://localhost:3000.

<img width="1488" alt="Screenshot 2025-01-05 at 2 33 55 PM" src="https://github.com/user-attachments/assets/9f4c9b5d-af11-401b-83cc-5523c1736cac" />
