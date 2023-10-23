import { useNavigate } from 'react-router-dom';
//import { useState } from 'react';
import React from 'react';
import Select from 'react-select';


class QuizForm extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {value: ''};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.options = [
            { value: "Option1", label: "Option 1" },
            { value: "Option2", label: "Option 2" },
            { value: "Option3", label: "Option 3" }
        ]
    }
    
    handleChange(selectedOption) {
        this.setState({value: selectedOption});
    }

    handleSubmit(event) {
        alert('A value was submitted: ' + this.state.value.value);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
            <Select
                options={this.options}
                onChange={this.handleChange}
            />
            <div className={'buttonContainer'}>
                <input
                    className={'inputButton'}
                    type="submit"
                    value={"Start Quiz"}
                />
            </div>
            </form>
        );
    }
}


export default function Home() {

    const navigate = useNavigate();

    //const [selected, setSelected] = useState();

    /*
    const handleChange = (selectedOption) => {
        console.log(`Selected option: ${selectedOption}`);
    }

    const onButtonClick = () => {
        navigate('/quiz');
    }
    */

    return (
        <div className={'mainContainer'}>
            <div className={'titleContainer'}>
                <h1>Inquizitive</h1>
            </div>
            <div className={'selectContainer'}>
                <QuizForm />
            </div>
        </div>
    );
}