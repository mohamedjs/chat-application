import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import {combineReducers, Reducer} from 'redux';
import { thunk } from 'redux-thunk';

interface InitState {
    
}

const rootReducer: Reducer<InitState> = combineReducers({
    
});

export default rootReducer;

export const store = configureStore(
    {
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}).prepend(thunk),
    }
)


export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch

