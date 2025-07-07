import React from 'react'
import { Link } from 'react-router-dom'

export default function SalesOptions() {
  return (
    <>
    <nav className="nav">
  <Link className="nav-link" aria-current="page" to={"/show-leads"}>ShowLeads</Link>
  <Link className="nav-link" to={"/book-policy"}>Book Policy</Link>
  
</nav>
    </>
  )
}
