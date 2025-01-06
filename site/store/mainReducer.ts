import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { combineReducers, Reducer } from 'redux';
import { thunk } from 'redux-thunk';
import { countriesApi } from './api/countriesApi';

interface InitState {
    [countriesApi.reducerPath]: ReturnType<typeof countriesApi.reducer>;
}

const rootReducer: Reducer<InitState> = combineReducers({
    [countriesApi.reducerPath]: countriesApi.reducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({serializableCheck: false})
            .concat(countriesApi.middleware)
            .prepend(thunk),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
