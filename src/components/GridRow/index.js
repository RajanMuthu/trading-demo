import React from "react";
import './style.scss';

const GridRow = React.memo((props) => {

    return <div className='gridRow'>
        {props.headerConfig.map(header => {
            return <div className='column' key={props.rowData[header.price]}>{props.rowData[header.columnId]}</div>;
        })}
</div>
});

export default GridRow;