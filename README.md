# IBA Cocktails Browser

[![Netlify Status](https://api.netlify.com/api/v1/badges/4aecd7d0-e759-4866-8717-b4b09f8cbb16/deploy-status)](https://app.netlify.com/sites/elated-shockley-96a155/deploys)
[![Build Status](https://travis-ci.org/mikeyhogarth/cocktails.svg?branch=master)](https://travis-ci.org/mikeyhogarth/cocktails)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/561bedec36224121a246675b673b872f)](https://www.codacy.com/app/mikeyhogarth/cocktails?utm_source=github.com&utm_medium=referral&utm_content=mikeyhogarth/cocktails&utm_campaign=Badge_Grade)

This provides a user interface for browsing and filtering the [IBA cocktails list](https://en.wikipedia.org/wiki/List_of_IBA_official_cocktails). Features include;

- Browse all 77 IBA cocktails
- Maintain your bar to describe what you have at home.
- Filter by ingredient, category, glass, vegan or "makeable from your bar"
- Ability to "favourite" cocktails
- Integration with [TheCocktailDB](https://www.thecocktaildb.com/) for enrichment/cocktail images
- Persistence (local browser storage only)
- Configurable color schemes

This is a small pet-project and a _work in progress_.

# Inspiration / Tech stuff

I wanted a pet project to play with React/Redux at home, my wife's getting into cocktails and noticed that there isn't really a slick, simple and elegant cocktail browser out there. The aim is for this to become that browser!

# Credits

Cocktail list and ingredient data was originally seeded from https://github.com/teijo/iba-cocktails

Application is hosted over at netlify - _awesome_ service: https://elated-shockley-96a155.netlify.com

## Tech stuff / Local Usage

You'll need `nodejs`/`npm` installed. Clone the repo, then;

```
npm install
npm start
```

All the data is in two JSON files, so there's no server or database to worry about.

## Contributing

Take the labels "Help Wanted" or "Good first issue" as an open invitation to pick tickets up if you want to, but if they don't have those labels then please get in touch to discuss any change before contributing.

- Assign yourself to a ticket if you're working on it.
- We're not doing versioning yet so don't worry about bumping versions/changelogs.
- Don't check in `package-lock` unless `package.json` has changed.
