import React, { Component, useEffect, useState } from 'react'
import Header from '../components/header'

import * as Bs from "react-icons/bs";

function Dashboard({ userData }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    getAllUser();
  }, [])

  const getAllUser = () => {
    fetch("http://localhost:5000/getAllUser", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");
        setData(data.data);
      })
  }

  const deleteUser = (id,name) => {
    if(window.confirm(`Are you sure you want to delete ${name}`)){
      fetch("http://localhost:5000/deleteUser", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          userid: id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          alert(data.data)
          getAllUser();
        })
    }else{

    }
  }

  return (
    <div>
      <table className='table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>User Type</th>
            <th>Delete</th>
          </tr>
          {data.map(i => {
            return(
              <tr>
                <td>{i.fname}</td>
                <td>{i.phone}</td>
                <td>{i.userType}</td>
                <td><Bs.BsFillTrashFill onClick={()=>deleteUser(i._id, i.fname)}/></td>
              </tr>
            )
          })}
        </thead>

        <tbody>

        </tbody>
      </table>
    </div>
  )
}

export default Dashboard