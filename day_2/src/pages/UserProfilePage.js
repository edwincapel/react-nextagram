import React,{Component} from "react"
import axios from "axios";

class UserProfilePage extends Component {
  constructor(props){
    super(props)
    this.state = {
      images:[],
      user:[]
    }
  }

  componentDidMount(){
    Promise.all([
      axios.get(`https://insta.nextacademy.com/api/v1/images?userId=${this.props.match.params.id}`),
      axios.get('https://insta.nextacademy.com/api/v1/users')
      ]
    )
    .then((results) => {
      this.setState({
        images: results[0].data,
        user: results[1].data.find(user => user.id === parseInt(this.props.match.params.id))
      })
    });
  }

  render() {
    const {images, user} = this.state
    
    return (
      <>
        <p>{user.id}</p>
        <p>{user.username}</p>
        <img src={user.profileImage} width="80" height="80" alt=""/>
        <h1>User Profile Page</h1>

        {
          images.map((image,index) => 
            <img key={index} src={image} width='200px' height='150px' alt=""/>
          )
        }
      </>
    )
  }
}

export default UserProfilePage
