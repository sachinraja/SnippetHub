import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfigRaw from 'tailwind.config'
import type {
  TailwindColorConfig,
  TailwindColorGroup,
  TailwindConfig,
} from 'tailwindcss/tailwind-config'

// remove undefined type from colors and declare custom colors
interface CustomColors {
  carbon: TailwindColorGroup
}

interface TailwindConfigThemeWithColors
  extends Omit<TailwindConfig['theme'], 'colors'> {
  colors: TailwindColorConfig & CustomColors
}

interface TailwindConfigWithColors extends Omit<TailwindConfig, 'theme'> {
  theme: TailwindConfigThemeWithColors
}

const tailwindConfig = resolveConfig(
  tailwindConfigRaw,
) as TailwindConfigWithColors

export const { colors } = tailwindConfig.theme

export default tailwindConfig
