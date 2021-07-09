import { Ref, useCallback } from 'react'

function setRefs<T>(ref: Ref<T>, value: T) {
  if (typeof ref === 'function') {
    ref(value)
  } else if (ref) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(ref as any).current = value
  }
}

const useMergeRefs = <ForwardRef, LocalRef extends ForwardRef>(
  forwardedRef: Ref<ForwardRef>,
  localRef: Ref<LocalRef>,
): ((instance: LocalRef | null) => void) => {
  return useCallback(
    (value) => {
      setRefs(forwardedRef, value)
      setRefs(localRef, value)
    },
    [forwardedRef, localRef],
  )
}

export default useMergeRefs
