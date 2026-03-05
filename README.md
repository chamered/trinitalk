# 🎙️ TriniTalk Podcast - Official Website

Welcome to the official web platform for the **TriniTalk Podcast**. 

This repository hosts the source code for the podcast's website, an evolving hub designed to connect listeners with the hosts and provide resources, discussions, and insights regarding the Catholic faith.

Currently, the core feature of the site is the **TriniBox**, a dedicated space where listeners can submit questions, doubts, or curiosities that will be discussed and answered in upcoming podcast episodes.

![Svelte](https://img.shields.io/badge/svelte-%23f1413d.svg?style=for-the-badge&logo=svelte&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Bootstrap](https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white)

## ✨ Current Features (TriniBox)

- **Simple Submission Interface:** A clean, user-friendly form to submit questions for the podcast.
- **Anonymous by Default:** If the user doesn't provide a name, it defaults to "Utente Anonimo" to protect privacy.
- **Real-time Storage:** Questions are instantly saved to a **Supabase** (PostgreSQL) database.
- **Public Feed:** A dedicated page to view all previously asked questions from the community.
- **Modern Tech:** Built with the latest **Svelte 5 (Runes)** syntax and **SvelteKit**.
- **Responsive Design:** Styled with Bootstrap 5 featuring a custom "Orange" theme to match the podcast's branding.

## 🗺️ Roadmap (Coming Soon)

As the official website for the podcast, the platform will be expanded with the following features:
- [ ] 👤 **Accounts:** Users will be able to create accounts to save their questions and vote other questions.
- [ ] 🎧 **Episodes Archive:** A dedicated section to listen to past episodes directly on the site.
- [ ] 📝 **Show Notes & Resources:** Detailed notes, links, and Catholic resources mentioned during the episodes.
- [ ] 👥 **Hosts Info:** A page dedicated to the creators behind TriniTalk.
- [ ] 📱 **Enhanced UI/UX:** Continuous improvements to the design and accessibility.

## 🛠️ Tech Stack

- **Framework:** [SvelteKit](https://kit.svelte.dev/) (Svelte 5)
- **Language:** JavaScript / HTML / CSS
- **Database:** [Supabase](https://supabase.com/)
- **Styling:** [Bootstrap 5](https://getbootstrap.com/)
- **Deployment:** [Vercel](https://vercel.com/)

## 🚀 Getting Started locally

Follow these steps to run the project on your local machine.

### 1. Clone the repository

```bash
git clone https://github.com/chamered/trinitalk.git
cd trinitalk
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory of the project. You need to connect your [Supabase](https://www.supabase.com) project credentials here.
```env
PUBLIC_SUPABASE_URL=your_supabase_project_url
PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Database Setup (Supabase)
Create a table named `questions` in your Supabase project with the following columns:

| Column Name  | Type         | Description                              |
| ------------ | ------------ | ---------------------------------------- |
| `id`         | `int8`       | Primary Key (Identity)                   |
| `created_at` | `timestamptz`| Default: `now()`                         |
| `name`       | `text`       | The user's name ("Utente Anonimo" as default)   |
| `question`    | `text`       | The question content                     |

### 5. Run the development server
```bash
npm run dev
```
Open your browser and navigate to: `http://localhost:5173`.

## 🤝 Contributing
Contributions are welcome! If you have suggestions for the website or want to help us build the upcoming features for the TriniTalk listeners, feel free to open an issue or submit a pull request.

## 📝 License
This project is open source and available under the [MIT License](LICENSE).
