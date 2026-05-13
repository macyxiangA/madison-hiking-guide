# Madison Hiking Guide

Madison Hiking Guide is a React/Vite trail planning app for exploring parks,
paths, conservancies, and easy outdoor trips around Madison, Wisconsin.

The app is built as a small product experience: a landing page introduces the
guide, Explore lists official trail cards, Saved keeps a visitor's saved trail
shortlist, and My Trails gives each visitor a private planning notebook.

## App Structure

- `Home` (`/`): product-style landing page with the mission, feature summary,
  privacy note, and calls to explore or create a trail note.
- `Explore` (`/trails`): official Madison-area trail cards with filters for
  difficulty and distance.
- `Trail details` (`/trail/:id`): photos, distance, difficulty, features,
  parking notes, restroom notes, official maps, and directions.
- `Saved` (`/likedtrails`): trails the visitor saved for later. The route name
  is kept for compatibility, but the UI presents it as Saved Trails.
- `Saved trail details` (`/likedtrail/:id`): detail view for a saved official
  trail.
- `My Trails` (`/my-trails`): custom trail notebook for private trail ideas,
  places to research, and future hiking plans.
- `Account` (`/account`): local display name management and reset controls.

## Features

- Browse curated Madison-area trail cards.
- Filter official trails by difficulty and max distance.
- View trail photos, descriptions, locations, distances, feature tags, parking
  notes, restroom notes, official maps, and directions.
- Save official trails to a browser-local shortlist.
- Create, edit, and delete custom trail notes in My Trails.
- Add structured custom trail details:
  - Trail name
  - Country, state/province, and city
  - Difficulty
  - Distance with `mi` or `km`
  - Planned visit date
  - Trail type or planning goal
  - Optional image URL
  - Planning notes
- Set or reset a local username.

## Local Data And Privacy

This app does not use a backend, database, external API, or shared account
system. User-created data is stored in each visitor's own browser with
`localStorage`.

Stored local data includes:

- Username
- Saved official trail IDs
- Custom trails created in My Trails
- Custom trail planning notes
- Optional image URLs attached to custom trails

Custom trails, saved trails, username, and image URLs are not shared across
users, browsers, or devices. Clearing browser site data can remove this local
information.

The custom trail image feature supports image URLs only. The app does not upload
image files, copy remote images, or store image binary data.

## Tech Stack

- React
- Vite
- React Router
- React Bootstrap
- Bootstrap
- Browser `localStorage`

## Local Development

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

## Deployment Notes

- Vite `base` should remain `/`.
- Production builds output to `docs/`.
- For Vercel, set the output directory to `docs`.
- Do not manually edit generated files under `docs/assets`; they are recreated
  by `npm run build`.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE).
