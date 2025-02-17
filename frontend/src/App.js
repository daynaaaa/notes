import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Layout from './components/Layout'
import Public from './components/Public'
import Login from './features/auth/Login'
import DashLayout from './components/DashLayout'
import Welcome from './features/auth/Welcome'
import NotesList from './features/notes/NotesList'
import UsersList from './features/users/UsersList'


function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/** the root itself, goes to public component */}
        <Route index element={<Public />} />
        
        <Route path="login" element={<Login />} />

        {/*protected routes*/}
        <Route path='dash' element={<DashLayout />}>
          <Route index element={<Welcome />} />

          <Route path='notes'>
            {/*domain/dash/notes*/}
            <Route index element={<NotesList />} />
          </Route>
          <Route path='users'>
            {/*domain/dash/users*/}
            <Route index element={<UsersList />} />
          </Route>


        </Route>
      </Route>
    </Routes>
  );
}

export default App;
