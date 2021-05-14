# AwesomeHub Angular App

[![Build Status](https://travis-ci.org/awesomehub/angular-app.svg?branch=master)](https://travis-ci.org/awesomehub/angular-app)

This repository contains the sources for AwesomeHub Angular application.

> Live production build can be found at [awesomehub.js.org](https://awesomehub.js.org)

## About
The app was originaly developed as a learning project to experiment with [Angular 2](https://v2.angular.io/), [NgRx](https://ngrx.io/) and [RxJS](https://www.learnrxjs.io/), but
I have recently managed to update the codebase to [Angular 12](https://v12.angular.io/).

The app UI is built on top of the good old [Material Design Lite](https://getmdl.io/) UI library, It's much lighter than [Angular Material](https://material.angular.io/)
but I originally used it because Angular Material was still in alpha when I built this app.
## Prerequisites

- Node >= 12.14.1
- PNPM >= 6.0

## Setup

```bash
# Clone the repo
$ git clone https://github.com/awesomehub/angular-app.git awesomehub-app
$ cd awesomehub-app

# Install dependencies
$ pnpm install

# Start dev server
$ pnpm start
```

## Main Commands

|Command|Description|
|---|---|
|`pnpm start`|Start dev server @ `localhost:4200`|
|`pnpm build`|Build production bundles to `./dist` directory|
|`pnpm build:debug`|Build unoptimized production bundles to `./dist` directory and watch for changes|
|`pnpm serve`|Start web server @ `localhost:5000` to serve build artifacts from `./dist` directory|
|`pnpm lint`|Lint TypeScript source with ESLint |
|`pnpm ng` or `ng`|Run Angular cli commands (eg. `ng generate module`)|
