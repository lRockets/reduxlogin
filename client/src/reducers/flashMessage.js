import { ADD_FLASH_MESSAGE,REMOVE_FLASH_MESSAGE} from '../contants';
import shortid from 'shortid';

const flashMessage=(state=[],action)=>{
    switch(action.type){
        case ADD_FLASH_MESSAGE:
            return [
                ...state,
                {
                    id:shortid.generate(),
                    type:action.message.type,
                    text:action.message.text
                }
            ]
        case REMOVE_FLASH_MESSAGE:
            return state.filter(item=>item.id !== action.id)
        default:
            return state;
    }
}

export default flashMessage;