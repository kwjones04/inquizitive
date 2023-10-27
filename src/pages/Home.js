import { React, useState, useEffect } from 'react';
import { useSearchParams, createSearchParams, useNavigate } from 'react-router-dom';
import Select from 'react-select';
//import { auth } from '../firebase-config';
import { db } from '../firebase-config';
import { doc, getDoc } from 'firebase/firestore';


export default function Home() {

    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userData, setUserData] = useState(null);
    const [selected, setSelected] = useState(null);

    // Get user quizzes
    useEffect(() => {
        async function getData() {
            try {
                const userRef = doc(db, 'users', id);
                const docSnap = await getDoc(userRef);
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    //console.log(userData);
                    setUserData(userData);
                    setLoading(false);
                } else {
                    // docSnap.data() will be undefined in this case
                    console.log("No such document!");
                }
            } catch (error) {
                console.log(error.message);
                setLoading(false);
                setError(error);
            }
        }
        getData();
    });

    const handleChange = (selectedOption) => {
        const selectedValue = selectedOption.value;
        setSelected(selectedValue);
    }

    const onButtonClick = () => {
        navigate({
            pathname: '/quiz',
            search: createSearchParams({
                id: selected
            }).toString()
        });
    }

    if (loading) {
        return;
    }
    
    if (error) {
        return (
            <div className={'mainContainer'}>
                <div className={'titleContainer'}>
                    <h1>Sorry, there was an error!</h1>
                </div>
            </div>
        );
    }

    const options = [];

    for (let i = 0; i < userData.quizzes.length; i++) {
        options.push(
            { value: userData.quizzes[i].value, label: userData.quizzes[i].label }
        );
    }

    return (
        <div className={'mainContainer'}>
            <div className={'titleContainer'}>
                <h1>Inquizitive</h1>
            </div>
            <div>
                <div className={'selectContainer'}>
                    <Select
                        options={options}
                        onChange={handleChange}
                    />
                </div>
                <div className={'buttonContainer'}>
                    <input
                        className={'inputButton'}
                        type="button"
                        value={"Start Quiz"}
                        onClick={onButtonClick}
                    />
                </div>
            </div>
        </div>
    );
}