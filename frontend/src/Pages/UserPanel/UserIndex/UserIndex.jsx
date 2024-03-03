import React, {useContext} from 'react'
import AuthContext from '../../../Context/AuthContext'
import IndexBox from '../../../Components/UserPanel/IndexBox/IndexBox'

export default function Index() {
  const authContext = useContext(AuthContext)

  return (
    <div className="col-9">
      <div className="main">
        <div className="main__title">
          <span className="main__title-text">
            Hello{' '}
            <span className="main__title-name">
              {authContext.userInfos.name}
            </span>
            ، Welcome to the User Panel
          </span>
        </div>
        <p className="main__desc">
          Through your account counter, you can view your recent orders, manage
          your shipping and billing addresses, and edit your account details and
          password
        </p>
        <div className="main__links">
          <div className="row">
            <IndexBox
              title="Order"
              href="orders"
            />
            <IndexBox
              title="Purchased courses"
              href="courses"
            />
            <IndexBox
              title="my Wallet"
              href="money"
            />
            <IndexBox
              title="Account Details"
              href="infos"
            />
            <IndexBox
              title="Support Tickets"
              href="ticket"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
