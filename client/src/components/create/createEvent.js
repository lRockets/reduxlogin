import React, { Component,Fragment } from 'react';
import classnames from 'classnames';
import { add_article }  from '../../actions/createEventsActions';
import Editor from 'for-editor';
import { connect } from 'react-redux';
import shortid from 'shortid';
import { addFlashMessage } from '../../actions/flashMessage';


class CreateEvent extends Component {
    constructor() {
        super()
        this.state = {
            value: '',
            title:''
        }
    }
    componentDidMount(){
        !this.props.auth.isAuthenticated && this.props.history.push('/');
    }
    componentDidUpdate(){
        !this.props.auth.isAuthenticated && this.props.history.push('/');
    }
    handleChange(value) {
        this.setState({
            value
        })
    }
    onChange=(e)=>{
        let { value,name }=e.target;
        this.setState({
            [name]:value
        })
    }
    onSubmit=(e)=>{
        e.preventDefault();
        const html=document.getElementsByClassName('for-markdown-preview')[0].innerHTML;
        
        this.props.add_article({
            id:shortid.generate(),
            title:this.state.title,
            content:html,
            time:new Date().toLocaleDateString()
        }).then(res =>{
            this.props.addFlashMessage({
                type:'success',
                text:'发布成功'
            })
            this.props.history.push('/');
        })
    }
    render() {
        const { value } = this.state
        return (
            <Fragment>
                <div className="form-group">
                    <label className="control-label">标题:</label>
            
                    <input
                        value={ this.state.title }
                        onChange={ this.onChange }
                        type="text"
                        name="title"
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label className="control-label">内容:</label>
            
                    <Editor value={value} lineNum={false} onChange={this.handleChange.bind(this)} />
                </div>
                <button type="button" className="btn btn-primary" onClick={ this.onSubmit } >发布</button>

            </Fragment>
        
        )
    }
}
const mapStateProps=(state)=>{
    return ({
      auth:state.auth
    })
}


export default connect(mapStateProps,{ add_article,addFlashMessage })(CreateEvent);