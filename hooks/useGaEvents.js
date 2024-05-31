import { sendEventToGTM } from '@/utils/util'
import { useEffect } from 'react'

const useGaEvents = (data) => {
  useEffect(() => {
    if (data) {
      sendEventToGTM(data)
    }
  }, [data])
}

export default useGaEvents
