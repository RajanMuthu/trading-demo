import React, { useState } from "react";
import './style.scss';
import { NUMBER_COLUMN, CURRENCY_COLUMN } from '../../Constants.js';

const GridRow = (props) => {
    const [selectionColor, setSelectionColor] = useState(null);

    return <div className='gridRow' style={{backgroundColor: selectionColor}}
        onClick={() => setSelectionColor('blue')}>
        {props.headerConfig.map(header => {
            let cellData = props.rowData[header.columnId];
            if (cellData < 0) {
                cellData *= -1;
            }
            if (header.type === NUMBER_COLUMN) {
                cellData = cellData.toFixed(4);
            } else if (header.type === CURRENCY_COLUMN) {
                cellData = new Intl.NumberFormat().format(cellData);
            }
            return <GridColumn key={header.columnId} cellData={cellData}/>
        })}
    </div>
};

const GridColumn = React.memo((props) => {    
    return <div className='column'>{props.cellData}</div>;
});

export default React.memo(GridRow);