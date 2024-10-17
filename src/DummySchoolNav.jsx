import React from 'react'
import {Link} from 'react-router-dom'

const DummySchoolNav = () => {
  return (
    <div>
      <div style={{height: "20vh", width: "100%",backgroundColor: "red"}}></div>
      <div style={{height: "80vh", width: "100%",backgroundColor: "blue"}}>
        <Link to='/ashram' style={{color: "white"}}>Ashram Page</Link>
      </div>
    </div>
  )
}

export default DummySchoolNav
