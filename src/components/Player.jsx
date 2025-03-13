import React, { useState } from 'react'

const Player = ({ name, symbol, isActive }) => {

    const [isEditing, setIsEditing] = useState(false);
    const [nameChanging, setNameChanging] = useState(name);

    const handleClick = () => {
        setIsEditing((edit) => (!edit))
    }
    const chaningName = (e) => {
        setNameChanging(() => (e.target.value))
    }

    let userName = <span className="player-name">{nameChanging}</span>
    if (isEditing) {
        userName = <input value={nameChanging} onChange={chaningName} required />
    }

    return (
        <li className={isActive ? 'active' : undefined}>
            <span className='player'>
                {userName}
                <span className="player-symbol">{symbol}</span>
                <button onClick={handleClick} >{isEditing ? 'Save' : 'Edit'}</button>
            </span>
        </li>
    )
}

export default Player