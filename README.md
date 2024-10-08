# AwesomeHub App

[![][ci-img]][ci-url] [![][netlify-img]][netlify-url] [![][website-img]][website-url] [![][angular-img]][angular-url]

This repository contains the sources for AwesomeHub Angular application.

> Live production build can be found at [awesomehub.js.org][website-url]

## About
The App was originally built for educational purposes and to experiment with [Angular 2](https://v2.angular.io/), [NgRx](https://ngrx.io/) and [RxJS](https://www.learnrxjs.io/), but
I have recently managed to update the codebase to [Angular 12](https://v12.angular.io/), then to [Angular 18](https://angular.dev/).

The App UI is built on top of the good old [Material Design Lite](https://getmdl.io/) library, It's much lighter than [Angular Material](https://material.angular.io/)
but I originally used it because Angular Material was still in alpha at the time I built this app.

## Setup

### Prerequisites

- Node >= 18.19
- NPM >= 10.2.3

```bash
# Clone the repo
$ git clone https://github.com/awesomehub/app.git awesomehub-app
$ cd awesomehub-app

# Install dependencies
$ npm install

# Start dev server
$ npm start
```

## Main Commands

| Command               | Description                                                                          |
|-----------------------|--------------------------------------------------------------------------------------|
| `npm start`           | Start dev server @ `localhost:4200`                                                  |
| `npm run build`       | Build production bundles to `./dist` directory                                       |
| `npm run build:debug` | Build unoptimized production bundles for debugging purposes to `./dist` directory    |
| `npm run serve`       | Start web server @ `localhost:5000` to serve build artifacts from `./dist` directory |
| `npm run typechek`    | Check TypeScript source code                                                         |
| `npm run lint`        | Lint source code with ESLint                                                         |
| `npm run format`      | Format source code with Prettier                                                     |
| `npm run ng` or `ng`  | Run Angular CLI commands (eg. `ng generate module`)                                  |


[ci-url]: https://github.com/awesomehub/app/actions/workflows/main.yml
[ci-img]: https://img.shields.io/github/actions/workflow/status/awesomehub/app/main.yml?branch=master
[netlify-url]: https://app.netlify.com/sites/awesomehub/deploys
[netlify-img]: https://img.shields.io/netlify/968920d6-f8ff-4967-93d7-9e55861c1174?logo=netlify&logoColor=white
[angular-url]: https://github.com/angular/angular/releases/tag/18.0.0
[angular-img]: https://img.shields.io/badge/angular-v18-dd0131.svg?logo=angular
[website-url]: https://awesomehub.js.org
[website-img]: https://img.shields.io/website?logo=statuspal&url=https%3A%2F%2Fawesomehub.js.org
