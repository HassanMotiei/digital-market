import React, {useEffect, useState} from 'react'
import DataTable from '../../../Components/AdminPanel/DataTable/DataTable'
import PAdminItem from '../../../Components/AdminPanel/PAdminItem/PAdminItem'

const API_BASE_URL = 'http://localhost:4000/v1'

export default function Index() {
  const [infos, setInfos] = useState([])
  const [lastRegisteredUsers, setLastRegisteredUsers] = useState([])
  const [adminName, setAdminName] = useState('')

  useEffect(() => {
    fetch(`${API_BASE_URL}/infos/p-admin`, {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem('user')).token
        }`,
      },
    })
      .then((res) => res.json())
      .then((pageInfo) => {
        console.log(pageInfo)
        setInfos(pageInfo.infos)
        setLastRegisteredUsers(pageInfo.lastUsers)
        setAdminName(pageInfo.adminName)
      })
  }, [])

  return (
    <>
      <div className="home-content-edit">
        <div className="home-content-title home-title">
          <span className="welcome">
            Welcome, <span className="name">{adminName}</span>
          </span>
        </div>
        <div className="home-content-boxes">
          <div className="row">
            {infos.map((item) => (
              <PAdminItem {...item} />
            ))}
          </div>
        </div>

        <div className="home-content-latset-users">
          <DataTable title="Recently registered people">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>FirstName and LastName</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {lastRegisteredUsers.map((user, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    {/* <td>09123443243</td> */}
                    <td>{user.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </DataTable>
        </div>
      </div>
    </>
  )
}
