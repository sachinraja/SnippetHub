import { LanguageMode } from '@lib/language/mode'
import { Language as PrismaLanguage } from '@prisma/client'
import type { SimpleIcon } from 'simple-icons'

const pythonIcon: SimpleIcon = require('simple-icons/icons/python')
const javascriptIcon: SimpleIcon = require('simple-icons/icons/javascript')
const typescriptIcon: SimpleIcon = require('simple-icons/icons/typescript')
const csharpIcon: SimpleIcon = require('simple-icons/icons/csharp')
const elixirIcon: SimpleIcon = require('simple-icons/icons/elixir')
const htmlIcon: SimpleIcon = require('simple-icons/icons/html5')
const cssIcon: SimpleIcon = require('simple-icons/icons/css3')
const otherIcon: SimpleIcon = require('simple-icons/icons/svg')

interface Language {
  name: string
  color: string
  icon: SimpleIcon
  iconColor: string
  mode?: LanguageMode
}

// iconColor is the tailwind color for 600
const languages: Record<PrismaLanguage, Language> = {
  [PrismaLanguage.python]: {
    name: 'python',
    color: 'green',
    icon: pythonIcon,
    iconColor: '#059669',
    mode: LanguageMode.python,
  },
  [PrismaLanguage.javascript]: {
    name: 'javascript',
    color: 'yellow',
    icon: javascriptIcon,
    iconColor: '#D97706',
    mode: LanguageMode.javascript,
  },
  [PrismaLanguage.typescript]: {
    name: 'typescript',
    color: 'blue',
    icon: typescriptIcon,
    iconColor: '#2563EB',
    mode: LanguageMode.typescript,
  },
  [PrismaLanguage.csharp]: {
    name: 'C#',
    color: 'purple',
    icon: csharpIcon,
    iconColor: '#7C3AED',
    mode: LanguageMode.csharp,
  },
  [PrismaLanguage.elixir]: {
    name: 'elixir',
    color: 'indigo',
    icon: elixirIcon,
    iconColor: '#4F46E5',
    mode: LanguageMode.erlang,
  },
  [PrismaLanguage.html]: {
    name: 'html',
    color: 'red',
    icon: htmlIcon,
    iconColor: '#DC2626',
    mode: LanguageMode.html,
  },
  [PrismaLanguage.css]: {
    name: 'css',
    color: 'blue',
    icon: cssIcon,
    iconColor: '#2563EB',
    mode: LanguageMode.css,
  },
  [PrismaLanguage.other]: {
    name: 'other',
    color: 'gray',
    icon: otherIcon,
    iconColor: '#4B5563',
  },
}

export default languages
