# SAO BY THE SEA - Premium Luxury Beachfront Landing Page

We will create a premium, high-end, conversion-focused landing page for **SAO BY THE SEA**, Mumbai’s ultimate beachfront dining, resort, and event destination on Gorai Beach. The website will be designed to feel like an immersive, elegant, coastal editorial piece, matching the styles of elite hospitality brands such as *Aman Resorts, Soho House, Nobu Hospitality, and Six Senses*.

We will completely rewrite `index.html`, `styles.css`, and `script.js` to replace the existing digital marketing agency code with an elite, highly polished boutique resort web page.

---

## User Review Required

Please review the proposed architectural and aesthetic choices:
1. **Logo Assets**: We will copy the brand logo assets (`media__1779813636280.png` and `media__1779813645363.png`) from the conversation brain directory to the workspace `logos/` directory as `sao_logo_circle.png` and `sao_logo_capsule.png` to preserve perfect brand consistency.
2. **Hero Video**: To capture the premium feel, we will use a high-definition, looping beachfront resort video streamed from a stable, high-performance public stock video URL, with a rich pre-rendered CSS gradient and soft-image fallback to ensure instantaneous loading.
3. **High-Performance Animations**: Rather than introducing heavy external libraries (like GSAP or ScrollMagic) that can slow down mobile loading times, we will implement lightweight scroll-triggered reveals using the native **Intersection Observer API** combined with modern CSS transitions. This provides the exact fluid, staggered fade-ups and parallax zooms of GSAP while maintaining a 100/100 performance score.
4. **Google Maps & Form Integration**: We will build a premium booking widget with responsive fields and embed a highly stylized custom-themed Google Map showing Gorai Beach, Mumbai.

---

## Open Questions

> [!NOTE]
> Please let us know if you have specific preferences on these details:
> - **Video Theme**: Do you prefer a vibrant sunset beach club vibe (golden hues, warm string lights) or a modern minimalist calm resort vibe (daylight azure blues, white sands)? *We will blend both by having a sunset-themed warm luxury aesthetic.*
> - **Booking Form**: Would you like the booking form to trigger an elegant custom confirmation modal or redirect to a specific booking system page? *We will default to an elegant, interactive glassmorphism confirmation modal built directly into the page.*

---

## Proposed Changes

### Assets & Logos Component

#### [NEW] [sao_logo_circle.png](file:///c:/Users/HextiK/Downloads/Krafly/Krafly_website_new/logos/sao_logo_circle.png)
- Copy the circular SAO bar & resort logo (`media__1779813636280.png`) from the brain assets.

#### [NEW] [sao_logo_capsule.png](file:///c:/Users/HextiK/Downloads/Krafly/Krafly_website_new/logos/sao_logo_capsule.png)
- Copy the horizontal/capsule SAO logo (`media__1779813645363.png`) from the brain assets.

---

### Core Structure

#### [MODIFY] [index.html](file:///c:/Users/HextiK/Downloads/Krafly/Krafly_website_new/index.html)
We will completely restructure the HTML file using semantic HTML5 elements. The layout will follow these exact sections:
1. **Utility & Premium Navigation Bar**: Transparent overlay with the capsule/circle logo, modern editorial links, and a highlighted, sleek "Book Table" CTA.
2. **Hero Section (Full Viewport)**: High-resolution cinematic loop video, dark gradient overlay, giant luxury serif typography ("SAO BY THE SEA"), scroll indicators, and CTA buttons ("Book a Table", "Explore Resort").
3. **Story Section (Split Screen Layout)**: Editorial split-screen: left side with large text ("Where the sea meets celebration") and an elegant button; right side showing an editorial coastal lifestyle photo with wave overlay and parallax scrolling.
4. **Experience Section (Grid of 4 Luxury Cards)**: Interactive glassmorphic icons and full-bleed image backgrounds for:
   - **DINE**: Fresh seafood, craft cocktails, sunset dining.
   - **STAY**: Luxury rooms, pool access, beach views.
   - **CELEBRATE**: Corporate events, weddings, private parties.
   - **PLAY**: RC Racing, Pickleball, beach activities.
5. **Signature Cuisine Section (Two-Column Editorial)**: Large seafood and craft cocktail imagery with reveal animations. Oversized headline "Crafted by the sea" and a "View Menu" button.
6. **Sunset Experience Section (Full-Width Immersive)**: Intimate golden-hour graphic with floating animations and a large CTA: "Book Your Evening".
7. **Resort Section (Modern Boutique Stays)**: Split-screen premium hotel presentation showing sea view room layouts, key amenities (Sea View, Swimming Pool, Beach Access, Breakfast, Free WiFi) using bespoke custom SVGs, and a CTA "Explore Rooms".
8. **Corporate Events Section (Dark Luxury)**: A rich navy backdrop with elegant string lights and beachfront gathering imagery. Headline: "Elevate Your Next Offsite".
9. **Activities Section (Modern Sports-Lifestyle Layout)**: Modern cards for RC Racing, Pickleball, and beach games with unique premium hover actions.
10. **Instagram Gallery (Masonry Layout)**: Captivating social moments (food, pool, sunsets, guest experiences) in a premium masonry grid.
11. **Testimonials Section (Luxury Carousel)**: Interactive glassmorphism review slider displaying glowing guest experiences and Google Reviews details (4.6/5 rating, 1200+ reviews).
12. **Booking Section (Premium Experience Form)**: A custom scheduling form (Name, Phone, Email, Guests, Date, Time, Message) side-by-side with a premium dark-styled interactive Map of Gorai Beach.
13. **Footer (Minimalist Elite Navy)**: Minimalist branding, navigation columns, location parameters, operating hours, and social vectors.

---

### Core Styling & Typography

#### [MODIFY] [styles.css](file:///c:/Users/HextiK/Downloads/Krafly/Krafly_website_new/styles.css)
We will rewrite `styles.css` from scratch to build a state-of-the-art luxury design system:
- **Brand Colors**:
  - Primary: `#4AB8D9` (Ocean Blue)
  - Secondary: `#073B52` (Deep Navy)
  - Accent: `#E9C46A` (Sunset Gold)
  - Background: `#FAFAF8` (Soft White)
  - Neutral: `#F3E6D0` (Sand Beige)
- **Typography Setup**: Import Google Fonts `Cormorant Garamond` (classic serif for high-end headings) and `Plus Jakarta Sans` or `DM Sans` (clean, highly-legible geometric sans-serif for body copy).
- **Layout Philosophy**: Modern grid systems, elegant flexbox distributions, generous white space, smooth custom shadows, layered overlaps, and subtle sunset gradients.
- **Glassmorphism**: Elegant translucent backdrops (`backdrop-filter: blur(12px)`) for headers, card icons, testimonials, and booking inputs to create a sophisticated boutique resort aesthetic.
- **Animations & Hover Effects**: Smooth hardware-accelerated transforms, micro-interactions, scale reveals, staggered letter spacing transitions on titles, and floating keyframes.

---

### Interactive Enhancements & Scroll Reveals

#### [MODIFY] [script.js](file:///c:/Users/HextiK/Downloads/Krafly/Krafly_website_new/script.js)
We will completely replace the JavaScript file to manage premium UI logic:
- **Scroll-Triggered Reveals**: A highly-optimized Intersection Observer script that adds active reveal classes to components as they enter the viewport, creating fluid fade-ups, image zooms, and parallax movement.
- **Header Dynamics**: Navbar changes styling (background blur and soft shadow) upon scrolling down, keeping navigation readable.
- **Interactive Review Carousel**: Smooth transitions, dragging/swiping support, and indicators for the Google Review cards.
- **Fullscreen Mobile Overlay Menu**: A luxury hamburger action that opens a stunning fullscreen menu with staggered fade-in animations for links.
- **Dynamic Booking Confirmation**: Fully validated client-side reservation handling that triggers an immersive glassmorphism success card.

---

## Verification Plan

### Automated Tests
- Validate HTML markup against HTML5 standards.
- Run desktop and mobile performance reviews using Lighthouse/DevTools (aiming for >95% score).
- Test form validation rules (correct phone formats, future date selection, proper emails) to ensure perfect lead capture.

### Manual Verification
- Test responsively on common screen widths: Desktop (1920px, 1440px), Tablet (1024px, 768px), and Mobile (430px, 375px) to ensure perfect layouts.
- Interact with all links, scroll indicators, carousels, and forms to confirm fluid transitions and premium user flows.
- Review image rendering and layout spacing relative to the uploaded concept images to ensure brand compliance and a high-end editorial atmosphere.
