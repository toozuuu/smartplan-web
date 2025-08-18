# SmartPlan — Frontend (smartplan-web)

A responsive Angular single‑page application (SPA) for SmartPlan. It connects to the SmartPlan backend API to handle authentication, member/admin flows, and core features like diet plans, meals, cart/checkout, and reporting.

> **Repo:** `toozuuu/smartplan-web`

---

## ✨ Features

* **Member**: login/register, dashboard with daily goals, diet‑plan wizard, meal catalog, cart & checkout, order tracking, profile.
* **Admin**: meal management (CRUD), members directory, basic settings (e.g., currency), export/download reports.
* Global: responsive layout, guarded routes, HTTP interceptor for JWT, error/success toasts.

---

## 🧰 Tech Stack

* **Framework**: Angular (CLI)
* **Language**: TypeScript
* **UI**: Angular Material (optional) or custom components
* **State**: RxJS services (or NgRx if adopted)
* **HTTP**: `HttpClient` + interceptor (JWT)
* **Routing**: Angular Router (SPA with HTML5 history)
* **Build**: Angular CLI; prod artifacts in `dist/`
* **Container (optional)**: NGINX serving static build

---

## 📁 Project Structure (suggested)

```
smartplan-web/
├─ src/
│  ├─ app/
│  │  ├─ core/            # auth, interceptor, guards, models, services
│  │  ├─ shared/          # reusable UI components, pipes, directives
│  │  └─ features/
│  │     ├─ auth/
│  │     ├─ dashboard/
│  │     ├─ diet-plans/
│  │     ├─ meals/
│  │     ├─ cart/
│  │     ├─ orders/
│  │     └─ admin/
│  ├─ assets/             # images, i18n, (optional) runtime config
│  └─ environments/       # environment.ts, environment.prod.ts
├─ angular.json
├─ package.json
└─ README.md
```

---

## ⚙️ Configuration

Set the backend API base URL (and other flags) via Angular environments. In development, Angular serves from `http://localhost:4200` by default.

**`src/environments/environment.ts`**

```ts
export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:8080', // Spring Boot backend
  chatWsUrl: 'ws://localhost:8080/ws',  // if WebSocket chat is enabled
  currency: 'USD'
};
```

**`src/environments/environment.prod.ts`**

```ts
export const environment = {
  production: true,
  apiBaseUrl: 'https://api.yourdomain.com',
  chatWsUrl: 'wss://api.yourdomain.com/ws',
  currency: 'USD'
};
```

### Optional: Runtime configuration (no rebuilds per environment)

Put a file like `assets/config.json` and load it at app bootstrap.

**`src/assets/config.json`**

```json
{
  "apiBaseUrl": "https://api.yourdomain.com",
  "chatWsUrl": "wss://api.yourdomain.com/ws",
  "currency": "USD"
}
```

**`app.config.service.ts` (sketch)**

```ts
@Injectable({ providedIn: 'root' })
export class AppConfigService {
  private cfg: any = {};
  load(): Promise<void> {
    return fetch('assets/config.json')
      .then(r => r.ok ? r.json() : {})
      .then(c => { this.cfg = c; });
  }
  get apiBaseUrl() { return this.cfg.apiBaseUrl ?? environment.apiBaseUrl; }
}
```

Register the loader in `main.ts` using `APP_INITIALIZER`.

---

## 🔐 Authentication & Guards

* Store JWT in memory (recommended) or use an HttpOnly cookie (server‑side).
* Add an **HTTP interceptor** to attach `Authorization: Bearer <token>` and handle 401/403 globally.
* Protect private routes with an `AuthGuard`.

**`auth.interceptor.ts` (excerpt)**

```ts
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = this.auth.token;
    const headers = token ? req.headers.set('Authorization', `Bearer ${token}`) : req.headers;
    return next.handle(req.clone({ headers }));
  }
}
```

---

## ▶️ Local Development

**Prerequisites**

* Node.js LTS (≥ 18 recommended)
* npm (or pnpm/yarn)

**Install & run**

```bash
npm ci
npm start # or: ng serve
```

Open: [http://localhost:4200](http://localhost:4200)

**Useful scripts (example)**

```json
{
  "scripts": {
    "start": "ng serve",
    "build": "ng build --configuration production",
    "lint": "ng lint",
    "test": "ng test",
    "e2e": "cypress run"  // if Cypress is configured
  }
}
```

---

## 🌐 CORS & Backend

Ensure the backend allows the frontend origin in development and production, e.g., `http://localhost:4200` and your live domain. If using cookies, enable `withCredentials` on both sides.

---

## 🐳 Docker (optional, NGINX)

**Example multi‑stage Dockerfile** (if not already present):

```dockerfile
# 1) Build
FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# 2) Serve
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY dist/ /usr/share/nginx/html
# Optional runtime config pattern
# COPY docker/entrypoint.sh /entrypoint.sh
# ENTRYPOINT ["/entrypoint.sh"]
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**`nginx.conf` (SPA fallback + gzip)**

```nginx
server {
  listen 80;
  server_name _;
  root /usr/share/nginx/html;

  gzip on;
  gzip_types text/plain application/javascript text/css application/json image/svg+xml;

  location / {
    try_files $uri $uri/ /index.html;
  }

  # Proxy to backend if needed (usually not in SPA-only images)
  # location /api/ {
  #   proxy_pass http://backend:8080;
  # }
}
```

Run container:

```bash
docker build -t smartplan-web:latest .
docker run -p 8081:80 smartplan-web:latest
```

---

## 🧪 Testing & Quality

```bash
npm run lint
npm run test       # unit tests (Karma/Jasmine)
# npm run e2e     # E2E tests (Cypress/Playwright), if configured
```

* Add CI (GitHub Actions) for build/lint/test on PRs.

**`.github/workflows/ci.yml` (example)**

```yaml
name: FE CI
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 18 }
      - run: npm ci
      - run: npm run lint
      - run: npm test -- --watch=false --browsers=ChromeHeadless
      - run: npm run build -- --configuration production
```

---

## 🚀 Deployment Checklist

* [ ] Set `apiBaseUrl` to production endpoint (environment or runtime config)
* [ ] Enable HTTPS and a CDN in front of NGINX/static host
* [ ] Cache static assets aggressively; keep `index.html` no‑cache for instant rollouts
* [ ] Configure error pages to serve `index.html` for SPA routing
* [ ] Set up Sentry/Logging (optional) and analytics consent (if applicable)

---

## 🤝 Contributing

1. Create a feature branch from `main`
2. Commit using Conventional Commits (optional)
3. Open a PR with screenshots and test notes

---

## 📄 License

TBD (MIT/Apache‑2.0/Proprietary).
