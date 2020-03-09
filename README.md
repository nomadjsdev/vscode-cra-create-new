# CRA Create New

A **highly opinionated** helper tool for creating common items in React apps.

## Usage

Run `CRA Create New` from the Command Palette (`ctrl + shift + P`).

At the first prompt choose either `View` or `Component`, depending on which item you're creating.

At the second prompt enter a name for your new item - PascalCase is recommended.

## Features

Creates a new folder for the item in `src/{itemType}/{itemName}`.

Creates `index.js` to handle default export, and `{itemName}.js` for the component

## Requirements

Assumes a React app with a `/src/` folder, with Components held in `/src/Component/` and Views held in `/src/View/`

## Extension Settings

This extension contributes the following commands:

- `CRA Create New`: Create a new item inside `/src/Component/` or `/src/View/`

## Known Issues

None

## Release Notes

### 1.1.1

Update to itemFile template

---

#### Project icon made by Freepik from FlatIcon
