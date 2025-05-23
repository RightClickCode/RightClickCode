# Website

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

## Installation

```shell
 pnpm install
```

## Local Development

```shell
 pnpm start docs
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Build

```shell
 pnpm nx run docs:build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Deployment

Using SSH:

```shell
 USE_SSH=true pnpm nx run docs:deploy
```

Not using SSH:

```shell
 GIT_USER=<Your GitHub username> pnpm nx run docs:deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.
