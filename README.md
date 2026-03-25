# 🏥 MediCare – AI Health Companion

MediCare is an AI-powered healthcare web application designed to help users **instantly understand their prescriptions and medical reports**.

Instead of confusing medical jargon, MediCare provides **clear, simple, and actionable insights** — making healthcare more accessible for everyone.

---

## 🚀 Core Idea

Most users struggle with one problem:

> ❓ *“What does my prescription actually say?”*

MediCare solves this with:

👉 📸 Scan Prescription → 🤖 AI Analysis → 📊 Simple Explanation

---

## ✨ Features

### 📸 Smart Prescription Scanner

* Upload or capture prescription images
* Guided camera interface
* OCR-based text extraction

---

### 🤖 AI-Powered Analysis

* Converts medical terms into simple language
* Extracts:

  * Diagnosis
  * Medications
  * Side effects
  * Follow-up steps

---

### 📊 Clean Report Dashboard

* Structured output:

  * Summary
  * Diagnosis
  * Medication table
  * Checklist
* Language toggle (English / Hindi)

---

### 📁 Digital Health Locker

* Stores all reports in one place
* Timeline-based view
* Easy access to past records

---

### 👨‍👩‍👦 Family Profiles

* Manage multiple users:

  * Self
  * Parents
* Separate health data per profile

---

### 🔄 Report Comparison

* Compare past vs current reports
* Detect:

  * Improvements
  * Changes in medication

---

### 💊 Medicine Tracker

* Daily checklist
* Adherence tracking
* Never miss a dose

---

### 📊 Health Insights

* Visual trends
* AI-based health patterns

---

### 👨‍⚕️ Doctor Connect (UI)

* AI-generated case summary
* Suggested questions
* Chat / video consultation (mock)

---

### 🚨 Emergency Mode

* Voice-based input
* Instant actionable steps
* Emergency call integration (India: 108)

---

### 💬 AI Assistant

* Context-aware chatbot
* Quick medical queries
* Voice support

---

### 📡 Offline Support

* Cached reports
* Works in low internet scenarios

---

## 🧠 Tech Stack

### Frontend

* Next.js (App Router)
* Tailwind CSS
* Framer Motion

### Backend

* Next.js API Routes
* Firebase (Hosting / Functions)

### AI & OCR

* LLM APIs (Grok / OpenAI / Gemini)
* Tesseract.js / Google Vision API

### Database

* Firebase / Supabase

---

## 📂 Project Structure

```
src/
 ├── app/            # Main app (Next.js)
 ├── components/     # UI components
 ├── ai/             # AI logic & processing
 ├── lib/            # Utilities
 ├── hooks/          # Custom hooks

public/              # Static assets
firebase.json        # Firebase config
```

---

## ⚙️ Installation

```bash
git clone https://github.com/JasaniKush/Medicaree.git
cd Medicaree
npm install
npm run dev
```

---

## 🔐 Environment Variables

Create `.env.local`:

```
GROK_API_KEY=your_api_key
OCR_API_KEY=your_ocr_key
```

---

## 🚀 Deployment

### Firebase

```bash
npm run build
firebase deploy
```

---

## 🎯 Product Flow

```
User → Scan Prescription → OCR → AI Analysis → Result → Save / Track / Compare
```

---

## 🧠 Design Philosophy

* ❌ No dashboard-first approach
* ✅ Action-first experience
* ✅ Minimal, clean UI
* ✅ Built for real-world users under stress

---

## ⚠️ Safety & Compliance

* No medical advice beyond given prescription
* No dosage modification
* AI only explains, not prescribes
* Emergency mode always suggests calling 108

---

## 🌍 Vision

MediCare aims to become:

> **India’s AI Health Companion**

Helping millions of users:

* Understand healthcare
* Track their health
* Take better decisions

---

## 👨‍💻 Author

**Jasani Kush**

---

## ⭐ Support

If you like this project:

👉 Star the repo
👉 Share with others

---

## 📌 Future Scope

* Real doctor integration
* Insurance cost prediction
* Regional language expansion
* AI health risk prediction

---

> Built with ❤️ for smarter healthcare in India
