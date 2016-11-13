# AwesomeHub Angular App

[![Build Status](https://travis-ci.org/awesomehub/angular-app.svg?branch=master)](https://travis-ci.org/awesomehub/angular-app)

This repository contains the sources for AwesomeHub Angular 2 application.

> Live production build can be found at [https://awesomehub.github.io](https://awesomehub.github.io)

## Prerequisites

- Node >= 5.0
- NPM >= 3.8.0 or Yarn (recommended)

## Setup

```bash
# Clone the repo
$ git clone https://github.com/awesomehub/angular-app.git awesomehub-app
$ cd awesomehub-app

# Install dependencies
$ yarn install

# Start dev server
$ yarn start
```

## Building

Create an .env file *(see .env.sample)* and then run:
```bash
$ yarn run build
```

## Main Commands

|Command|Description|
|---|---|
|yarn start|Start webpack dashboard and dev server @ **localhost:8080**|
|yarn run build|Build production bundles to **./dist** directory|
|yarn run serve|Start lite server @ **localhost:8000** to serve built artifacts from **./dist** directory|
|yarn run lint|Lint typescript source|
|yarn test|Run tests|
