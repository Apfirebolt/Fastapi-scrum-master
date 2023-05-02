import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

export const useAdminStatus = () => {
  const [isAdmin, setIsAdmin] = useState(false)
  const [checkingStatus, setCheckingStatus] = useState(true)

  const { profile } = useSelector((state) => state.auth)

  useEffect(() => {
    if (profile && profile.role === 'admin') {
      setIsAdmin(true)
    } else {
      setIsAdmin(false)
    }
    setCheckingStatus(false)
  }, [profile])

  return { isAdmin, checkingStatus }
}

