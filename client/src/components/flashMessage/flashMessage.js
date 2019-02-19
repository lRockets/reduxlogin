import React, { Component } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames';
import { removeMessage } from '../../actions/flashMessage';
class FlashMessage extends Component {
    onClick(id){
        this.props.removeMessage(id)
    }
    render() {
        return (
            <div className="container">
               {
                   this.props.message.map(item=>
                       <div key={item.id} className={classnames('alert',{
                           'alert-success':item.type==='success',
                           'alert-danger':item.type==='danger'
                        })}>
                            {item.text}
                            <div className="close" onClick={this.onClick.bind(this,item.id)}>x</div>
                        </div>
                   )
               }
            </div>
        )
    }
}

const mapStateProps=(state)=>({
    message:state.flashMessage
})


export default connect(mapStateProps,{removeMessage})(FlashMessage);