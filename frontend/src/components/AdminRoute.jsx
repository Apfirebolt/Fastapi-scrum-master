import { Navigate, Outlet } from 'react-router-dom'
import { useAdminStatus } from '../hooks/useAdminStatus'
import Loader from './Loader'

const AdminRoute = () => {
  const { isAdmin, checkingStatus } = useAdminStatus()

  console.log('Admin check ', isAdmin, checkingStatus)

  if (checkingStatus) {
    return <Loader />
  }

  return isAdmin ? <Outlet /> : <Navigate to='/login' />
}

export default AdminRoute
