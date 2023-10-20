import { useNavigate } from 'react-router-dom';
//import { useState } from 'react';
import Select from 'react-select';


export default function Home() {

    const navigate = useNavigate();

    //const [selected, setSelected] = useState();

    const options = [
        { value: "Option1", label: "Option 1" },
        { value: "Option2", label: "Option 2" },
        { value: "Option3", label: "Option 3" }
    ]

    const handleChange = (selectedOption) => {
        console.log(`Selected option: ${selectedOption}`);
    }

    const onButtonClick = () => {
        navigate('/quiz');
    }

    return (
        <div className={'mainContainer'}>
            <div className={'titleContainer'}>
                <h1>Inquizitive</h1>
            </div>
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
                    onClick={onButtonClick}
                    value={"Start Quiz"}
                />
            </div>
        </div>
    );
}