import preval from 'next-plugin-preval'
import { colors as configColors } from './tailwind-config'

const colors = preval(configColors)

export default colors
