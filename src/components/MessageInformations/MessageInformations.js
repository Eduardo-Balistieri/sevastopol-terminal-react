import React from 'react'
import './MessageInformations.css'

const messageInformations = (props) => {

    const message = props.message

    return (
        <React.Fragment>
            <div
                className={'messageTitle ' + (props.isTitleSelected ? 'messageTitleActive' : 'messageTitleDesactive')}
                onClick={() => props.selectBlock(true)}
                id={`right${props.selectedMessage}${props.isTitleSelected ? 'Active' : 'Desactive'}`}
            >
                {message.primaryTitle ? message.primaryTitle.toUpperCase() : <br />}
            </div>

            <div
                className={'messageTitle ' + (props.isTitleSelected ? 'messageTitleDesactive' : 'messageTitleActive')}
                onClick={() => props.selectBlock(false)}
                id={`right${props.selectedMessage}${props.isTitleSelected ? 'Desactive' : 'Active'}`}
            >
                {message.secundaryTitle ? message.secundaryTitle.toUpperCase() : <br />}
            </div>

            <div className='box'>
                <div className='solidLine' />
                <p>{props.isTitleSelected ? message.primaryMessage : message.secundaryMessage}</p>
            </div>
            
        </React.Fragment>
    )
}

export default messageInformations