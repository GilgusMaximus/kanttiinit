import React from 'react';
import {Rating as RatingMUI, Typography} from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import {Restaurant as RestaurantModel} from '../models/Restaurant'
import {styled} from '@mui/material/styles';
import {getAuth, onAuthStateChanged, User} from '@firebase/auth';


class Rating extends React.Component<{ restaurant: RestaurantModel, allowSubmission: boolean, color: string },
    { value: number, currentUser: User | null }> {
    constructor(props: any) {
        super(props);
        this.state = {value: this.props.restaurant.rating, currentUser: null}
    }

    auth = getAuth();

    StyledRating = (styled(RatingMUI))({
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

    unsubscribe = onAuthStateChanged(this.auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            this.setState({currentUser: user})
            // ...
        } else {
            // User is signed out
            // ...
            this.setState({currentUser: null})
        }
    });

    render() {
        return (
            <this.StyledRating
                size='small'
                value={this.state.value}
                getLabelText={(value: number) => `${value} rating`}
                precision={0.5}
                // readOnly={!this.props.allowSubmission}
                onChange={(event, newValue) => {
                    if (newValue) {
                        this.setState({value: newValue})
                        console.log(this.state.currentUser)
                        if (this.state.currentUser) {
                            this.state.currentUser.getIdToken().then(async(token) => {
                                const response: Response = await fetch(`/restaurants/${this.props.restaurant.name}/ratings`, {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Accept': 'application/json',
                                        'auth': 'Bearer ' + token
                                    },
                                    body: JSON.stringify({
                                        'rating': newValue
                                    })
                                })
                                return response.json();
                            })
                        }
                    }
                }}
            />
        )
            ;
    }
}

export default Rating
