# 📊 Customer Churn Dashboard (GPT-Powered)

A full-stack AI dashboard to analyze telecom customer churn — with interactive charts, login/logout, and ChatGPT integration.

---

## 🚀 Features

- 🔐 **Login system** (admin / admin@123)
- 📊 **Interactive dashboards** (gender, churn, risk, services)
- 🤖 **Ask ChatGPT** questions based on real chart data
- ☁️ **Deployed on Vercel (Frontend) & Render (Backend)**
- 🔁 **UptimeRobot** keeps backend alive

---

## 📁 Project Structure

```
churn-dashboard/
├── public/
├── src/
│   ├── App.js              # Main UI logic
│   ├── api.js              # Sends prompts + data to backend
│   ├── App.css             # Dashboard styles
│   └── components/
│       └── LoginPage.js    # Login form (admin access)
├── .gitignore              # Hides .env
├── package.json
└── .env (not tracked)      # Your OpenAI API key

server/
├── index.js                # Node.js API endpoint for ChatGPT
├── package.json
└── .env                    # OPENAI_API_KEY
```

---

## 🔐 Login Credentials

```txt
User ID: admin
Password: admin@123
```

---

## 🌐 Live Deployments

| Layer      | URL                                |
|------------|-------------------------------------|
| Frontend   | https://churn-dashboard-final.vercel.app |
| Backend    | https://churn-dashboard-final.onrender.com |
| Health Ping| UptimeRobot (every 5 mins)          |

---

## 💬 ChatGPT Integration

- Frontend formats chart data + prompt
- Sends via `POST /api/chat` to backend
- Backend uses `OPENAI_API_KEY` to call OpenAI API
- Response returned and displayed live in dashboard

---

## 🛠 Tech Stack

- **Frontend**: React, Recharts, Vercel
- **Backend**: Node.js, Express, Render, OpenAI
- **Infra**: GitHub, UptimeRobot
- **Security**: .env for secret management

---

## ✅ How to Run Locally

```bash
# 1. Clone frontend
git clone https://github.com/your-username/churn-dashboard-final.git
cd churn-dashboard-final

# 2. Install dependencies
npm install

# 3. Start frontend
npm start

# 4. (In a second terminal) Start backend
cd server
npm install
node index.js
```

---

## ✨ Credits

Built by [Snehansu] — powered by ChatGPT and open-source tools.

---

## 📜 License

MIT License — free to use, modify, and share.
