import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { addItem } from '../../redux/actions/addAction';

const mapStateToProps = state => ({
  user: state.user,
});

class InfoPage extends Component {
  //trigger a /user call
  componentDidMount() {
    this.props.dispatch({type: USER_ACTIONS.FETCH_USER});
  }

  // componentDidUpdate runs after props and state have changed.
  //If we arent loading the user call AND we dont have a user, kick us out to home
  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('/home');
    }
  }

  state = { description: '',
            image_url: ''
}

handleClick = (event) => {
  event.preventDefault();
  this.props.dispatch(addItem(this.state))
  this.setState({
    description: '',
    image_url: ''
  })
  
}

handleChangeFor = (input) => (event) => {
    this.setState({
        [input]: event.target.value
      })
  }

    render() {
    let content = null;

    if (this.props.user.userName) {
      content = (
        <div>
          <h1> Shelf Info</h1>
          <div>
            <form onSubmit={this.handleClick}>
            <input value={this.state.description} onChange={this.handleChangeFor('description')} placeholder="description" />
              <input value={this.state.image_url} onChange={this.handleChangeFor('image_url')} placeholder="image" />
              <button>Submit</button>

            </form>
          </div>
        </div>
      );
    }

    return (
      <div>
        <Nav />
        { content }
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(InfoPage);
