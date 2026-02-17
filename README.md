# 🎙️ TriniBox

**TriniBox** is a modern, single-page web application designed to collect questions for the **TriniTalk Podcast**.

Users can anonymously (or publicly) submit questions, doubts, or curiosities regarding the Catholic faith. These questions are stored in a real-time database and later discussed and answered during the podcast episodes.

![Svelte](https://img.shields.io/badge/svelte-%23f1413d.svg?style=for-the-badge&logo=svelte&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Bootstrap](https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white)

## ✨ Features

-   **Simple Submission Interface:** A clean, user-friendly form to submit questions.
-   **Anonymous by Default:** If the user doesn't provide a name, it defaults to "Anonymous".
-   **Real-time Storage:** Questions are instantly saved to a **Supabase** (PostgreSQL) database.
-   **Public Feed:** A page to view all previously asked questions.
-   **Modern Tech:** Built with the latest **Svelte 5 (Runes)** syntax and **SvelteKit**.
-   **Responsive Design:** Styled with Bootstrap 5 with a custom "Orange" theme to match the podcast branding.

## 🛠️ Tech Stack

-   **Framework:** [SvelteKit](https://kit.svelte.dev/) (Svelte 5 RC)
-   **Language:** JavaScript / HTML / CSS
-   **Database:** [Supabase](https://supabase.com/)
-   **Styling:** [Bootstrap 5](https://getbootstrap.com/)
-   **Deployment:** Vercel / Render

## 🚀 Getting Started locally

Follow these steps to run the project on your local machine.

### 1. Clone the repository

```bash
git clone https://github.com/chamered/trinibox.git
cd trinibox
```

### 2. Install dependecies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory of the project. You need to connect your [Supabase](https://www.supabase.com) project credentials here.
```js
PUBLIC_SUPABASE_URL=your_supabase_project_url
PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Database Setup (Supabase)
Created a table named `domande` in your Supabase project with the following columns:
| Column Name  | Type         | Description                            |
| ------------ | ------------ | -------------------------------------- |
| `id`         | `int8`       | Primary Key                            |
| `created_at` | `timestampz` | Default: `now()`                       |
| `nome`       | `text`       | The user's name ("Anonimo" as default) |
| `domanda`    | `text`       | The question content                   |

### 5. Run the development server
```bash
npm run dev
```
Open your browser and navigate to: `http://localhost:5173`.

## 🤝 Contributing
Contributions are welcome! If you have suggestions for the website or want to improve the UI for the TriniTalk listeners, feel free to open an issue or submit a pull request.

## 📝 License
This project is open source and available under the MIT License.