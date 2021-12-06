import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Button } from "semantic-ui-react";
import { useStore } from "../../../stores/store";



export default observer(function AdminDashboard() {

    const {userStore} = useStore();
    const {getAllUsers,allUsers,upgrade,downgrade} = userStore;

    useEffect( () =>{
      getAllUsers();
    },[getAllUsers]);
    

    return(
        <>
                
<table className="ui celled table">
  <thead>
    <tr>
    <th>Email</th>
    <th>Pochodzenie</th>
    <th>Imie</th>
    <th>Nazwisko</th>
    <th>Rola</th>
    <th>Operacja</th>
    </tr>
  </thead>
  <tbody>
    {
      // {`navbar ${!showNav && 'navBG'}`}
      allUsers?.map((user,key) =>         
     (
      <tr style={{color:`${user.roleId==2 ? 'red':'' }`}} key={key}>
      <td data-label="Email">{user.email}</td>
      <td data-label="Pochodzenie">{user.nationality}</td>
      <td data-label="Imie">{user.firstName}</td>
      <td data-label="Nazwisko">{user.lastName}</td>
      <td  data-label="Rola">{user.roleId ==1 ? 'Użytkownik' : 'Administrator' }</td>
      <td data-label="Operacja">
        <Button onClick={()=> console.log(user.email)}>Usuń</Button>
        <Button onClick={()=> upgrade(user)}>Awansuj</Button>
        <Button onClick={()=> downgrade(user)}>Degraduj</Button>
      </td>
      </tr>
     )   
    )
    }
  </tbody>
</table>
                

        </>

    )


});