import React from "react";
import { Bids_Grid_Header_Config } from "../../../configs";
import Grid from "../../Grid";

const BidsGrid = (props) => {
    return <Grid styleName='bidsGrid'
        headerConfig={Bids_Grid_Header_Config}
        gridData={props.bids}
        uniqueId="price" />
}

export default React.memo(BidsGrid);