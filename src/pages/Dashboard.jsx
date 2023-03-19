import React, { Component, useEffect, useState } from 'react'
import Header from '../components/header'
import Admin_Sidebar from '../components/admin-sidebar'

import * as Bs from "react-icons/bs";
import UserList from '../components/user-list';
function Dashboard() {
  return (
    <div>
      <UserList />
      <Admin_Sidebar />
    </div>
  )
}

export default Dashboard