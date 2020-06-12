import React, {useState} from 'react'
import { FaSearch } from "react-icons/fa";
import './styles.scss'

export default function Form({onSubmit}) {
    const [inputfield, setInputfield] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        setInputfield('');
        window.blur();
        await onSubmit({
          inputfield,
        });
      }

    return (
        <form className="box-form" onSubmit={handleSubmit}>
        <div className="icon">
            <FaSearch
                className="icon-search"
                size={28}
                color="#6a6a6a"
            />
        </div>
        <input
            id="input"
            type="text"
            value={inputfield}
            onChange={(e) => setInputfield(e.target.value)}
            placeholder="Search for cities"
        />
        <button type="submit">Search</button>
    </form>
    )
}
