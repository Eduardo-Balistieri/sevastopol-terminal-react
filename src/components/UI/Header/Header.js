import React from 'react'

import './Header.css'

const header = (props) => (
    <div className='header'>
        <p>{props.title.toUpperCase()}</p>
        <div />
    </div>
)

export default header