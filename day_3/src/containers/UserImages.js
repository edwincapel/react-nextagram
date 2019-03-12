import React from 'react'
import axios from 'axios'
import {Col} from 'reactstrap'
import Loader from '../components/Loader'
import Image from "react-graceful-image"

export default class UserImages extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            userImages: [],
            isLoading: true
        }
    }

    componentDidMount(){
        axios.get(`https://insta.nextacademy.com/api/v1/images?userId=${this.props.userID}`)
        .then(({data}) => {
            this.setState({   
                userImages: data,
                isLoading:false
            })
        
        })
        .catch(error => {
            console.log('ERROR: ', error); 
        })
    }

    render(){

        const {userImages,isLoading} = this.state
        
        return(
            <Col md="9">
                {
                    isLoading
                        ? <Loader/>
                        : userImages.map((image,index) =>
                            <div key={index} className="d-inline-block">
                                <Image
                                    src={image}
                                    width="225"
                                    height="200"
                                    alt="My awesome image"
                                    placeholderColor="#fff"
                                    className="p-2"
                                /> 
                            </div>
                        )
                }
            </Col>
        )
    }
}


