import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase-config';
import { Link } from 'react-router-dom';


/* ---------
SIGN UP PAGE
--------- */

export default function Signup() {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [firstNameError, setFirstNameError] = useState("");
    const [lastNameError, setLastNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const navigate = useNavigate();

    const signUp = () => {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            navigate('/home');
            userCredential.user.displayName = firstName + " " + lastName;
            console.log(userCredential.user.displayName);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });
    }

    const onButtonClick = () => {

        setFirstNameError("");
        setLastNameError("");
        setEmailError("");
        setPasswordError("");

        // Name error
        if (firstName === "") {
            setFirstNameError("Please enter your first name.");
            return;
        }

        if (lastName === "") {
            setLastNameError("Please enter your last name.");
            return;
        }
        
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
            signUp();
        }
    }

    return (
        <div className={"mainContainer"}>
            <div className={"titleContainer"}>
                <div>Sign up</div>
            </div>
            <br/>
            <div className={"inputContainer"}>
                <input
                    value={firstName}
                    placeholder="First name"
                    onChange={ev => setFirstName(ev.target.value)}
                    className={"inputBox"}
                />
                <label className="errorLabel">{firstNameError}</label>
            </div>
            <br/>
            <div className={"inputContainer"}>
                <input
                    value={lastName}
                    placeholder="Last name"
                    onChange={ev => setLastName(ev.target.value)}
                    className={"inputBox"}
                />
                <label className="errorLabel">{lastNameError}</label>
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
                    value={"Sign up"}
                />
            </div>
            <div className={'linkContainer'}>
                <Link to='/login'>Have an account? Log in here.</Link>
            </div>
        </div>
    );
}
