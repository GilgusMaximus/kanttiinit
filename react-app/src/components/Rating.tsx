import React from 'react';
import { Rating as RatingMUI, Typography } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import { Restaurant as RestaurantModel} from '../models/Restaurant'
import { styled } from '@mui/material/styles';

class Rating extends React.Component<
    { restaurant: RestaurantModel, allowSubmission: boolean, color: string },
    {}
>{
    StyledRating = styled(RatingMUI)({
        '& .MuiRating-iconFilled': {
          color: this.props.color,
          verticalAlign: 'middle',
        },
        '& .MuiRating-iconHover': {
          color: this.props.color,
          verticalAlign: 'middle',
          border: this.props.color,
        },
        '& .MuiRating-iconEmpty': {
            color: this.props.color,
            verticalAlign: 'middle',
            border: this.props.color,
          },
    });

    render() {
        return(
            <this.StyledRating
                size='small'
                defaultValue={3}
                getLabelText={(value: number) => `${value} rating`}
                precision={0.5}
                readOnly={!this.props.allowSubmission}
            />
        );
    }
}

export default Rating