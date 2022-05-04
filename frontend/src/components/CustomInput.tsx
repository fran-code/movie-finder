import React from 'react'
import { ICustomInput } from '../utils/interfaces'

const CustomInput: React.FC<ICustomInput> = ({ value, setValue, label, onSubmit }) => {

    const handleUserKeyPress = (eventKey: any) => {
        const { keyCode } = eventKey;
        if (keyCode === 13) onSubmit(value)
    }

    React.useEffect(() => {
        window.addEventListener('keydown', handleUserKeyPress);

        return () => {
            window.removeEventListener('keydown', handleUserKeyPress);
        };
    }, [handleUserKeyPress]);

    return (
        <div className="flex">
            <div className="inputGroup">
                <input value={value} type="text" className="customInput" name="customInput" id="customInput" onChange={e => setValue(e.target.value)} required />
                <span className="highlight"></span>
                <span className="bar"></span>
                <label htmlFor="customInput" className="customLabel">{label}</label>
            </div>
            {value !== "" && <button className="deleteButton" data-testid="deleteButton" onClick={() => onSubmit("")}><i className="fa fa-times" /></button>}
            {value !== "" && <button className="searchButton" data-testid="searchButton" onClick={() => onSubmit(value)}><i className="fa fa-search" /></button>}
        </div>
    )
}

export default CustomInput