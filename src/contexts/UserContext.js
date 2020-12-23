import React, { Component, createContext } from "react";
import { Redirect } from "react-router-dom"

export const UserContext = createContext();

const initialState = {
  id: 0,
  first_name: null,
  last_name: null,
  username: null,
  phone_number: null,
  email: null,
  token: "",
  isLoggedIn: false
};

class UserContextProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {...initialState};
  }

  login = userData => {
    this.setState({...userData, isLoggedIn: true });
  };

  logout = () => {
    this.setState({...initialState });
  }

  render() {
    return (
      <UserContext.Provider value={{ ...this.state, login: this.login, logout: this.logout }}>
        {this.props.children}
        {/* {this.state.isLoggedIn ? null : <Redirect to="/Login" />} */}
      </UserContext.Provider>
    );
  }
}

export default UserContextProvider;

// "id": 5,
// "first_name": "elvis",
// "last_name": "doe",
// "username": "elvisdoe",
// "email": "elvis.doe@example.com",
// "phone_number": null,
// "created_on": "2020-07-31T08:13:09.700741Z",
// "modified_on": "2020-07-31T08:13:09.700757Z"