
import * as React from 'react';
import { Component, SyntheticEvent} from 'react';
const axios = require('axios');


class ImageUpload extends React.Component<{foodId: string, restaurant: string | null}, { imageFile: any}>{
    // needed to make a reference to the file input button
    fileInput = React.createRef<HTMLInputElement>();

    constructor(props: any) {
        super(props);
        this.state = {imageFile: '',};

        // allows us to handle what happens on change and submit
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputFileChange = this.handleInputFileChange.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this);
    }

    handleButtonClick(event: any) {
        // used to circumvent the non available styling options of the browse button
        event.preventDefault();
        if (this.fileInput.current) {
            this.fileInput.current.click()
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

    handleSubmit(event: any) {
        event.preventDefault();
        console.log("Current restaurantname", this.props.restaurant)
        //TODO Uncomment to make it function, but is currently not with the restaurant name as it doesn't correspond
        // TODO to the actual id, which is the name of the restaurant written in lower case and maybe shortened
        
        console.log("Trying to post image")
        const formData = new FormData();
        formData.append("name", this.state.imageFile.name);
        formData.append("file", this.state.imageFile);
        const requestOptions = {
            headers: { 'Content-Type': 'multipart/form-data' }
        };
        axios.post(`restaurants/dipoli/meals/${this.props.foodId}/image/`, formData, requestOptions)
        .then((response: any) => console.log("POST RESPONSE:", response))
        console.log("Ran submitting");
    }

    render() { 
        return (
        <form onSubmit={this.handleSubmit}>
            <label>
            <input type="file" ref={this.fileInput} hidden onChange={this.handleInputFileChange} accept="image/png, image/jpeg"/>
            <button onClick={this.handleButtonClick}>Klicken oder geklcikt werdem</button>
            </label>
            <input type="submit" value="Submit" />
        </form>
        );
    }
}
 
export default ImageUpload;