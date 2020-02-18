# Cocktails Browser

[![Netlify Status](https://api.netlify.com/api/v1/badges/4aecd7d0-e759-4866-8717-b4b09f8cbb16/deploy-status)](https://app.netlify.com/sites/iba-cocktails/deploys)
[![Build Status](https://travis-ci.org/mikeyhogarth/cocktails.svg?branch=master)](https://travis-ci.org/mikeyhogarth/cocktails)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/561bedec36224121a246675b673b872f)](https://www.codacy.com/app/mikeyhogarth/cocktails?utm_source=github.com&utm_medium=referral&utm_content=mikeyhogarth/cocktails&utm_campaign=Badge_Grade)
[![GitHub license](https://img.shields.io/github/license/mikeyhogarth/cocktails.svg)](https://github.com/mikeyhogarth/cocktails/blob/master/LICENSE)

![Screenshot](/public/Screenshot.png?raw=true)

Deployed at https://iba-cocktails.netlify.com/

This provides a user interface for browsing and filtering the [IBA cocktails list](https://en.wikipedia.org/wiki/List_of_IBA_official_cocktails) (and a couple of other popular drinks). Features include;

- Browse all 77 IBA cocktails, plus a few non-IBA drinks.
- Maintain your bar to describe what you have at home.
- Filter by ingredient, category, glass, vegan or "makeable from your bar"
- Ability to "favourite" cocktails
- Integration with [TheCocktailDB](https://www.thecocktaildb.com/) for enrichment/cocktail images
- Persistence (local browser storage only)
- Configurable color schemes
- See measurements in either parts, ml, cl or oz
- Pro-mode! Have measurements replaced with 'bartender lingo' such as 'Jigger' and 'Pony'
- Installable on smart devices (via PWA/Add To Home Screen)

This is a small pet-project and a _work in progress_. It is built entirely using functional components and react hooks.

## Credits

Cocktail list and ingredient data was originally seeded from https://github.com/teijo/iba-cocktails

Enrichment and images provided by the amazing [CocktailDB](https://www.thecocktaildb.com/)

Application is hosted over at [netlify](https://www.netlify.com/) - _awesome_ service

## Tech stuff / Local Usage

If you want to run this locally you'll need `nodejs`/`npm` installed. Clone the repo, then;

```
npm install
npm start
```

All the data is in JSON files (see `src/data`), so there's no server or database to worry about.

## Contributing

If you have a comment about one of the recipes / a data related issue, feel free to raise an issue and label it 'data'. It's just an unfortunate fact of life that cocktail recipes will vary and what some people think is good, others will not, but we're happy to correct blatant mistakes.

Take the labels "Help Wanted" or "Good first issue" as an open invitation to pick tickets up if you want to, but if they don't have those labels then please get in touch to discuss any change before contributing.

- Assign yourself to a ticket if you're working on it.
- If there's not already an open ticket, but you have a suggestion, please raise as an issue and discuss prior to doing any work.
- We're not doing versioning yet so don't worry about bumping versions/changelogs.
- We've got [Snapshot Testing](https://jestjs.io/docs/en/snapshot-testing) going on in this app, remember to update them if you change the views.
- Don't check in `package-lock` unless `package.json` has changed.
- This is a function-component-only project.
