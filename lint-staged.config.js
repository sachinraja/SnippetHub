const eslintCmd = 'eslint --cache --fix'
const prettierCmd = 'prettier --write'

module.exports = {
  '*.{ts,tsx}': (filenames) => {
    const eslintCmds = []
    const prettierCmds = []

    // only lint and format after types have been generated and checked
    filenames.forEach((filename) => {
      eslintCmds.push(`${eslintCmd} ${filename}`)
      prettierCmds.push(`${prettierCmd} ${filename}`)
    })

    return [
      'npm run type:gen',
      'npm run type:check',
      ...eslintCmds,
      ...prettierCmds,
    ]
  },
  '*{.js,jsx}': [eslintCmd, prettierCmd],
  '*.{md,yml,json}': 'prettier --write',
}
