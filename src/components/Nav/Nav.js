import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { triggerLogout } from '../../redux/actions/loginActions';

const mapStateToProps = state => ({
  user: state.user,
});

class Nav extends Component {

  logout = () => {
    this.props.dispatch(triggerLogout());
  }

  goToRegister = () => {
    this.props.history.push('/register');
  }

render() {
  return (
    <div className="navbar">
    <div>

      {this.props.user.userName
      ?
      <ul>
      {/* The non-logged in nav */}
          <li>
            <Link to="/user">
              User Home
            </Link>
          </li>
          <li>
            <Link to="/info">
              Info Page
            </Link>
          </li>
          <li>
            <Link to="total">
            Total Page
            </Link>
          </li>
          <li style={{float: "right"}}>
          Logged in as: {this.props.user.userName}
          <br />
          <button
                onClick={this.logout}
              >
                Log Out
              </button>

          </li>
        </ul>
      :
      <ul>
      {/* The non-logged in nav */}
          <li>
            <Link to="/user">
              User Home
            </Link>
          </li>
        <li style={{float: "right"}}>
        <Link to="/register">
          Register            
        </Link>
        </li>
        </ul> 
      }
    </div>
  </div>
  )
}

}

// const Nav = () => (
//   <div className="navbar">
//     <div>
//       <ul>
//         <li>
//           <Link to="/user">
//             User Home
//           </Link>
//         </li>
//         <li>
//           <Link to="/info">
//             Info Page
//           </Link>
//         </li>
//         <li>
//           <Link to="total">
//           Total Page
//           </Link>
//         </li>
//       </ul>
//     </div>
//   </div>
// );

export default connect(mapStateToProps)(Nav);
