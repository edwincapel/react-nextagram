import React, { Component } from 'react'
import HomePage from './pages/HomePage'
import { Switch,Route } from 'react-router-dom'
import UserProfilePage from './pages/UserProfilePage'
import Navbar from './containers/NavBar'
import './App.css';

class App extends Component {
  render() {
    return (
      <>
        <Navbar />
        <Switch>
          <Route path="/users/:id" 
            component = { props => 
                    {
                      return (
                        <UserProfilePage 
                          {...props}
                        />
                      )
                    }
            }
          />
          <Route path="/" 
            component = { props => 
                    {
                      return (
                        <HomePage 
                          {...props}
                        />
                      )
                    }
            }
          />
        </Switch>
      </>
    );
  }
}

export default App;
