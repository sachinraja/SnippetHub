const eslintCmd = 'eslint --cache --fix'
const prettierCmd = 'prettier --write'

module.exports = {
  '*.{ts,tsx}': (filenames) => {
    const joinedFilenames = filenames.join(' ')

    return [
      'npm run type:gen',
      'npm run type:check',
      `${eslintCmd} ${joinedFilenames}`,
      `${prettierCmd} ${joinedFilenames}`,
    ]
  },
  '*{.js,jsx}': [eslintCmd, prettierCmd],
  '*.{md,yml,json}': 'prettier --write',
}
