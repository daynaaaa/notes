import React from 'react'

import { Link } from 'react-router-dom'

const Welcome = () => {

    const date = new Date()
    const today = new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long' }).format(date);

    const content = (
        <section className="welcome">

            <p>{today}</p>

            <h1>welcome!</h1>

            <p><Link to="/dash/notes">view your notes</Link></p>

            <p><Link to="/dash/notes/new">add new note</Link></p>

            <p><Link to="/dash/users">view user settings</Link></p>

            <p><Link to="/dash/users/new">add new user</Link></p>

        </section>
    )

    return content
}

export default Welcome