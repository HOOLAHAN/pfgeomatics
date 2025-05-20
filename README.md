# PF Geomatics

## Project Overview

PF Geomatics is a modern, responsive React-based website designed to showcase engineering and construction projects primarily in the London area. The site features detailed project information, interactive carousels, and engaging UI components, allowing clients and stakeholders to explore our services, past work, and company values.

### Features

- **Home**: Hero section with autoplaying video and overview of the business.
- **About**: Introduction to the company's experience, values, and expertise.
- **Projects**: Dynamic carousel of featured projects with modal views for detailed information.
- **Services**: Showcases the full range of services offered with an engaging card layout and modal breakdowns.
- **Clients**: Displays the company’s client base with logos and additional details.
- **Contact**: Contact form, embedded map, and additional ways to reach out.
- **Brochure**: Easy PDF download of our company brochure.
- **Privacy Policy**: Linked from the footer for compliance.

## Technologies Used

- **React** with **TypeScript**
- **Chakra UI**: Accessible and composable component library
- **React Responsive Carousel**: Touch-friendly image and content sliders
- **Framer Motion**: Smooth animations
- **AWS S3 + CloudFront**: Fast, reliable static hosting and media delivery

---

## 📁 Project Structure

```
src/
├── App.tsx
├── index.tsx
├── tsconfig.json
├── css/
├── data/
├── media/
├── themes/
├── utils/
│   └── checkImageExists.ts
├── components/
│   ├── Home.tsx
│   ├── ChakraCarousel/
│   │   ├── types/carousel.d.ts
│   │   ├── Carousel.tsx
│   │   ├── CarouselCard.tsx
│   │   └── index.tsx
│   ├── layout/
│   │   ├── CoverVideo.tsx
│   │   ├── Footer.tsx
│   │   └── Navbar.tsx
│   ├── legal/
│   │   └── PrivacyPolicy.tsx
│   ├── sections/
│   │   ├── About/
│   │   │   ├── About.tsx
│   │   │   └── AboutModal.tsx
│   │   ├── Brochure/
│   │   │   └── BrochureDownload.tsx
│   │   ├── Clients/
│   │   │   ├── Clients.tsx
│   │   │   └── ClientModal.tsx
│   │   ├── Contact/
│   │   │   └── ContactForm.tsx
│   │   ├── Map/
│   │   │   └── MapComponent.tsx
│   │   ├── Projects/
│   │   │   ├── Projects.tsx
│   │   │   └── ProjectModal.tsx
│   │   ├── Services/
│   │   │   ├── Services.tsx
│   │   │   └── ServiceModal.tsx
│   │   └── shared/
│   │       └── AnimatedSection.tsx
```

---

## 🚀 Deployment

- Built and deployed on **AWS S3** with **CloudFront** CDN for optimal performance
- Media assets (images, videos) also hosted in the same S3 bucket
- Designed for high performance on both desktop and mobile with responsive layouts

---

## 📄 License

This project is proprietary and built exclusively for PF Geomatics.