import React from 'react'

import './FolderBlock.css'

const folderBlock = (props) => {

    const selectedLine = props.isMessageSelected ? <div className='gridSelected' id={'left' + props.id} /> : null

    return (
        <React.Fragment>
            {selectedLine}

            <div 
                className={'folderBlock ' + (props.isMessageSelected ? 'folderBlockSelected' : 'folderBlockNotSelected')}
                onClick={props.selected}
            >
                <span>{props.title.toUpperCase()}</span>
            </div>

            {selectedLine}
        </React.Fragment>
    )
}

export default folderBlock