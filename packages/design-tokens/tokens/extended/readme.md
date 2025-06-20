# Style-Dictionary Extended Design Tokens

The script `build.js` generates design tokens (JSON files) based on your reference and the object to be extended.
It uses the lodash library to merge data and json5 to read and write (optionaly) JSON5 files.
By using extends, the light version is set as the base since differing themes like "dark" only change minimally.

## 💡 System Requirements

- Node.js 22
- Git

## 🚀 Setup

1. Select the compatible Node version: `nvm use`
2. Install dependencies: `npm install`
3. Build the project: `npm run build`

- (optional) Build the project with watch mode: `npm run start`
