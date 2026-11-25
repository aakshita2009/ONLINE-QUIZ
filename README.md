# QuizVerse — Online Quiz Website

**QuizVerse** is a complete, multi-section static website for hosting and taking timed online quizzes. Built cleanly with semantic HTML5, modern CSS3, and vanilla JavaScript—ready to upload to any web host (GitHub Pages, Netlify, Vercel, or Apache/Nginx) with zero build steps.

## Included Files

```text
online-quiz-website/
├── index.html   # Full website layout (Navbar, Hero, Categories, Quiz Portal, Leaderboard, Footer)
├── style.css    # Responsive website styling, grid layouts, sticky navigation, and feedback states
├── script.js    # Interactive quiz engine, timer, answer review, and localStorage leaderboard
└── README.md    # Documentation, deployment guide, and question bank customization instructions
```

## Website Sections & Features

1. **Sticky Navigation & Hero Banner:** Full-width landing header with quick navigation links and a live sample question preview.
2. **Interactive Subject Cards:** One-click topic selection for *Web Development*, *Science & Biotech*, and *General Knowledge*.
3. **Embedded Quiz Portal:** Participant registration field, subject selector, configurable countdown timer (`15s`, `25s`, `40s`), live progress bar, instant answer explanations, and a detailed post-quiz review.
4. **Persistent Browser Leaderboard:** Automatically ranks and stores top scores in `localStorage`.

## How to Host or Run Locally

- **Local Preview:** Extract the ZIP archive and open `index.html` in any web browser.
- **Web Hosting:** Upload all four files (`index.html`, `style.css`, `script.js`, `README.md`) to the root directory of your static hosting provider.

## Adding Your Own Questions

Edit the `QUESTIONS_DATA` array at the top of `script.js`:

```javascript
{
  topic: "science",
  topicLabel: "Science & Biotech",
  question: "Your question text?",
  options: ["Choice A", "Choice B", "Choice C", "Choice D"],
  correctIndex: 0, // 0-based index of the right answer
  explanation: "Brief explanation displayed immediately after answering."
}
```
