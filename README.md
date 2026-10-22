# MODU — Landing Page

Responsive landing page for MODU, a fictional brand of DIY wooden model kits.
Plain HTML, CSS and JavaScript — no frameworks or build step.

**Live:** https://darynaliakhova.github.io/landing-page-project/

## About the project

MODU sells laser-cut wooden kits that you build yourself and then keep as a decorative object.
The idea of the brand is "more than a puzzle": a slow, hands-on hobby that ends with something
you actually want to put on a shelf. The brand is fictional and was created for this project.

The landing page has one goal — to introduce the collection and get the visitor to send a
request or pre-order through the contact form.

**Target audience:** adults who enjoy calm hands-on hobbies, people looking for an unusual gift,
and anyone who likes interior details with a story.

### Products

| Kit                | Pieces | Feature                                         | Build time | Price  |
| ------------------ | ------ | ----------------------------------------------- | ---------- | ------ |
| Corner Coffee Shop | 294    | Tiny café with LED lighting                     | ~5 h       | €45.99 |
| Marble Night City  | 294    | Mechanical marble run, hand crank, no batteries | ~7 h       | €55.49 |
| Romantic Carousel  | 336    | Wind-up music box with moving horses            | ~4.5 h     | €31.57 |

### Design

The visual style is warm and calm, close to the product itself: wood, kraft paper and
evening light. The palette is built from dark brown, beige and cream with one rust accent
for small details and calls to action. Headings use Montserrat in heavy uppercase to give
the brand a confident, modern look next to the soft photography. Light and dark sections
alternate so the page has a clear rhythm when scrolling.

## Page structure

1. **Header** — logo, navigation (Home, About, Services, Contact), mobile hamburger menu
2. **Hero** — headline, short description, call to action and the four steps: unbox, build, display, keep
3. **Perks** — four short reasons to choose MODU
4. **About** — what the brand stands for and why people enjoy building
5. **Services** — three kit cards with price, details and an "Order now" button
6. **Assembly videos** — choose a kit and watch how it comes together
7. **Testimonials** — three customer reviews
8. **Contact** — contact details and a form for questions and pre-orders
9. **Footer** — navigation and social media links

## Features

- Responsive layout (breakpoints at 1100, 992, 768 and 600 px)
- On tablet and mobile the cards turn into a swipe row (CSS scroll snap) with arrow buttons
- Smooth scrolling, active nav link while scrolling
- Scroll-in animations (IntersectionObserver), respects `prefers-reduced-motion`
- Contact form with client-side validation, sent via [Formspree](https://formspree.io)
- "Order now" preselects the kit in the form
- Images in WebP with `srcset`, lazy loading

## Tech

- HTML5, semantic sections
- CSS3 — custom properties, Grid, Flexbox, media queries, keyframe animations
- Vanilla JavaScript (ES6+) — no libraries

```
landing-page-project/
├── index.html
├── css/style.css
├── js/main.js
├── img/        # WebP images, logo
└── video/      # assembly videos
```

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
- Product photos and videos: MODU brand materials
