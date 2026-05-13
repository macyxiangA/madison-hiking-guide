# Madison Hiking Guide

A public React/Vite website for exploring hiking trails around Madison, Wisconsin.

Visitors can browse trails, filter by difficulty and distance, view trail details, save liked trails, and manage a simple local display name. The app does not require UW Badger ID login and does not use CS571 APIs.

## Features

- Browse Madison-area hiking trails
- Filter trails by difficulty and max distance
- View trail photos, descriptions, locations, distances, and feature tags
- See parking notes and restroom notes for each trail
- Open official trail maps and Google directions
- Save liked trails in the browser
- Set or reset a local display name

## Tech Stack

- React
- Vite
- React Router
- React Bootstrap
- Bootstrap

## Local Storage

This app does not use a backend or database. User data is stored in each visitor's browser with `localStorage`.

Stored shape:

```js
{
  username: "Anonymous",
  likedTrails: []
}
```

This means liked trails persist after refresh, but they are browser-specific and can be removed if the user clears site data.

## Run Locally

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:5173/p42/
```

## Build

```bash
npm run build
```

The production build outputs to `docs/`, which can be used for GitHub Pages.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE).

Commercial use is allowed under the MIT License, but users must keep the copyright and license notice.

## Credits

Created by Macy Xiang, Ben Vanorny, and Ryan Li.
