import { ADD_FLASH_MESSAGE,REMOVE_FLASH_MESSAGE } from '../contants';
export const addFlashMessage = (message) => ({
    type: ADD_FLASH_MESSAGE,
    message
})

export const removeMessage = (id) => ({
    type: REMOVE_FLASH_MESSAGE,
    id
})

