# MODU — Landing Page

Responsive landing page for MODU, a fictional brand of DIY wooden model kits.
Plain HTML, CSS and JavaScript — no frameworks or build step.

**Live:**

## Sections

- Header with navigation and mobile menu
- Hero with call to action
- About
- Services — three kit cards
- Assembly videos with kit switcher
- Testimonials
- Contact form
- Footer with social links

## Features

- Responsive layout (breakpoints at 1100, 992, 768 and 600 px)
- On tablet and mobile the cards turn into a swipe row (CSS scroll snap) with arrow buttons
- Smooth scrolling, active nav link while scrolling
- Scroll-in animations (IntersectionObserver), respects `prefers-reduced-motion`
- Contact form with client-side validation, sent via [Formspree](https://formspree.io)
- "Order now" preselects the kit in the form
- Images in WebP with `srcset`, lazy loading

## Run locally

Open `index.html` in a browser, or use any static server, e.g.:

```
npx serve .
```

## Contact form

Submissions go to Formspree. To use your own form, replace the form id in the `action` attribute in `index.html`.

## Credits

- Icons: [Lucide](https://lucide.dev), brand icons: [Simple Icons](https://simpleicons.org)
- Font: Montserrat (Google Fonts)
