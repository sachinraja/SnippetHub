module.exports = {
  '*.{ts,tsx}': () => ['npm run type:gen', 'npm run type:check'],
  '*{.js,ts,jsx,tsx}': ['eslint --cache --fix', 'prettier --write'],
  '*.{md,yml,json}': 'prettier --write',
}
