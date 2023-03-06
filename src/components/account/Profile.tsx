import React,{useState} from 'react'
import axios from 'axios'
import ButtonShort from '../button/ButtonShort';
import { useSession, signOut } from 'next-auth/react'

export default function Profile() {
  // query user data from api
  const [user, setUser] = useState("");
  const [role, setRole] = useState("");

  const prismaUser = axios.get("/api/account/user")
  .then((res) => {
      console.log("profile",res.data)
      setUser(res.data.name)
      setRole(res.data.role)
  }).catch((err) => {
      console.log(err);
  })
  return (
    <div>
      <p>I only got name and role data</p>
      <p>I also need to get other data like comapny and site info here</p>
      <p>another task is making compy type input a drop down of source or collector</p>
      <hr/>
      <br/>
      <p>the following data is from the serever</p>
      <hr/>
      <br/>
      <p>Name: {user}</p>
      <p>Account: {role}</p>
      <ButtonShort text="Sign Out" onClick={() => {
        signOut()
      }}/>

    </div>
  )
}
