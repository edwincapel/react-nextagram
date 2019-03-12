import React, {Component} from 'react'
import axios from 'axios'
import Loader from '../components/Loader'
import UserImages from '../containers/UserImages'
import {Container, Row, Col} from 'reactstrap'
import Image from "react-graceful-image";
import {Link} from 'react-router-dom'

const imageStyle = {
    borderRadius : '50%'
}

export default class HomePage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            users: [],
            isLoading: true
        }
    }

    componentDidMount() {
    // performing a GET request to '/api-end-point'
    axios.get('https://insta.nextacademy.com/api/v1/users')
        .then(result => {
            // If successful, we do stuffs with 'result'
            this.setState({
                users: result.data,
                isLoading: false
            })
        })
        .catch(error => {
            // If unsuccessful, we notify users what went wrong
            console.log('ERROR: ', error)
        })
    }
      
    render(){
        const {users,isLoading} = this.state

        if(isLoading){
            return(
                <Loader/>
            )
        }
        return(            
            <Container>
            {
                users.map(user =>
                <Row key={user.id} className="mb-3 border-bottom">
                    <Col md="3 mt-2 d-flex align-items-center flex-column">
                        <Link to={`/users/${user.id}`} className="d-flex align-items-center flex-column">
                            <Image
                                src={user.profileImage}
                                width="100"
                                height="100"
                                alt="My awesome image"
                                placeholderColor="#fff"
                                style={imageStyle}
                            />
                            <p className="mt-1 text-dark">{user.username}</p>
                        </Link>
                    </Col>
                    <UserImages userID = {user.id}/>
                </Row>
                )
            }
            </Container>
        )
    }
}


