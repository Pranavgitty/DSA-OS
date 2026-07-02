<div align="center">

# 🧠 DSA-OS

### The Competitive Programming Operating System for Obsidian

Build a structured, distraction-free DSA workflow inside your Obsidian vault.

<p>

![Status](https://img.shields.io/badge/status-alpha-orange)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![Obsidian](https://img.shields.io/badge/Obsidian-Plugin-7C3AED)
![License](https://img.shields.io/badge/license-MIT-green)

</p>

</div>

---

## 🚀 What is DSA-OS?

**DSA-OS** is an open-source Obsidian plugin and vault ecosystem designed to help students master **Data Structures & Algorithms**.

Instead of juggling spreadsheets, browser tabs, scattered notes, and revision schedules, DSA-OS turns your Obsidian vault into a complete learning operating system.

Everything lives in one place:

- 📚 Problems
- 📈 Progress
- 🧠 Revision
- 📝 Notes
- 🎯 Patterns
- ❌ Mistakes

---

# ✨ Features

## 📊 Progress Tracking

- Overall completion percentage
- Topic-wise progress
- Live sidebar dashboard
- Automatic progress updates

---

## ✅ Problem Management

- One-click Solved / Not Started toggle
- Revision metadata
- Confidence tracking
- Frontmatter-based workflow

---

## 📚 Structured Learning

- Complete Striver A2Z organization
- Topic folders
- Templates
- Pattern Library
- Mistake tracking

---

## ⚡ Native Obsidian Experience

- Sidebar View
- Ribbon Icon
- Command Palette
- Markdown-first workflow

---

# 📸 Screenshots

## Dashboard

<p align="center">
  <img src="assets/dashboard.png" width="900">
</p>

---

## Sidebar

<p align="center">
  <img src="assets/sidebar.png" width="300">
</p>

---

## Vault Structure

<p align="center">
  <img src="assets/vault.png" width="300">
</p>

---

# 🗂 Repository Structure

```text
DSA-OS
│
├── plugin/
│   ├── src/
│   ├── manifest.json
│   ├── styles.css
│   └── package.json
│
├── generator/
│   ├── importer/
│   ├── templates/
│   ├── dataset/
│   └── cli.py
│
├── vault/
│   ├── Dashboard/
│   ├── Daily Notes/
│   ├── Striver A2Z/
│   ├── Pattern Library/
│   ├── Revision/
│   ├── Mistakes/
│   └── Templates/
│
└── datasets/
```

---

# 🏗 Architecture

```text
Markdown Notes
        │
        ▼
 VaultService
        │
        ▼
 ProgressService
        │
        ▼
DSA Sidebar
```

### Core Components

- VaultService
- ProgressService
- ProblemToggleService
- RevisionService
- ProblemStatusService
- EventService

---

# 🚀 Installation

Clone the repository

```bash
git clone https://github.com/Pranavgitty/DSA-OS.git
```

Install dependencies

```bash
cd DSA-OS/plugin
npm install
```

Build

```bash
npm run build
```

Development

```bash
npm run dev
```

---

# 🛣 Roadmap

## ✅ v0.1.0-alpha

- [x] Sidebar Dashboard
- [x] Progress Tracking
- [x] Topic Progress
- [x] Solved Workflow
- [x] Obsidian Integration
- [x] Revision Metadata

---

## 🚧 v0.2.0

- [ ] Pattern Library
- [ ] Mistake Tracker
- [ ] Better Dashboard
- [ ] Search

---

## 🚧 v0.3.0

- [ ] Analytics Dashboard
- [ ] GitHub-style Heatmap
- [ ] Weekly Statistics
- [ ] Topic Mastery

---

## 🚧 v1.0.0

- [ ] Daily Planner
- [ ] Revision Queue
- [ ] AI Assistance
- [ ] Plugin Marketplace Release

---

# 🤝 Contributing

Contributions are welcome!

1. Fork the repository.
2. Create a feature branch.

```bash
git checkout -b feature/my-feature
```

3. Commit your changes.

```bash
git commit -m "feat: add awesome feature"
```

4. Push your branch.

```bash
git push origin feature/my-feature
```

5. Open a Pull Request.

---

# 📄 License

Licensed under the **MIT License**.

---

<div align="center">

Made with ❤️ using Obsidian, TypeScript and lots of DSA.

⭐ If you like the project, consider starring the repository!

</div>
