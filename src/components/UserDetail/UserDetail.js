import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../../components/Nav/Nav';
import { fetchTotals } from '../../redux/actions/totalAction';
import { addItem } from '../../redux/actions/addAction';
import axios from 'axios';
import './UserDetail.css'

const mapStateToProps = state => ({
  user: state.user,
  userTotal: state.totalReducer
});

class UserDetail extends Component {

  state = {
    user: {
      id: "",
      username: "",
      items: []
    }
  }

  //trigger a /user call
  componentDidMount() {
    axios({
        method: 'GET',
        url: `/api/userDetail/${this.props.match.params.id}`
    }).then(response => {
      console.log(response.data);
      this.setState({
        user:response.data[0]
      })
    })
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
          <h1> User's Shelf Items</h1>
          <div className="cardsContainers">
          {this.state.user.items.map((item) => {
            
            return (
            <div className="card" key={item.id}>
            <img className="imgCard" src={item.image_url}/>

                <h2>Description: <p>{item.description}</p></h2>
            </div>
            )   
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
export default connect(mapStateToProps)(UserDetail);
