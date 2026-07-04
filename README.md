# Perkins Catering Co.

Farm-to-table catering website for Executive Chef Austin Perkins, serving Napa, Sonoma, and Marin counties.

## Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Database:** PostgreSQL with Drizzle ORM
- **Auth:** Jose (JWT) + bcryptjs
- **Email:** Resend API
- **Storage:** S3-compatible (Railway Bucket in prod, MinIO in dev)
- **Payments:** Stripe Checkout (coming soon — wired but not yet live)
- **Validation:** Zod

## Features

### Public Site
- **Homepage** with full-bleed hero image slider, services overview, chef bio, testimonials, FAQ, and SEO structured data
- **Menu** page with 55+ items across categories
- **Events** page describing wedding, corporate, and private dinner catering
- **Summer Meals** page with ecommerce checkout (Stripe coming soon), pickup instructions, and order form
- **Inquire** page with multi-step inquiry form, trust badges, and "what happens next" sidebar
- **Photo Gallery** with 8 images served from S3
- **Blog** with markdown-powered posts and auto-generated OG images
- **Cost** page with pricing tiers and FAQ
- **Resources** page with catering tips
- **Testimonials** page with client reviews
- **Chef Bio** page with career timeline
- **Contact** page with quick contact form

### Admin Dashboard
- **Analytics** — pageview tracking and unique path counts
- **Inquiries** — view and manage all inquiries and quote requests
- **Blog management** — create, edit, and delete blog posts
- **Notifications bell** — red blinking dot for new leads/orders with dropdown panel

### Email (Resend)
- Owner notifications for all inquiries, quotes, and orders
- Client confirmation auto-replies with branded HTML templates
- Gracefully skips when `RESEND_API_KEY` is not set (non-gating)

### Image Storage
- All visible images served from S3-compatible storage via `/api/images` proxy
- `imageUrl()` helper in `src/lib/s3.ts` automatically routes to S3 or falls back to `public/`
- OG images and JSON-LD structured data use static paths for social media crawlers
- Upload script: `node _upload_images.js --dir public/images`

## Getting Started

### Prerequisites
- Node.js 20+
- PostgreSQL (or use docker-compose)
- S3-compatible storage (optional for dev — falls back to public/)

### Installation

```bash
npm install
cp .env.example .env.local
# Fill in your environment variables
npm run db:push
npm run db:seed
npm run dev
```

### Docker (includes PostgreSQL + MinIO)

```bash
docker-compose up -d
npm run dev
```

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `AUTH_SECRET` | JWT signing secret | Yes |
| `NEXT_PUBLIC_SITE_URL` | Public site URL | Yes |
| `S3_ENDPOINT` | S3 API endpoint | No (falls back to public/) |
| `S3_BUCKET` | S3 bucket name | No |
| `S3_ACCESS_KEY_ID` | S3 access key | No |
| `S3_SECRET_ACCESS_KEY` | S3 secret key | No |
| `S3_REGION` | S3 region (default: auto) | No |
| `S3_URL_STYLE` | "path" for MinIO, "virtual-host" for Railway | No |
| `RESEND_API_KEY` | Resend API key for email | No (skips silently) |
| `RESEND_FROM_EMAIL` | Sender email address | No |
| `STRIPE_SECRET_KEY` | Stripe secret key for checkout | No (shows "coming soon") |
| `ADMIN_EMAIL` | Admin email for seed script | No |
| `ADMIN_PASSWORD` | Admin password for seed script | No |

## Deployment

The site is deployed on Railway. The production URL is:
`https://perkins-catering-production.up.railway.app`

### Deploy command
```bash
railway up --service perkins-catering --detach
```

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Homepage
│   ├── summer/            # Summer meals page
│   ├── inquire/           # Inquiry form page
│   ├── admin/             # Admin dashboard
│   ├── api/               # API routes
│   │   ├── inquiry/       # Inquiry submission
│   │   ├── quote/         # Quote request
│   │   ├── checkout/      # Stripe checkout
│   │   ├── notifications/ # Admin notifications
│   │   ├── images/        # S3 image proxy
│   │   └── analytics/     # Pageview tracking
│   └── ...
├── components/            # React components
│   ├── admin/             # Admin-specific components
│   └── ...
├── lib/                   # Shared utilities
│   ├── s3.ts              # S3 client + imageUrl helper
│   ├── email.ts           # Resend email service
│   ├── db.ts              # Database operations
│   ├── business.ts        # Business info + nav config
│   └── ...
└── db/                    # Drizzle schema + seed
```

## License

© Perkins Catering Co. All rights reserved.
