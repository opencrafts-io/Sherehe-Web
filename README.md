# Sherehe Web Application

Sherehe is a web application built with React, TypeScript, Vite, and Tailwind CSS.

---

## Technology Stack

* React
* TypeScript
* Vite
* Tailwind CSS
* Zustand
* Axios
* React Router
* Material UI
* Font Awesome

---

## Prerequisites

Before running or building the application, ensure the following are installed:

* Node.js
* npm
* Git

You can verify the installed versions with:

```bash
node --version
npm --version
git --version
```

---

# 1. Clone the Repository

Clone the project:

```bash
git clone <repository-url>
```

Navigate into the project:

```bash
cd sherehe-web
```

---

# 2. Install Dependencies

Install the project dependencies using:

```bash
npm install
```

This installs the dependencies defined in `package.json` and generates the `node_modules` directory.

For CI/CD environments, the preferred command is:

```bash
npm ci
```

`npm ci` installs dependencies based on the existing `package-lock.json` and provides more predictable dependency installation in automated environments.

---

# 3. Environment Variables

The application uses Vite environment variables.

Create the appropriate environment file in the project root.

For example:

```bash
.env
```

Environment variables used by the application should follow the Vite naming convention:

```text
VITE_VARIABLE_NAME=value
```

For example:

```env
VITE_API_BASE_URL=https://api.example.com
```

Only variables prefixed with `VITE_` are exposed to the client-side application.

### Important

Do not place passwords, private keys, database credentials, or other secrets in `VITE_` environment variables.

Vite variables are embedded into the frontend bundle during the build process and are therefore accessible to users of the application.

---

# 4. Run the Application in Development

Start the Vite development server:

```bash
npm run dev
```

The application will normally be available at:

```text
http://localhost:1337
```

The development server supports hot module replacement, so changes to the source code are reflected automatically.

---

# 5. Build the Application

To create a production build:

```bash
npm run build
```

The build process performs the following:

1. Compiles the TypeScript/React application.
2. Processes the Vite configuration.
3. Bundles the frontend assets.
4. Optimizes the generated JavaScript and CSS.
5. Generates the production-ready static files.

The output is generated in:

```text
dist/
```

The resulting structure will be similar to:

```text
dist/
├── assets/
├── index.html
└── ...
```

The contents of `dist/` are the files that need to be served in production.

---

# 6. Preview the Production Build

After building the application, the production bundle can be tested locally using:

```bash
npm run preview
```

This is useful for verifying the production build before deployment.

Note that `npm run preview` is intended for local preview/testing and should not normally be used as the production web server.

---

# 7. React Router / SPA Configuration

Because the application is a React Single Page Application, routes such as:

```text
/events/123
/events/123/booking
/profile
/dashboard
```

are handled by React Router.

When using Nginx, direct navigation to these routes requires SPA fallback configuration.

Without the fallback configuration, refreshing:

```text
/events/123
```

may result in a `404` from Nginx.

A custom Nginx configuration should therefore use:

```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

Example `nginx.conf`:

```nginx
server {
    listen 80;

    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

The Dockerfile can then copy the configuration:

```dockerfile
COPY nginx.conf /etc/nginx/conf.d/default.conf
```

---