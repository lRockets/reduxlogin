import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
class App extends Component {
  constructor(props){
    super(props);
    this.state={
      list:[]
    }
  }
  componentDidMount(){
    axios.get('/api/article/list').then(res=>{
      this.setState({
        list:res.data.list
      })
    })
  }
  render() {
    return (
        <div className="container">
          <ul className="list-group">
            { 
              this.state.list.map(item=>
                <li key={item.id} className="list-group-item">
                  <Link className="nav-link" to={`/detail/${item.id}`}>{ item.title }</Link>
                </li>
              )
            }
          </ul>
      	</div>
    );
  }
}


export default App;
