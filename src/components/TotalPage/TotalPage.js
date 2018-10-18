import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../../components/Nav/Nav';
import { fetchTotals } from '../../redux/actions/totalAction';
import { addItem } from '../../redux/actions/addAction';
import Axios from 'axios';

const mapStateToProps = state => ({
  user: state.user,
  userTotal: state.totalReducer
});

class TotalPage extends Component {

  //trigger a /user call
  componentDidMount() {
    this.props.dispatch(fetchTotals());
}

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('/home');
    }
  }

    render() {
    let content = null;

    if (this.props.user.userName) {
      content = (
        <div>
          <h1> Shelf Info</h1>
          <div>
            Total Page
        {this.props.userTotal.map((item) => {
            return (<ul key={item.id}>
            <li>{item.username}: {item.number_of_items}</li>
            </ul>)
            
        })}
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
export default connect(mapStateToProps)(TotalPage);
