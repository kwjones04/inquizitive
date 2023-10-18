import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase-config';
import { Link } from 'react-router-dom';


/* ---------
SIGN IN PAGE
--------- */

export default function Login(props) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const navigate = useNavigate();

    const signIn = () => {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log(userCredential.user.displayName);
            navigate('/home');
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setEmailError("Invalid email or password.");
            setPasswordError("Invalid email or password.");
            console.log(errorCode, errorMessage);
        });
    }

    const onButtonClick = () => {

        setEmailError("");
        setPasswordError("");
        
        // Email error
        if (email === "") {
            setEmailError("Please enter your email.");
            return;
        }
        
        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            setEmailError("Please enter a valid email");
            return;
        }
        
        // Password error
        if (password === "") {
            setPasswordError("Please enter your password.");
            return;
        }
        if (password.length < 8) {
            setPasswordError("Password must be at least 8 characters.");
            return;
        }

        else {
            signIn();
        }
    }

    return (
        <div className={"mainContainer"}>
            <div className={"titleContainer"}>
                <div>Sign in</div>
            </div>
            <br/>
            <div className={"inputContainer"}>
                <input
                    value={email}
                    placeholder="Email"
                    onChange={ev => setEmail(ev.target.value)}
                    className={"inputBox"}
                />
                <label className="errorLabel">{emailError}</label>
            </div>
            <br/>
            <div className={"inputContainer"}>
                <input
                    value={password}
                    placeholder="Password"
                    onChange={ev => setPassword(ev.target.value)}
                    className={"inputBox"}
                    type="password"
                />
                <label className="errorLabel">{passwordError}</label>
            </div>
            <br/>
            <div className={"inputContainer"}>
                <input
                    className={"inputButton"}
                    type="button"
                    onClick={onButtonClick}
                    value={"Log in"}
                />
            </div>
            <div className={'linkContainer'}>
                <Link to='/signup'>No account? Sign up here.</Link>
            </div>
        </div>
    );
}