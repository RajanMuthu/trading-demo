import React from "react";
import './style.scss';
import {NUMBER_COLUMN, CURRENCY_COLUMN} from '../../Constants.js';

const GridRow = (props) => {

    return <div className='gridRow'>
        {props.headerConfig.map(header => {
            let rowData = props.rowData[header.columnId];
            if(rowData < 0) {
                rowData *= -1;
            }
            if(header.type === NUMBER_COLUMN) {
                rowData = rowData.toFixed(4);
            } else if(header.type === CURRENCY_COLUMN) {
                rowData = new Intl.NumberFormat().format(rowData);
            }
            return <GridColumn columnId={header.columnId} cellData={rowData}/>
        })}
</div>
};

const GridColumn = React.memo((props) => {
    return <div className='column' key={props.columnId}>{props.cellData}</div>;
});

export default React.memo(GridRow);