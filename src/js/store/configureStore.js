import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import Reducer from '../reducers/index.js'

export default preloadedState => {
    return createStore(
        Reducer,
        preloadedState,
        applyMiddleware(
            thunkMiddleware
        )
    )
}