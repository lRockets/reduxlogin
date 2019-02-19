import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { userSignupRequest } from '../actions/signupActions';
import { logout } from '../actions/loginActions';
import { addFlashMessage } from '../actions/flashMessage';
class NavigationBar extends Component {
  logOut=()=>{
    this.props.logout();
    this.props.addFlashMessage({
      type:'success',
      text:'退出成功'
    })
  }
  render() {
    const {isAuthenticated }=this.props.auth;
    const loginBox=(
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link" to="/signup">注册</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">登录</Link>
        </li>
      </ul>
    );

    const loginOutBox=(
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link" to="/create">写文章</Link>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="javascript:void(0)" > 欢迎:{this.props.auth.user.username}</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="javascript:void(0)" onClick={this.logOut}> 退出</a>
        </li>
      </ul>
    );
    
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-3">
        <div className="container">
          <Link className="navbar-brand" to="/">文章列表</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample05" aria-controls="navbarsExample05" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarsExample05">
            <ul className="navbar-nav mr-auto">
              {isAuthenticated ? loginOutBox:loginBox}
  
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateProps=(state)=>{
  return ({
    auth:state.auth
  })
}
export default connect(mapStateProps,{ logout,addFlashMessage })(NavigationBar);