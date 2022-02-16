import React from 'react';
import './style.scss';

const GridHeader = React.memo((props) => {
    return <div className='gridHeader'>
        {props.headerConfig.map(config => {
            return <div className='column' key={config.columnId}>{config.columnName}</div>
        })}
    </div>
});

export default GridHeader;