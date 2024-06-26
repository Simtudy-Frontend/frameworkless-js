# ayoung todo-app
```
yarn
yarn dev
```

## etc

### tauri 연습

#### prerequisites

- https://tauri.app/v1/guides/getting-started/prerequisites/

#### setup

- https://tauri.app/v1/guides/getting-started/setup/

- execution example
```shell
>> yarn create tauri-app
yarn create v1.22.22
[1/4] Resolving packages...
[2/4] Fetching packages...
[3/4] Linking dependencies...
[4/4] Building fresh packages...

success Installed "create-tauri-app@4.0.0" with binaries:
      - create-tauri-app
✔ Project name · ah0-todo-app
✔ Choose which language to use for your frontend · TypeScript / JavaScript - (pnpm, yarn, npm, bun)
✔ Choose your package manager · yarn
✔ Choose your UI template · Vanilla
✔ Choose your UI flavor · JavaScript

Template created! To get started run:
  cd ah0-todo-app
  yarn
  yarn tauri dev

Done in 21.04s.
```

#### package.json
```
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "tauri": "tauri"
  },
  "devDependencies": {
    "@tauri-apps/cli": "^1",
    ...
```

#### vite.config.js
```
export default defineConfig({
    build: {
        outDir: 'dist',
        server: {
            port: 5173,
        },
```

#### src-tauri/tauri.conf.json
```
"build": {
    "beforeBuildCommand": "yarn build",
    "beforeDevCommand": "yarn dev",
    "distDir": "../dist",
    "devPath": "http://localhost:5173",
    "withGlobalTauri": true
  },
...
```