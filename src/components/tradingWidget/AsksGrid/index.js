import React from "react";
import { Asks_Grid_Header_Config } from "../../../configs";
import Grid from "../../Grid";

const AsksGrid = (props) => {
    return <Grid styleName='asksGrid'
        headerConfig={Asks_Grid_Header_Config}
        gridData={props.asks}
        uniqueId="price"/>
}

export default React.memo(AsksGrid);