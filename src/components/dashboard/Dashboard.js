import React from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from './SideBar'
import classes from './Dashboard.module.css'

const Dashboard = () => {
  return (
    <div className={classes.dashboard}>
        <div className='sidebar'><SideBar /></div>
        <div className='content-page'><Outlet /></div>
    </div>
  )
}

export default Dashboard