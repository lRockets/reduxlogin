import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import validateInput  from '../../untils/validator/login';
import { withRouter } from 'react-router-dom';
import { login } from '../../actions/loginActions'; 
import { addFlashMessage } from '../../actions/flashMessage';
class Login extends Component {
	constructor(props){
		super(props);
		this.state={
			identifier:'',
			password:'',
			isLoading:false,
			errors:{}
		}
	}
	onChange=(e)=>{
		let { value,name }=e.target;
		this.setState({
			[name]:value
		})
	}
	isValid(){
		let { errors,isValid }=validateInput(this.state);
		if(!isValid){
			this.setState({
				errors
			})
		}
		return isValid;
	}
	onSubmit=(e)=>{
		e.preventDefault();
		// this.isValid();
		if(this.isValid()){
			this.setState({
				errors:{},
				isLoading:true
			})

			this.props.login(this.state).then(
				(res) => {
					this.props.addFlashMessage({
						type:'success',
						text:'登录成功！'
					})
					this.props.history.push('/');
				},
				(err) => this.setState({ errors: err.response.data.errors, isLoading: false })
			  );
		}
	}
    render() {
		const { errors, identifier, password, isLoading } = this.state;
		return (
		  	<form onSubmit={ this.onSubmit }>
				<h1>登录</h1>
	
			{ errors.form && <div className="alert alert-danger">{ errors.form }</div> }
	
				<div className="form-group">
					<label className="control-label">用户名 / 邮箱:</label>
			
					<input
						value={ identifier }
						onChange={ this.onChange }
						type="text"
						name="identifier"
						className={ classnames('form-control', { 'is-invalid': errors.identifier }) }
					/>
					{ errors.identifier && <span className='form-text text-muted'>{ errors.identifier }</span> }
				</div>
		
				<div className="form-group">
					<label className="control-label">密码:</label>
			
					<input
						value={ password }
						onChange={ this.onChange }
						type="password"
						name="password"
						className={ classnames('form-control', { 'is-invalid': errors.password }) }
					/>
					{ errors.password && <span className='form-text text-muted'>{ errors.password }</span> }
				</div>
	
				<div className="form-group">
					<button disabled={ isLoading } className="btn btn-primary btn-lg">
						Login
					</button>
				</div>
		  </form>
		);
	}
}

export default connect(null,{ login,addFlashMessage })(Login) ;
