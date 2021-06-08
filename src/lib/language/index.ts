import { Language as PrismaLanguage } from '@prisma/client'
import csharpIcon from 'simple-icons/icons/csharp'
import cssIcon from 'simple-icons/icons/css3'
import elixirIcon from 'simple-icons/icons/elixir'
import htmlIcon from 'simple-icons/icons/html5'
import javascriptIcon from 'simple-icons/icons/javascript'
import otherIcon from 'simple-icons/icons/svg'
import pythonIcon from 'simple-icons/icons/python'
import typescriptIcon from 'simple-icons/icons/typescript'
import { colors } from '@lib/styling/tailwind-config'
import { LanguageMode } from '@lib/language/mode'
import type { TailwindColorGroup } from 'tailwindcss/tailwind-config'

interface LanguageColor {
  text: string
  icon: string
  border: string
}

interface Language {
  name: string
  color: LanguageColor
  icon: SimpleIcon
  mode?: LanguageMode
}

function getLanguageColorFromTWColorGroup(colorGroup: TailwindColorGroup) {
  return {
    text: colorGroup[400],
    icon: colorGroup[600],
    border: colorGroup[500],
  }
}

// iconColor is the tailwind color for 600
const languages: Record<PrismaLanguage, Language> = {
  [PrismaLanguage.python]: {
    name: 'python',
    color: getLanguageColorFromTWColorGroup(colors.green),
    icon: pythonIcon,
    mode: LanguageMode.python,
  },
  [PrismaLanguage.javascript]: {
    name: 'javascript',
    color: getLanguageColorFromTWColorGroup(colors.yellow),
    icon: javascriptIcon,
    mode: LanguageMode.javascript,
  },
  [PrismaLanguage.typescript]: {
    name: 'typescript',
    color: getLanguageColorFromTWColorGroup(colors.blue),
    icon: typescriptIcon,
    mode: LanguageMode.typescript,
  },
  [PrismaLanguage.csharp]: {
    name: 'C#',
    color: getLanguageColorFromTWColorGroup(colors.purple),
    icon: csharpIcon,
    mode: LanguageMode.csharp,
  },
  [PrismaLanguage.elixir]: {
    name: 'elixir',
    color: getLanguageColorFromTWColorGroup(colors.indigo),
    icon: elixirIcon,
    mode: LanguageMode.elixir,
  },
  [PrismaLanguage.html]: {
    name: 'html',
    color: getLanguageColorFromTWColorGroup(colors.red),
    icon: htmlIcon,
    mode: LanguageMode.html,
  },
  [PrismaLanguage.css]: {
    name: 'css',
    color: getLanguageColorFromTWColorGroup(colors.blue),
    icon: cssIcon,
    mode: LanguageMode.css,
  },
  [PrismaLanguage.other]: {
    name: 'other',
    color: getLanguageColorFromTWColorGroup(colors.gray),
    icon: otherIcon,
  },
}

export default languages
