import React from 'react'

export default function useOutsideClickHook(callback, ref) {
  React.useEffect(() => {
    const handleOutsideClick = e => {
      if (ref.current && !ref.current.contains(e.target)) {
        callback()
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)

    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [callback, ref])
}
