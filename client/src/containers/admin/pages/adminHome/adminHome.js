import React from 'react'
import MySidebar from '../../components/sidebar/sidebar'
import Widget from '../../components/widget/widget'
import './adminHome.css'

const AdminHome = () => {
  return (
    <>
    <div className='home' style={{display:"flex"}}>
        <div style={{width:"25%"}}>
            <MySidebar />
        </div>
        <div style={{width:"75%", marginTop:"30px"}}>
<Widget />
</div>
    </div>
    </>
  )
}

export default AdminHome