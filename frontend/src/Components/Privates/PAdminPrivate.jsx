import React, {useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import AuthContext from '../../Context/AuthContext'

export default function PAdminPrivate({children}) {
  const authContext = useContext(AuthContext)
  const navigate = useNavigate()

  return (
    <>
      {authContext.userInfos.role === 'ADMIN' ? (
        <>{children}</>
      ) : (
        navigate('/login')
      )}
    </>
  )
}
