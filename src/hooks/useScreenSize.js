import { useState, useEffect } from 'react'

const useScreenSize = () => {
  const [windowDimenion, detectHW] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  const detectSize = () => {
    detectHW({
      width: window.innerWidth,
      height: window.innerHeight,
    })
  }

  useEffect(() => {
    window.addEventListener('resize', detectSize)

    return () => {
      window.removeEventListener('resize', detectSize)
    }
  }, [windowDimenion])

  return (
    windowDimenion
  )
}

export default useScreenSize;
