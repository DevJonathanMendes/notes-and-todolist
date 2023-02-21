import { useState } from "react";

const { round, random } = Math;
const randomId = () =>
    round(Date.now() * random()).toString(36);

const TodoForm = (props) => {
    const [inputTextValue, setInputTextValue] = useState(props.edit ? props.edit.text : "");

    const handleChange = e =>
        setInputTextValue(e.target.value);

    const handleSubmit = e => {
        e.preventDefault();

        props.onSubmit({
            id: randomId(),
            text: inputTextValue
        });

        setInputTextValue("");
    };

    return (
        <form onSubmit={handleSubmit}>
            {props.edit ? <>
                <input type="text" onChange={handleChange} value={inputTextValue} />
                <input type="submit" value="Update" />
            </> : <>
                <input type="text" onChange={handleChange} value={inputTextValue} />
                <input type="submit" value="Add" />
            </>}
        </form>
    );
}

export default TodoForm;