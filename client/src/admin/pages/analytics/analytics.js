import React, { useEffect, useState } from 'react'
import MySidebar from '../../components/sidebar/sidebar'

import BarCharts from "./chart"


const Analytics = () => {

  return (
    <div className='home' style={{display:"flex"}}>
        <div style={{width:"25%"}}>
            <MySidebar />
        </div>
        <div style={{width:"75%", marginTop:"30px"}}>
  <h1>Hello</h1>
     <BarCharts />
</div>
    </div>
  )
}

export default Analytics