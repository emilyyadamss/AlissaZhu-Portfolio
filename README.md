# Xiaotong (Alissa) Zhu — Fashion Portfolio

An interactive, single-page portfolio website built from Alissa's print portfolio.

## What's inside
- **Hero** with parallax fabric backdrop and animated scroll cue
- **Three project sections** — Technical Drawing & Illustration, *Invisible Space*, *Night Witches* — each with a written intro pulled from the portfolio
- **Scroll-reveal animations**, sticky navigation, scroll-progress bar, active-section highlighting
- **Lightbox gallery** — click any spread to view full-size, with arrow keys / on-screen arrows / swipe navigation
- Fully **responsive** with a mobile menu, and respects `prefers-reduced-motion`

## Structure
```
index.html          markup & content
css/styles.css      editorial styling + animations
js/main.js          gallery data, scroll effects, lightbox
assets/pages/       29 portfolio spreads (page-01 … page-29.jpg)
assets/source-portfolio.pdf   original PDF (linked from Contact)
```

## Run it
Open `index.html` directly, or serve locally:
```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Updating images
Page images are extracted from the PDF with poppler:
```bash
pdftoppm -jpeg -jpegopt quality=82 -scale-to-x 2200 -scale-to-y -1 \
  assets/source-portfolio.pdf assets/pages/page
```
Edit titles/captions for each spread in the `GALLERIES` object in `js/main.js`.
