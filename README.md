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

Create the appropriate environment files in the project root:

```text
.env
.env.development
.env.production
```

Environment variables exposed to the frontend must follow the Vite naming convention:

```text
VITE_VARIABLE_NAME=value
```

For example:

```env
VITE_API_BASE_URL=https://api.example.com
```

Only variables prefixed with `VITE_` are exposed to the client-side application.

### Environment-specific configuration

Vite automatically selects the appropriate environment file based on the command being executed.

#### Development

When running:

```bash
npm run dev
```

Vite runs in `development` mode and loads:

```text
.env
.env.development
```

If the same variable exists in both files, the value in `.env.development` takes precedence.

For example:

```env
# .env
VITE_API_BASE_URL=https://api.example.com
```

```env
# .env.development
VITE_API_BASE_URL=https://dev-api.example.com
```

Running:

```bash
npm run dev
```

will use:

```text
https://dev-api.example.com
```

#### Production

When running:

```bash
npm run build
```

Vite runs in `production` mode and loads:

```text
.env
.env.production
```

If the same variable exists in both files, the value in `.env.production` takes precedence.

For example:

```env
# .env
VITE_API_BASE_URL=https://api.example.com
```

```env
# .env.production
VITE_API_BASE_URL=https://prod-api.example.com
```

Running:

```bash
npm run build
```

will use:

```text
https://prod-api.example.com
```

### Environment file priority

For this project, the configuration can be thought of as:

```text
                    npm run dev
                         |
                         v
                  development mode
                         |
                  ┌──────┴──────┐
                  │             │
               .env       .env.development
                  │             │
                  └──────┬──────┘
                         |
                         v
              .env.development wins
              when variables overlap
```

And for production:

```text
                   npm run build
                         |
                         v
                   production mode
                         |
                  ┌──────┴──────┐
                  │             │
               .env        .env.production
                  │             │
                  └──────┬──────┘
                         |
                         v
               .env.production wins
               when variables overlap
```

Therefore, shared/default configuration can be placed in:

```text
.env
```

Development-specific configuration should be placed in:

```text
.env.development
```

Production-specific configuration should be placed in:

```text
.env.production
```

### Important

Do not place passwords, private keys, database credentials, or other secrets in `VITE_` environment variables.

Vite variables are embedded into the frontend bundle during the build process and are therefore accessible to users of the application.

For example, if:

```env
VITE_API_BASE_URL=https://api.example.com
```

is used during:

```bash
npm run build
```

the value becomes part of the generated frontend application.

### Docker and environment variables

Because Vite environment variables are resolved during the build process, the required environment configuration must be available when the Docker image is built.

For example:

```text
.env.production
       |
       v
npm run build
       |
       v
dist/
       |
       v
Docker image
```

Changing the `.env.production` values after the application has already been built will not automatically change the values inside the generated frontend bundle. A new build is required.

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