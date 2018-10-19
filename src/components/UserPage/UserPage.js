import React, { Component } from 'react';
import { connect } from 'react-redux';
import './userPage.css';

import Nav from '../../components/Nav/Nav';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import { SHELF_VIEW_ACTIONS } from '../../redux/actions/shelfViewActions'

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
    if (event.target.classList.contains('modal') 
      || event.target.classList.contains('editExitButton')){
      this.triggerExit();
    } else if (event.target.classList.contains('submitChangeButton')){
      this.dispatchEditItem(event)
      this.triggerExit();
    }
  }

  triggerExit = () => {
    this.setState({
      editShow: false,
      currentItemToEdit: {},
    })
    window.removeEventListener('click', this.exitEditModal, true)
    console.log("in exit modal", this.state); 
  }

  dispatchEditItem = (event) => {
    event.preventDefault();
    this.props.dispatch({
      type: SHELF_VIEW_ACTIONS.EDIT_ITEM, 
      payload: { ...this.state.currentItemToEdit} 
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
              return (<div className="cardUser" key={item.id}>
                <div className="imgDiv">
                <img className="imgCardContent" alt-text="Imgae" src={item.image_url} />
                </div>
                <div className="cardTextDiv">
                <h4 className="cardText">Description:</h4>
                </div>
                <div className="cardTextDiv">
                <p className="cardText">{item.description}</p>
                </div>
                <div className="cardButtonDiv">
                <button className="cardButton" onClick={() => this.editItemModal(item)}>Edit Item</button>
                <button className="cardButton" onClick={() => this.deleteItem(item)}>Delete Item</button>
                </div>
              </div>)
            })}

          </div>

          { this.state.editShow && 
          <div id="id01" className="modal">
            <div className="modal-content">
            <form>
              <label> Edit Image URL:
                <input onChange={this.handleChange} name="image_url" value={this.state.currentItemToEdit.image_url} placeholder="Image URL" />
              </label>
              <button onClick={this.dispatchEditItem} className="submitChangeButton">Submit Image Change</button>
            </form>
            <form>
              <label> Edit Description:
                <input onChange={this.handleChange} name="description" value={this.state.currentItemToEdit.description} placeholder="Description" />
              </label>
              <button onClick={this.dispatchEditItem} className="submitChangeButton">Submit Description Change</button>
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

