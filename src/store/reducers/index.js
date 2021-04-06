import { combineReducers } from "redux";
import boardReducer from './boardReducer'

const reducer = combineReducers({
    boards: boardReducer
})

export default reducer