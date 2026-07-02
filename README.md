# 🧠 DSA-OS

> Transform your Obsidian vault into a complete operating system for mastering Data Structures & Algorithms.

DSA-OS is an open-source Obsidian plugin and vault that helps you study DSA with structured notes, progress tracking, revision scheduling, and an organized Striver A2Z workflow.

---

## ✨ Features

### 📊 Progress Tracking

- Overall completion percentage
- Topic-wise progress
- Live progress updates
- Visual sidebar dashboard

### ✅ Problem Management

- Mark problems as Solved / Not Started
- Revision metadata
- Confidence tracking
- One-click toggle button

### 📚 Structured Vault

- Complete Striver A2Z organization
- Topic folders
- Templates
- Pattern Library
- Mistake tracking

### ⚡ Obsidian Integration

- Native sidebar
- Ribbon commands
- Command Palette support
- Markdown-first workflow

---

# 📂 Project Structure

```text
DSA-OS/
│
├── plugin/
│   ├── src/
│   ├── manifest.json
│   └── styles.css
│
├── generator/
│   ├── importer/
│   ├── templates/
│   └── dataset/
│
├── vault/
│   ├── Dashboard/
│   ├── Striver A2Z/
│   ├── Pattern Library/
│   ├── Revision/
│   └── Templates/
│
└── datasets/
```

---

# 🚀 Current Features

- ✅ Overall Progress
- ✅ Topic Progress
- ✅ Solved Toggle
- ✅ Sidebar View
- ✅ Revision Metadata
- ✅ Striver Vault Support

---

# 🛣 Roadmap

## v0.1

- [x] Sidebar
- [x] Progress Tracking
- [x] Solved Workflow
- [x] Obsidian Integration

## v0.2

- [ ] Pattern Library
- [ ] Mistake Tracker
- [ ] Better Dashboard
- [ ] Search

## v0.3

- [ ] Analytics
- [ ] Heatmap
- [ ] Weekly Statistics
- [ ] Revision Queue

## v1.0

- [ ] Daily Planner
- [ ] AI Assistance
- [ ] Plugin Marketplace Release

---

# 🏗 Architecture

```
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

Solved state is managed through a dedicated toggle service while progress calculations remain read-only.

---

# 🛠 Development

Clone the repository

```bash
git clone https://github.com/Pranavgitty/DSA-OS.git
```

Install dependencies

```bash
cd plugin
npm install
```

Build

```bash
npm run build
```

Development mode

```bash
npm run dev
```

---

# 🤝 Contributing

Contributions are welcome.

If you'd like to contribute:

1. Fork the repository
2. Create a feature branch
3. Submit a Pull Request

---

# 📄 License

MIT License
