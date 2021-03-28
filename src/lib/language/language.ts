import { enum_Snippet_language } from '@prisma/client'
import type { SimpleIcon } from 'simple-icons'

const pythonIcon: SimpleIcon = require('simple-icons/icons/python')
const javascriptIcon: SimpleIcon = require('simple-icons/icons/javascript')
const typescriptIcon: SimpleIcon = require('simple-icons/icons/typescript')
const csharpIcon: SimpleIcon = require('simple-icons/icons/csharp')
const elixirIcon: SimpleIcon = require('simple-icons/icons/elixir')
const svgIcon: SimpleIcon = require('simple-icons/icons/svg')

class Language {
  name: string

  color: string

  icon: SimpleIcon

  iconColor: string

  constructor(
    name: string,
    color: string,
    icon: SimpleIcon,
    iconColor: string,
  ) {
    this.name = name
    this.color = color
    this.icon = icon
    this.iconColor = iconColor
  }
}

// iconColor is the tailwind color for 600
const languages: Record<enum_Snippet_language, Language> = {
  [enum_Snippet_language.python]: new Language(
    'python',
    'green',
    pythonIcon,
    '#059669',
  ),
  [enum_Snippet_language.javascript]: new Language(
    'javascript',
    'yellow',
    javascriptIcon,
    '#D97706',
  ),
  [enum_Snippet_language.typescript]: new Language(
    'typescript',
    'blue',
    typescriptIcon,
    '#2563EB',
  ),
  [enum_Snippet_language.csharp]: new Language(
    'C#',
    'purple',
    csharpIcon,
    '#7C3AED',
  ),
  [enum_Snippet_language.elixir]: new Language(
    'elixir',
    'indigo',
    elixirIcon,
    '#4F46E5',
  ),
  [enum_Snippet_language.other]: new Language(
    'other',
    'gray',
    svgIcon,
    '#4B5563',
  ),
}

export default languages
