
import * as React from 'react';
import { Component, SyntheticEvent} from 'react';



class ImageUpload extends React.Component<{}, { imageFile: any, imageCaption: string, foodId: number, caption: string }>{
    constructor(props: any) {
        super(props);
        this.state = {imageFile: '', imageCaption: '', foodId: 0, caption: ''};

        // allows us to handle what happens on change and submit
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputFileChange = this.handleInputFileChange.bind(this);
    }

    handleChange(event: any) {
        this.setState({caption: event.target.value});
    }

    handleInputFileChange(event: any) {
        const image = event.target.files[0];
        if(image.type !== "image/png" && image.type !== "image/jpeg") {
            // reject image
            alert("Image file type not correct. Only png and jpg files are supported at the moment !");
            return;
        }

        this.setState({imageFile: event.target.files[0]});
        console.log("Selected image updated to:", event.target.files[0]);
    }

    handleSubmit(event: any) {
        event.preventDefault();
        console.log("Trying to post image")
        const formData = new FormData();
        formData.append("name", this.state.imageFile.name);
        formData.append("file", this.state.imageFile);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'multipart/form-data' },
            body: formData
        };
        fetch('/4503708662497280/image/', requestOptions)
        .then(response => console.log("POST RESPONSE:", response))
        console.log("Ran submitting");
    }

    render() { 
        return (
            <form onSubmit={this.handleSubmit}>        
            <label>
                Caption:
                <input type="text" value={this.state.caption} onChange={this.handleChange} />        
            </label>
            <label>
                Image:
                <input type="file" onChange={this.handleInputFileChange} accept="image/png, image/jpeg"/>
            </label>
          <input type="submit" value="Submit" />
        </form>
        );
    }
}
 
export default ImageUpload;