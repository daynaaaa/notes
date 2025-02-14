import {Link} from 'react-router-dom';

import React from 'react'

const Public = () => {
  const content = (
    <section className='public'>
        <header>
            <h1>Welcome to <span>Notes</span> App - a Team Task Management Tool!</h1>
        </header>
        <main>
            <p>This is the welcome page. Notes is an app designed to help teams stay organized; enabling managers to efficiently assign and track employee tasks.</p>
        </main>
        <footer>
            <Link to="/login"> Login as an Employee</Link>
        </footer>
    </section>
  )
  return content;
}

export default Public