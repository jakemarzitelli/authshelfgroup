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

  state = {
    editShow: false,
    currentItemToEdit: {},
  }

  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    this.props.dispatch({ type: SHELF_VIEW_ACTIONS.FETCH_ITEMS })
  }

  logout = () => {
    this.props.dispatch(triggerLogout());
  }

  deleteItem = (item) => {
    this.props.dispatch({ type: SHELF_VIEW_ACTIONS.DELETE_ITEM, payload: item })
  }

  editItemModal = (item) => {
    //true is important here!
    window.addEventListener('click', this.exitEditModal, true);
    this.setState({
      editShow: true,
      currentItemToEdit: item,
    })
    console.log(item, this.state); 
  }

  exitEditModal = (event) => {
    if (event.target.classList.contains('modal') || event.target.classList.contains('editExitButton')){
      this.setState({
        editShow: false,
        currentItemToEdit: {},
      })
      window.removeEventListener('click', this.exitEditModal, true)
      console.log("in exit modal", this.state); 
    } 
  }

  changeItemDescription = (event) => {
    event.preventDefault();
    this.props.dispatch({
      type: SHELF_VIEW_ACTIONS.EDIT_ITEM, 
      payload: { ...this.state.currentItemToEdit} 
      })
    console.log(this.state.currentItemToEdit)
  }

  changeItemImgUrl = (event) => {
    event.preventDefault();
    this.props.dispatch({
      type: SHELF_VIEW_ACTIONS.EDIT_ITEM, 
      payload: { ...this.state.currentItemToEdit }
     })
    console.log(this.state.currentItemToEdit)
  }

//WORK ON THIS!
  handleChange = (event) => {
    this.setState({
      currentItemToEdit:{
        ...this.state.currentItemToEdit,
        [event.target.name]: event.target.value,
      }
    })
    console.log(this.state);
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
                <button onClick={() => this.editItemModal(item)}>Edit Item</button>
              </div>)
            })}

          </div>

          <p>Your ID is: {this.props.user.id}</p>
          <button
            onClick={this.logout}
          >
            Log Out
          </button>
          { this.state.editShow && 
          <div id="id01" className="modal">
            <div className="modal-content">
            <form>
              <label> Edit Image URL:
                <input onChange={this.handleChange} name="image_url" value={this.state.currentItemToEdit.image_url} placeholder="Image URL" />
              </label>
              <button onClick={this.changeItemImgUrl}>Submit Image Change</button>
            </form>
            <form>
              <label> Edit Description:
                <input onChange={this.handleChange} name="description" value={this.state.currentItemToEdit.description} placeholder="Description" />
              </label>
              <button onClick={this.changeItemDescription}>Submit Description Change</button>
              </form>
              <div>
              <button className="editExitButton">Exit</button>
              </div>
            </div>
          </div>
          }
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

