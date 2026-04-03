# Webix Grid - Angular Demo

A demo application showcasing [Webix Grid](https://grid.webix.com/) integrated into an Angular project.

## Overview

The demo displays a climate system management dashboard built with Webix Grid and Angular 20. It demonstrates how to embed and configure Webix Grid inside an Angular component using injectable services.

Featured Grid capabilities:

- **Multi-column sorting** - click column headers to sort by multiple fields
- **Custom filters** - text and select filters in column headers; custom footer filters
- **Sparkline charts** - inline temperature history visualization per row
- **Row & column drag** - reorder rows and columns by dragging
- **Date formatting** - built-in Webix date formatter applied to date columns
- **Status badges** - custom HTML templates in the Status column
- **Column resizers** - drag column borders to resize; resizer icons in column headers
- **Responsive configuration** - grid adjusts to container resize; mobile-friendly split

## Tech Stack

- [Angular](https://angular.dev/) 20
- [Webix Grid GPL](https://grid.webix.com/) 11.3
- TypeScript 5.9

## How to run

1. Clone the repository:

```bash
git clone <repo-url>
cd grid-angular-demo
```

2. Install dependencies:

```bash
yarn install
```

3. Start the development server:

```bash
yarn start
```

4. Open `http://localhost:4200` in your browser.

## Project structure

```
src/
  app/
    components/grid/   # Grid component, column config, demo data
    shared/            # Angular services: grid instance, filters, resize, events
  types/               # Temporary Webix type declarations (pending v11.3 release)
```

## License

MIT License
