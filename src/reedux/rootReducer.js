import {getPhleboReducer} from "./reducers"
import { combineReducers } from 'redux'

const reducers = combineReducers({
    phleboList : getPhleboReducer
})

export default reducers;