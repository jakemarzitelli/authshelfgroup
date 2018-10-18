import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import './userPage.css';

import Nav from '../../components/Nav/Nav';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import { SHELF_VIEW_ACTIONS } from '../../redux/actions/shelfViewActions'
import { triggerLogout } from '../../redux/actions/loginActions';

// Instead of taking everything from state, we just want the user info.
const mapStateToProps = state => ({
  user: state.user,
  items: state.shelfView,
});

class UserPage extends Component {

  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    this.props.dispatch({ type: SHELF_VIEW_ACTIONS.FETCH_ITEMS})
  }

  // componentDidUpdate runs after props and state have changed.  

  logout = () => {
    this.props.dispatch(triggerLogout());
  }

  deleteItem = (item) => {
    this.props.dispatch({type: SHELF_VIEW_ACTIONS.DELETE_ITEM, payload: item})
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
            {this.props.items.map(item => {
              return (<div className="card" key={item.id}>
                <img className="imgCard" src={item.image_url} />
                <h4>Description:</h4>
                <pre>{item.description}</pre>
                <p>{item.description}</p>
                <button onClick={() => this.deleteItem(item)}>Delete Item</button>
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
    } else {
      content = (
        <div>
          <h1
            id="welcome"
          >
            Welcome Stranger!
          </h1>

          <div className="cardsContainer">
            {this.props.items.map(item => {
              return (<div className="card" key={item.id}>
                <img className="imgCard" src={item.image_url} />
                <h4>Description:</h4>
                <pre>{item.description}</pre>
                <p>{item.description}</p>
              </div>)
            })}

          </div>
        </div>
      )
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

