import {Link} from 'react-router-dom';

import React from 'react'

const Public = () => {
  const content = (
    <section className='public'>
        <header>
            <h1>welcome to <span>notes</span> app - a team task management tool!</h1>
        </header>
        <main>
            <p>this is the welcome page. notes is an app designed to help teams stay organized; enabling managers to efficiently assign and track employee tasks.</p>
        </main>
        <footer>
            <Link to="/login"> login as an employee</Link>
        </footer>
    </section>
  )
  return content;
}

export default Public