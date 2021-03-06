
import * as React from 'react';
import { Component, SyntheticEvent} from 'react';
import { Restaurant as RestaurantModel} from '../models/Restaurant';

import Button from '@mui/material/Button';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import { TextField } from '@mui/material';
import { getAuth, onAuthStateChanged, User } from '@firebase/auth';

const axios = require('axios');

const uploadStatusDisplayTimeInSeconds = 3;

const auth = getAuth();

type selectionType = { mealIdx: number, dishIdx: number };

class ImageUpload extends React.Component<{restaurant: RestaurantModel}, { imageFile: any, successfulUpload: number, selectedMeal: selectionType, currentUser: User | null}>{
    // needed to make a reference to the file input button
    fileInput = React.createRef<HTMLInputElement>();
    fileSubmisson = React.createRef<HTMLInputElement>();

    constructor(props: any) {
        super(props);
        this.state = {imageFile: '', successfulUpload: 0, selectedMeal: {mealIdx: -1, dishIdx: -1}, currentUser: null};

        // allows us to handle what happens on change and submit
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputFileChange = this.handleInputFileChange.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.handleSubmitButtonClick = this.handleSubmitButtonClick.bind(this);
        this.handleMealSelection = this.handleMealSelection.bind(this);
    }

    
    unsubscribe = onAuthStateChanged(auth, (user) => {
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
    
    index(mealIdx: number, dishIdx: number) {
        let digits = (this.props.restaurant.meals.length).toString(10).length; 
        return mealIdx*(10**digits) + dishIdx;
    }

    mealIdx(n: number) {
        let digits = (this.props.restaurant.meals.length).toString(10).length; 
        return Math.floor(n/(10**digits));
    }

    dishIdx(n: number) {
        let digits = (this.props.restaurant.meals.length).toString(10).length; 
        return n%(10**digits);
    }

    handleButtonClick(event: any) {
        // used to circumvent the non available styling options of the browse button
        event.preventDefault();
        if (this.fileInput.current) {
            this.fileInput.current.click()
        }
    }

    handleSubmitButtonClick(event: any) {
        // used to circumvent the non available styling options of the browse button
        event.preventDefault();
        if (this.fileSubmisson.current) {
            this.fileSubmisson.current.click()
        }
    }

    handleInputFileChange(event: any) {
        const image = event.target.files[0];
        if(image.type !== "image/png" && image.type !== "image/jpeg") {
            // reject image
            alert("Image file type not correct. Only png and jpg files are supported at the moment !");
            return;
        }
        this.setState({imageFile: event.target.files[0]});
    }

    handleMealSelection(event: any) {
        let n = Number(event.target.value)
        let mealIdx = this.mealIdx(n);
        let dishIdx = this.dishIdx(n);
        console.log(mealIdx, dishIdx);
        this.setState({selectedMeal: { mealIdx: mealIdx, dishIdx: dishIdx}});
    }

    handleSubmit(event: any) {
        event.preventDefault();
        if(this.state.imageFile === '' || this.state.selectedMeal.mealIdx < 0 ||this.state.selectedMeal.mealIdx > this.props.restaurant.meals.length
            || this.state.selectedMeal.dishIdx < 0 ||this.state.selectedMeal.dishIdx > this.props.restaurant.meals.length) {
            return;
        }
        const formData = new FormData();
        formData.append("name", this.state.imageFile.name);
        formData.append("file", this.state.imageFile);
        if (this.state.currentUser) {
            this.state.currentUser.getIdToken().then((token) => {
                const requestOptions = {
                    headers: { 'Content-Type': 'multipart/form-data', 'auth': 'Bearer '+ token }
                };
                axios.post(`restaurants/${this.props.restaurant.name}/meals/${this.props.restaurant.meals[this.state.selectedMeal.mealIdx].dishes[this.state.selectedMeal.dishIdx].name}/image/`, formData, requestOptions)
                .then((response: any) => 
                    {
                        if(response.status === 200) {
                            // Upload succeeded
                            this.setState({imageFile: '', successfulUpload: 1});
                        } else {
                            // Upload failed
                            this.setState({successfulUpload: 2})
                        }
                        setTimeout(() => {
                            this.setState({ successfulUpload: 0});
                        }, 1000 * uploadStatusDisplayTimeInSeconds);
                    }
                ).catch((error: any) => {
                    console.log(error);
                    this.setState({successfulUpload: 2})
                    setTimeout(() => {
                        this.setState({ successfulUpload: 0});
                    }, 1000 * uploadStatusDisplayTimeInSeconds);
                })
            })
        }

    }

    render() {
        var mealItems = [];
        for(let mealIdx=0; mealIdx < this.props.restaurant.meals.length; mealIdx++) {
            let meal = this.props.restaurant.meals[mealIdx];
            for(let dishesIdx=0; dishesIdx < meal.dishes.length; dishesIdx++) {
                let dish = meal.dishes[dishesIdx];
                mealItems.push(
                    <MenuItem
                        value={this.index(mealIdx, dishesIdx)}
                    >
                        {dish.name}
                    </MenuItem>
                );
            }
        }

        return (
            <span style={{justifyContent: (!this.state.currentUser) ? 'center' : 'unset', display: (!this.state.currentUser) ? 'grid' : 'default'}}>
                {this.state.currentUser && <form onSubmit={this.handleSubmit} style={{paddingBottom: 50}}>
                    <Stack direction="column" spacing={1} alignItems="center"justifyContent="center">
                    {/* ---------------Success or Failure Display--------------- */}
                        {(this.state.successfulUpload === 1) && <Chip
                        icon={<CheckCircleOutlineIcon sx={{fill: '#1df051'}} />}
                        label="Upload Successful"
                        variant="outlined"
                        sx={{
                            borderColor: '#1df051',
                            color: '#1df051',
                            width: 0.3,
                            borderWidth: 3,
                            fontSize: 15
                        }}></Chip>}
                        {(this.state.successfulUpload === 2) && <Chip
                        icon={<CheckCircleOutlineIcon sx={{fill: '#f01d1d'}} />}
                        label="Upload Failed"
                        variant="outlined"
                        sx={{
                            borderColor: '#f01d1d',
                            color: '#f01d1d',
                            width: 0.3,
                            borderWidth: 3,
                            fontSize: 15
                        }}></Chip>}

                    {/* ---------------Success or Failure Display End--------------- */}
                        <Grid container spacing={2} alignItems="center"justifyContent="center">
                            <Grid item xs={'auto'}>
                                <Chip label={this.state.imageFile.name || 'No image selected'}></Chip>
                            </Grid>
                            <Grid item xs={'auto'}>
                                {/* TODO minWidth not so nice here  */}
                                <TextField select fullWidth label="Select meal for image" onChange={this.handleMealSelection} sx={{color:'red', minWidth: 200}}>
                                    {mealItems}
                                </TextField>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} alignItems="center"justifyContent="center">
                            <Grid item xs={'auto'}>
                                <label>
                                <input type="file" ref={this.fileInput} hidden onChange={this.handleInputFileChange} accept="image/png, image/jpeg"/>
                                <Button
                                    variant="contained"
                                    onClick={this.handleButtonClick}
                                    startIcon={<ImageSearchIcon />}
                                >Select Image for lunch option upload</Button>
                                </label>
                            </Grid>
                            <Grid item xs={'auto'}>
                                <input type="submit" ref={this.fileSubmisson} hidden value="Upload image"/>
                                <Button
                                    variant="contained"
                                    onClick={this.handleSubmitButtonClick}
                                    startIcon={<FileUploadIcon />}
                                >Upload Image</Button>
                            </Grid>
                        </Grid>

                    </Stack>
                </form>}
                {!this.state.currentUser && <span style={{fontStyle: 'italic'}}>Please login in order to upload pictures & create restaurant ratings</span>}
            </span>
        );
    }
}

export default ImageUpload;
