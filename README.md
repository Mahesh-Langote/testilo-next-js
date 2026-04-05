# Testilo Web

Testilo is a Next.js web app for creating, publishing, and grading online assessments with optional proctoring checks.

This repository includes:

- Admin workflow to create and manage tests
- Student test-taking flow
- Authentication with JWT + HTTP-only cookies
- MongoDB persistence with Mongoose models
- Result tracking and review pages

## Tech Stack

- Next.js 16 (App Router)
- React 19
- MongoDB + Mongoose
- JWT auth (`jsonwebtoken`)
- Password hashing (`bcryptjs`)
- Icons (`lucide-react`)

## Prerequisites

- Node.js 20+
- npm 10+
- MongoDB instance (local or cloud)

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Create `.env.local` in the project root:

```env
MONGODB_URI=mongodb://localhost:27017/testmoz-clone
JWT_SECRET=replace_with_a_long_random_secret
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

3. Start the development server:

```bash
npm run dev
```

4. Open:

```text
http://localhost:3000
```

## Scripts

- `npm run dev`: Start development server
- `npm run build`: Create production build
- `npm run start`: Start production server
- `npm run lint`: Run ESLint checks

## Main Routes

- `/`: Marketing / landing page
- `/register`: Create admin account
- `/login`: Sign in
- `/admin/dashboard`: Admin home, test list
- `/admin/[testId]/questions`: Question builder
- `/admin/[testId]/settings`: Test behavior and access settings
- `/admin/[testId]/publish`: Publish/unpublish and sharing link
- `/admin/[testId]/results`: Submission results
- `/t/[testId]`: Student test-taking page
- `/t/[testId]/review/[submissionId]`: Student review page

## Data Model Overview

- `User`: Admin identity and hashed password
- `Test`: Metadata, settings, and question set
- `Submission`: Student answers, scores, timing, and proctoring violation count

## Authentication and Access

- A JWT token is issued on login/registration and stored in an HTTP-only cookie (`testilo_token`).
- Middleware protects `/admin/*` routes from anonymous access.
- Server-side ownership checks ensure only a test owner can manage a test.

## Deployment Notes

- Set all environment variables in your deployment environment.
- Ensure `NEXT_PUBLIC_BASE_URL` points to your deployed domain.
- Run `npm run build` before `npm run start`.

## Project Structure (Top Level)

```text
src/
	app/
		admin/
		login/
		register/
		t/
	lib/
		auth.js
		db.js
	models/
		Submission.js
		Test.js
		User.js
```
