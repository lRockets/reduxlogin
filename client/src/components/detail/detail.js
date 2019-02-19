import React, { Component,Fragment } from 'react'
import axios from 'axios';

export default class Detail extends Component {
    constructor(props){
        super(props);
        this.state={
            detail:''
        }
    }
    componentDidMount(){
        axios.get(`/api/article/detail/${this.props.match.params.id}`).then(res=>{
            this.setState({
                detail:res.data.data[0]
            })
        });
    }
    render() {        
        return (
            <Fragment>
               <div className="detail_box">
                    <div className="title">{this.state.detail.title} <span>{this.state.detail.time}</span></div>
                    <div className="detail_con" dangerouslySetInnerHTML={{__html:this.state.detail.content}}></div>
                    {this.state.detail.title && <button type="button" className="btn btn-primary" onClick={()=>{this.props.history.push('/')}} >返回上一页</button>}
                </div>
            </Fragment>
        )
    }
}
