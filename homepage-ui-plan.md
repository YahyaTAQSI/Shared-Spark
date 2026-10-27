# Shared Spark: Homepage UI Plan

> **Status:** Draft v0.1, based on the hand-drawn wireframe. Will change after client feedback.
> **Scope:** Homepage UI only. No backend, no database, no admin dashboard yet.

---

## 1. Goal

Build the full first page (landing page) as a clean, responsive, front-end-only UI that matches the wireframe. All text, images and logos are placeholders until the client sends the real content. The contact form looks and validates correctly but does not send anything yet.

## 2. Scope

**In scope**
- All 9 homepage sections from the wireframe
- Responsive layout (mobile, tablet, desktop)
- Light animations (scroll reveals, floating badges, carousel)
- Client-side form validation (UI only)
- Content kept in one data file so it is easy to change

**Out of scope (later phases)**
- Saving form submissions, emails, spam protection
- Admin dashboard and login
- Other pages (Why Us, Services, Work as separate pages)
- CMS, analytics, multilingual support (to be confirmed)

## 3. Suggested Stack (UI phase)

| Layer | Choice |
|---|---|
| Framework | Next.js (App Router) + TypeScript |
| Styling | Tailwind CSS |
| Components | shadcn/ui (button, input, textarea, form, sheet for mobile menu) |
| Animation | Motion (Framer Motion) |
| Icons | lucide-react |
| Form (UI only) | React Hook Form + Zod |
| Fonts | `next/font` (font to be decided with brand) |

Next.js is kept so the same project grows into the backend and admin later without a rewrite.

## 4. Project Structure

```
src/
  app/
    layout.tsx
    page.tsx              # assembles all sections
    globals.css           # design tokens (colors, radius, fonts)
  components/
    layout/
      Navbar.tsx
      Footer.tsx
    sections/
      Hero.tsx
      ClientLogos.tsx
      Services.tsx
      Work.tsx
      Testimonials.tsx
      Process.tsx
      ContactForm.tsx
    ui/                   # shadcn components
  content/
    site.ts               # ALL text, links, services, testimonials, steps
  public/
    logos/  images/  videos/
```

**Key rule:** no text is hardcoded inside components. Everything comes from `content/site.ts`, so client changes are a one-file edit.

## 5. Design Tokens (placeholders)

Defined once in `globals.css` / Tailwind config so a rebrand is quick.

| Token | Value |
|---|---|
| Primary color | TBD (client) |
| Accent color | TBD (client) |
| Background / surface | TBD |
| Text colors | TBD |
| Border radius | Large and rounded (the sketch uses soft rounded cards and pill buttons) |
| Heading font | TBD |
| Body font | TBD |
| Logo | Triangle mark + "Shared Spark" wordmark (temporary SVG) |

## 6. Sections

### 6.1 Navbar
- Left: triangle logo + "Shared Spark"
- Links: **Home | Why Us | Services | Work** with active underline on Home
- Right: CTA button (label TBD, e.g. "Book a call")
- Sticky on scroll; hamburger menu with slide-in sheet on mobile
- Links scroll to anchors on the same page for now

### 6.2 Hero
- Large headline: **"Make your brand impossible to ignore."**
- Subtext: "We create the content, strategy and campaigns that turn attention into real business."
- Primary button: **"Book a free strategy call →"**
- Right side: phone mockup (placeholder image or video of a person with a product) with 3 floating stat badges:
  - **+20M** (top)
  - **10% more leads** (right)
  - **+15** (bottom left)
- Badges gently float (looping animation) and fade in on load
- Mobile: text first, phone mockup below

### 6.3 Client Logo Strip
- Row of 4 logos from the sketch (Kult The Salon, circular logo, CCS, triangle logo), placeholders for now
- Grayscale, full color on hover
- Mobile: horizontal scroll or slow marquee

### 6.4 Services (x4)
- Each service is a full-width block with a title ("Service 1: ...")
- Layout: overlapping image pair on one side, description and a **"Get in touch"** button on the other
- Alternates left/right for each of the 4 services
- Content: title, description, image, CTA label, all from `site.ts`
- Mobile: image stacked above text

### 6.5 Work
- Section title **"Work"**
- Carousel of **3 visible vertical video cards** (reel format, 9:16) with a play icon
- Right panel with short text and a **CTA** button
- Previous / next arrow buttons under the carousel
- Videos are placeholders (poster images) until real reels are provided
- Mobile: swipeable, one card at a time plus peek of the next

### 6.6 What Our Clients Say
- Two testimonial cards (Adam from CCS, Ahmed), each with a client logo, a rating/badge in the corner, quote text, and name underlined
- The two cards have different widths in the sketch, so use an asymmetric grid on desktop
- Mobile: stacked cards

### 6.7 Our Process
- Section title **"Our Process"**
- 3 step cards: Step 1, Step 2, Step 3 with a title and short description
- Optional connecting line or arrows between steps
- Mobile: vertical timeline

### 6.8 Contact Form
- Section title on the left (e.g. "Let's talk"), form on the right
- Fields (from sketch, to be confirmed):
  - Row 1: two short fields (e.g. First name, Last name)
  - Row 2: two short fields (e.g. Email, Phone)
  - Two full-width fields (e.g. Company, Service of interest)
  - Large message box
- Submit button
- UI states: default, error, loading, success message
- Validation with Zod (UI only); submit currently logs to console / shows a fake success

### 6.9 Footer
- Brand logo and short tagline
- Link columns (sitemap, services, social) and contact info, to be confirmed
- Copyright line

## 7. Responsive Behavior

| Breakpoint | Behavior |
|---|---|
| Mobile (< 640px) | Single column, hamburger menu, swipe carousel |
| Tablet (640 to 1024px) | 2 column where useful, simplified hero |
| Desktop (> 1024px) | Full layout as in the sketch |

## 8. Animation Guidelines

- Scroll-reveal (fade and slide up) on each section
- Floating loop on hero badges
- Hover lift on cards and buttons
- Carousel slide transitions
- Respect `prefers-reduced-motion`
- Keep it subtle; performance first

## 9. Build Order

1. Project setup (Next.js, Tailwind, shadcn/ui, fonts, tokens)
2. `content/site.ts` with placeholder content
3. Navbar and Footer
4. Hero
5. Client logo strip
6. Services (build one, then reuse for all 4)
7. Work carousel
8. Testimonials
9. Process
10. Contact form UI and validation
11. Responsive pass and animation polish
12. Accessibility and performance check (Lighthouse)

## 10. Assets and Content Needed from Client

- [ ] Logo files (SVG preferred) and brand colors / fonts
- [ ] Final headline, subtext and CTA wording
- [ ] Real stat numbers for the hero badges
- [ ] Client logos (4 or more) with permission to use
- [ ] The 4 services: titles, descriptions, images
- [ ] Work videos / reels (or links) and thumbnails
- [ ] Testimonials: quote, name, company, logo, rating
- [ ] 3 process steps: titles and text
- [ ] Final contact form fields
- [ ] Footer links, contact details, social links
- [ ] Languages needed (English only or multilingual)

## 11. Open Questions

1. Is the nav CTA the same as the hero button ("Book a free strategy call")?
2. What does the "BB" mark in the testimonial cards mean (rating, stars, badge)?
3. Should "Why Us", "Services" and "Work" be sections on the homepage or separate pages later?
4. Does the "Book a call" button open a scheduling tool (e.g. Calendly) or scroll to the form?
5. Light theme, dark theme, or both?

## 12. Definition of Done (UI phase)

- All 9 sections match the wireframe structure
- Works on mobile, tablet and desktop
- All content is editable from `content/site.ts`
- Form validates and shows all UI states
- No console errors; Lighthouse score above 90 for performance and accessibility
- Deployed as a preview link for client review

## 13. Change Log

| Version | Date | Notes |
|---|---|---|
| 0.1 | 2026-10-01 | Initial plan from wireframe |
