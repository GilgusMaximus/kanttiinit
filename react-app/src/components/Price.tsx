import React from 'react';
import { Restaurant as RestaurantModel} from '../models/Restaurant'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const N_ICONS = 3

class Price extends React.Component<{ restaurant: RestaurantModel }, {}>{
    render() {
        var icons = [];
        for(let i = 0; i < N_ICONS; i++) {
            if (i < this.props.restaurant.pricing! )
                icons.push(<AttachMoneyIcon fontSize='inherit' />)
            else
                icons.push(<AttachMoneyIcon color='disabled' fontSize='inherit' />)
        }

        return(
            <span>
                {icons}
            </span>
        );
    }
}

export default Price