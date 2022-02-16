import {NUMBER_COLUMN, CURRENCY_COLUMN, INT_COLUMN} from '../Constants.js';

export const Bids_Grid_Header_Config = [
    { columnName: 'Count', columnId: 'count', type: INT_COLUMN },
    { columnName: 'Amount', columnId: 'amount', type: NUMBER_COLUMN   },
    { columnName: 'Total', columnId: 'total', type: NUMBER_COLUMN   },
    { columnName: 'Price', columnId: 'price', type: CURRENCY_COLUMN  }
];

export const Asks_Grid_Header_Config = [
    { columnName: 'Price', columnId: 'price', type: CURRENCY_COLUMN  },
    { columnName: 'Total', columnId: 'total', type: NUMBER_COLUMN  },
    { columnName: 'Amount', columnId: 'amount', type: NUMBER_COLUMN  },
    { columnName: 'Count', columnId: 'count', type: INT_COLUMN  }
];