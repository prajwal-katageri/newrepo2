# Backend deployment (Spring Boot)

This backend is meant to be deployed separately from the Vercel frontend (Vercel is for frontend/static + serverless Node, not a long-running Java server).

## Environment variables

- `SPRING_DATA_MONGODB_URI` – your MongoDB connection string
  - Example (MongoDB Atlas): `mongodb+srv://USER:PASSWORD@cluster.mongodb.net/hospital_db`
- `PORT` – the port the platform assigns (Render/Railway commonly set this automatically)
- `APP_JWT_SECRET` – **required for stable login sessions** across restarts (min 32 chars)
  - Example: `a-very-long-random-string-at-least-32-chars`
- `CORS_ALLOWED_ORIGINS` – comma-separated allowed origins/patterns
  - Example: `https://newrepo2.vercel.app,https://*.vercel.app,http://localhost:3000`

## Docker deploy (recommended)

This folder contains a `Dockerfile`.

On Render/Railway:
- Choose “Deploy from GitHub”
- Select the repository
- Set the **Root Directory** to `hospital-opd/backend`
- Choose Docker build
- Add the env vars above

## After backend deploy

Copy the backend public URL and set it in Vercel as:

- `REACT_APP_API_BASE_URL` = `https://<your-backend-domain>`

Then redeploy the frontend.