# Simon Girma — Portfolio Website

A modern, responsive personal portfolio built with **HTML**, **CSS**, and **JavaScript**.  
Showcases my projects, experience timeline, and a contact form.

## Features
- Smooth scrolling navigation
- Sticky navbar with scroll effect
- Fade-in animations on scroll (IntersectionObserver)
- Project carousel with auto-scroll + navigation dots
- Experience timeline layout
- Contact form integrated with **Web3Forms**
- Responsive design for mobile/tablet/desktop
- “Back to top” button (optional)

## Tech Stack
- **HTML5**
- **CSS3**
- **JavaScript**

## Project Structure
```text
.
├── portfolio.html / index.html
├── styles.css
├── script.js
└── assets/ (optional)
    └── Simon_Girma_CV.pdf
```

## Getting Started (Local)
1. Clone the repo:
```bash
git clone https://github.com/<your-username>/<repo-name>.git
```

2. Open the folder:
```bash
cd <repo-name>
```

3. Run locally (simple options):
- Open the HTML file directly in your browser, or
- Use VS Code Live Server for auto-reload.

## Deployment (GitHub Pages)
1. Push your code to GitHub
2. Go to **Settings → Pages**
3. Select:
   - **Source:** `Deploy from a branch`
   - **Branch:** `main` (or `master`) and `/root`
4. Save and wait for the site to publish

## Customization
- Update your name and links in the navbar + hero section
- Replace project cards with your own GitHub repos
- Add your CV PDF (recommended):
  - Place it in `assets/`
  - Link it like: `href="assets/Simon_Girma_CV.pdf"`

## Contact Form
This site uses **Web3Forms** to submit contact messages.  
If you fork this repo, replace the `access_key` in `script.js` with your own Web3Forms key.

## License
This project is open-source under the **MIT License**. Feel free to use it as a base for your own portfolio.

---

**Built by Simon Girma**
