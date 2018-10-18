import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import './userPage.css';

import Nav from '../../components/Nav/Nav';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';

// Instead of taking everything from state, we just want the user info.
const mapStateToProps = state => ({
  user: state.user,
});

class UserPage extends Component {

  state = {
    shelfItems: []
  }
  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    this.getShelfItems();
  }

  // componentDidUpdate runs after props and state have changed.
  //If we arent loading the user call AND we dont have a user, kick us out to home
  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('/home');
    }
  }

  logout = () => {
    this.props.dispatch(triggerLogout());
  }

  getShelfItems = () => {
    axios.get('/api/shelf')
      .then(response => {
        this.setState({
          ...this.state,
          shelfItems: response.data,
        })
        console.log(response);
      }).catch(error => {
        console.log(error)
      })
  }



  render() {
    let content = null;

    if (this.props.user.userName) {
      content = (
        <div>
          <h1
            id="welcome"
          >
            Welcome, {this.props.user.userName}!
          </h1>

          <div className="cardsContainer">
            {this.state.shelfItems.map(item => {
              return (<div className="card" key={item.id}>
                <img className="imgCard" src={item.image_url} />
                <h4>Description:</h4>
                <pre>{item.description}</pre>
                <p>{item.description}</p>
                <button>Delete Item</button>
              </div>)
            })}

          </div>

          <p>Your ID is: {this.props.user.id}</p>
          <button
            onClick={this.logout}
          >
            Log Out
          </button>
        </div>
      );
    }

    return (
      <div>
        <Nav />
        {content}
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(UserPage);

