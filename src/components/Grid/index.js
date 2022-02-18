import React from "react";
import GridHeader from "../GridHeader";
import GridRow from "../GridRow";

const Grid = (props) => {
    return <div className={props.styleName}>
        <GridHeader headerConfig={props.headerConfig} />
        {props.gridData && props.gridData.map(rowData => {
            return <GridRow rowData={rowData}
                headerConfig={props.headerConfig}
                key={rowData[props.uniqueId]} />
        })}
    </div>
}

export default React.memo(Grid);