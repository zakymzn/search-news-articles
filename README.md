# 📰 New York Times Article Search App

This is a Single Page Application (SPA) built with **React + Vite**, that allows users to search and browse news articles from **The New York Times**.

Live demo: [https://your-app-url.netlify.app](https://your-app-url.netlify.app)

## ✨ Features

- 🔍 Search articles from The New York Times API
- 📄 View article headlines, publication dates, and authors
- 📱 Responsive layout using Tailwind CSS
- 📚 Pagination support
- 💬 Smooth user experience with loading indicators
- ☁️ API requests via Axios

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/zakymzn/search-news-articles.git
cd search-news-articles
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create `.env` file

This project uses a **New York Times Developer API Key**. Create a `.env` file at the root of the project based on the example.

```bash
cp .env.example .env
```

Then edit `.env` and replace with your own key.

```bash
VITE_API_KEY=your_api_key_here
```

You can get your API key by registering at https://developer.nytimes.com.

### 4. Start the App

```bash
npm run dev
```

## 🌐 Deployment

If you want to deploy this project (e.g. to Netlify or Vercel):

- Add the environment variable `VITE_API_KEY` in the platform's **Environment Variables** settings
- Then trigger a build or redeploy

> 🔐 Your .env is ignored in version control by default to protect sensitive information.

## 🧪 Testing

To run functional and API tests (if configured):

```bash
npm run test
```

## 👤 Author

**Ma'mur Zaky Nurrokhman**

- GitHub: [zakymzn](https://github.com/zakymzn)
- LinkedIn: [linkedin.com/in/zakymzn](https://linkedin.com/in/zakymzn)