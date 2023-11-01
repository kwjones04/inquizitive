import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Quiz from './pages/Quiz';

export default function App() {

    const [loggedIn, setLoggedIn] = useState(false);
    const [email, setEmail] = useState('');
    const [currentUserID, setCurrentUserID] = useState(null);
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        // Fetch the user email and token from local storage
        const user = JSON.parse(localStorage.getItem("user"))
    
        // If the token/email does not exist, mark the user as logged out
        if (!user || !user.token) {
          setLoggedIn(false)
          return;
        }
    }, [])

    return (
        <div className='App'>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Welcome email={email} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}></Route>
                    <Route path='/login' element={<Login setLoggedIn={setLoggedIn} setEmail={setEmail} setCurrentUserID={setCurrentUserID} />}></Route>
                    <Route path='/signup' element={<Signup />}></Route>
                    <Route path='/home' element={<Home currentUserID={currentUserID} setSelected={setSelected} selected={selected} />}></Route>
                    <Route path='/quiz' element={<Quiz currentUserID={currentUserID} selected={selected} />}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}
