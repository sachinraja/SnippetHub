import { Language as PrismaLanguageEnum } from '@prisma/client'
import type { SimpleIcon } from 'simple-icons'

const pythonIcon: SimpleIcon = require('simple-icons/icons/python')
const javascriptIcon: SimpleIcon = require('simple-icons/icons/javascript')
const typescriptIcon: SimpleIcon = require('simple-icons/icons/typescript')
const csharpIcon: SimpleIcon = require('simple-icons/icons/csharp')
const elixirIcon: SimpleIcon = require('simple-icons/icons/elixir')
const htmlIcon: SimpleIcon = require('simple-icons/icons/html5')
const cssIcon: SimpleIcon = require('simple-icons/icons/css3')
const otherIcon: SimpleIcon = require('simple-icons/icons/svg')

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
const languages: Record<PrismaLanguageEnum, Language> = {
  [PrismaLanguageEnum.python]: new Language(
    'python',
    'green',
    pythonIcon,
    '#059669',
  ),
  [PrismaLanguageEnum.javascript]: new Language(
    'javascript',
    'yellow',
    javascriptIcon,
    '#D97706',
  ),
  [PrismaLanguageEnum.typescript]: new Language(
    'typescript',
    'blue',
    typescriptIcon,
    '#2563EB',
  ),
  [PrismaLanguageEnum.csharp]: new Language(
    'C#',
    'purple',
    csharpIcon,
    '#7C3AED',
  ),
  [PrismaLanguageEnum.elixir]: new Language(
    'elixir',
    'indigo',
    elixirIcon,
    '#4F46E5',
  ),
  [PrismaLanguageEnum.html]: new Language('html', 'red', htmlIcon, '#DC2626'),
  [PrismaLanguageEnum.css]: new Language('css', 'blue', cssIcon, '#2563EB'),
  [PrismaLanguageEnum.other]: new Language(
    'other',
    'gray',
    otherIcon,
    '#4B5563',
  ),
}

export default languages
