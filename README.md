# Shah Fahid — Personal Portfolio & Headless CMS

A modern, responsive full-stack developer portfolio built with **Next.js 14 (App Router)** and **Sanity CMS v3**, featuring dark/light themes, dynamic project filtering, headless CMS content delivery, secure server-side contact routing, and an embedded Sanity Studio.

- **Live Production:** [https://shahfahid.tech](https://shahfahid.tech) (and [https://shahfahid.vercel.app](https://shahfahid.vercel.app))
- **GitHub:** [https://github.com/ShahFahidbaloch](https://github.com/ShahFahidbaloch)
- **Blog:** [https://fahid-blogs.vercel.app](https://fahid-blogs.vercel.app)

---

## 🛠 Tech Stack

- **Framework:** Next.js 14 (App Router, React 18, TypeScript)
- **Styling:** Vanilla SCSS Modules + Tailwind CSS (`tailwindcss-animate`, `next-themes`)
- **Animation:** Framer Motion
- **Headless CMS:** Sanity.io Studio v3 & `@sanity/client`
- **Deployment:** Vercel

---

## 📁 Repository Structure

```
portfilioi/
├── front_end/            # Next.js 14 frontend web application
│   ├── app/              # App router pages, layouts, and API routes
│   │   ├── api/contact/  # Secure server-side contact route (validation & rate limiting)
│   │   ├── admin/        # Embedded Sanity Studio at /admin
│   │   ├── post/[slug]/  # Server-rendered dynamic blog posts (parameterized GROQ)
│   │   └── pages/        # Portfolio sections (Header, About, Work, Skills, Contact)
│   ├── components/       # Reusable UI components (Navbar, ModeToggle, etc.)
│   └── public/           # Static assets
└── backendsanity/        # Standalone Sanity Studio v3
    └── schemaTypes/      # Schemas (works, skills, experiences, testimonials, contact, etc.)
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17+ or higher
- npm or yarn

### 1. Clone the Repository

```bash
git clone https://github.com/ShahFahidbaloch/personal-portfolio-with-CMS.git
cd personal-portfolio-with-CMS
```

### 2. Frontend Setup

```bash
cd front_end
npm install
```

Create a `.env.local` file inside `front_end/`:

```env
# Public read-only Sanity configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=k21eb9nx
NEXT_PUBLIC_SANITY_DATASET=production

# Server-only Sanity write token (required for contact form persistence)
# Generate at sanity.io/manage -> Project -> API -> Tokens (Editor/Create role)
SANITY_API_WRITE_TOKEN=
```

Run the development server:

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Sanity Studio CMS Setup (Optional Standalone)

The CMS is embedded at `/admin` on the frontend, but you can also run the standalone studio:

```bash
cd ../backendsanity
npm install
npm run dev
```

Standalone studio runs on [http://localhost:3333](http://localhost:3333).

---

## 🔒 Security & Architecture Highlights

1. **Server-Side Contact API:** Client-side form submissions route through `/api/contact`, keeping write tokens strictly on the server to prevent unauthorized database access.
2. **Spam & Rate Limiting:** The contact endpoint enforces sliding-window IP rate limiting, input length caps, regex format verification, and bot honeypot detection.
3. **Safe Parameterized GROQ Queries:** Dynamic routes (such as blog posts) utilize parameterized GROQ queries (`*[_type == "post" && slug.current == $slug][0]`) rather than string interpolation, preventing query injection.
4. **Resilient Data Fallbacks:** Empty collections or missing assets render clean accessible fallbacks rather than broken image links or stray output.

---

## 📬 Contact & Connect

- **GitHub:** [https://github.com/ShahFahidbaloch](https://github.com/ShahFahidbaloch)
- **LinkedIn:** [Shah Fahid](https://www.linkedin.com/in/shah-fahid-a4543027b/)
- **Email:** [shahfahidbaloch@gmail.com](mailto:shahfahidbaloch@gmail.com)

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
