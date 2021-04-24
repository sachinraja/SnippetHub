import { CodeMirrorModeObject } from './mode'

function resolveMode(mode: CodeMirrorModeObject) {
  return typeof mode === 'object' ? mode.name : mode
}

export default resolveMode
