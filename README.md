# MOBILITY — vehicle rental marketplace

A premium, responsive frontend prototype for discovering vehicles and managing a host-side demo garage. Built with Next.js App Router, React, TypeScript and Tailwind CSS v4.

## Run locally

- Node.js 20.9 or newer
- `npm install`
- `npm run dev` and open [http://localhost:3000](http://localhost:3000)
- `npm run typecheck` / `npm run lint` / `npm run build`

## Main routes

- `/` — landing page, location/date search, featured vehicles
- `/rent` — searchable, filterable and sortable collection
- `/rent/vehicle/[id]` — vehicle detail and illustrative booking confirmation
- `/rent/bookings` — sample and locally saved demo bookings
- `/list-your-vehicle` — host onboarding
- `/host/add-vehicle` — three-step listing wizard with preview
- `/host/listings` — manage locally saved listings
- `/host/dashboard` — illustrative host metrics and activity

## Demo boundaries

This is a frontend-only prototype. Seed inventory is static, host-created listings and renter-created demo bookings are saved in browser local storage, and no API, database, user authentication, live availability, real checkout, payment processing, identity verification, insurance validation, or payout service is connected. Seed inventory and demo host data are not a production marketplace. Images use remote Unsplash URLs. No browser test or build result is claimed in this initial commit.

## Design notes

Editorial dark-forest hero, restrained lime accents, image-led vehicle cards, Manrope + DM Mono typography, responsive mobile navigation, accessible form labels, and reduced-motion support. The project is branded MOBILITY to match the supplied reference URL identity rather than Lanewise.
