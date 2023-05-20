import {
  SetStateAction,
  useCallback,
  useState
} from 'react'
import { useMountRef } from './use-mount-ref'

export function useSafeState<T>(init?: T) {
  const [state, setState] = useState(init)
  const mountRef = useMountRef()

  return [
    state,
    useCallback(
      (updates: SetStateAction<T | undefined>) => {
        if (!mountRef.current) return
        setState(updates)
      },
      [mountRef]
    )
  ] as const
}
