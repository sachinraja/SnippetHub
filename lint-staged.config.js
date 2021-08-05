module.exports = {
  "*{.js,ts,jsx,tsx}": ["eslint --cache --fix", "prettier --write"],
  "*.{ts,tsx}": () => ["npm run type:gen", "npm run type:check"],
  "*.{md,yml,json}": "prettier --write",
};
