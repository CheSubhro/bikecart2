
import React, { createContext, useContext, useReducer } from 'react';

const AppContext = createContext();

const appReducer  = (state, action) => {

    switch (action.type) {
        case 'ADD_TO_CART':
            const newItem = {
                ...action.payload,
                quantity: 1,
              };
              return { ...state, cart: [...state.cart, newItem] };
    
        case 'INCREASE_QUANTITY':
            return {
                ...state,
                cart: state.cart.map(item =>
                item._id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
                ),
        };
    
        case 'DECREASE_QUANTITY':
            return {
                ...state,
                cart: state.cart.map(item =>
                item._id === action.payload && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
                ),
        };
    
        case 'REMOVE_FROM_CART':
              return { ...state, cart: state.cart.filter(item => item._id !== action.payload) };
    
        case 'LOGIN':
            return { ...state, user: action.payload };
    
        case 'LOGOUT':
            return { ...state, user: null };	

        default:
            return state;
    }
  };

export const AppProvider  = ({ children }) => {
    const [state, dispatch] = useReducer(appReducer, { cart: [], user: null });

    const addToCart = (item) => {
        dispatch({ type: 'ADD_TO_CART', payload: item });
    };

    const increaseQuantity = (itemId) => {
        dispatch({ type: 'INCREASE_QUANTITY', payload: itemId });
    };
    
    const decreaseQuantity = (itemId) => {
        dispatch({ type: 'DECREASE_QUANTITY', payload: itemId });
    };

    const removeFromCart = (itemId) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: itemId });
    };

    const login = (userData) => {
        dispatch({ type: 'LOGIN', payload: userData });
    };
    
    const logout = () => {
        dispatch({ type: 'LOGOUT' });
    };

    return (
        <AppContext.Provider value={{ ...state, addToCart, increaseQuantity, decreaseQuantity, removeFromCart, login, logout }}>
              {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
      throw new Error('useAppContext must be used within a AppProvider');
    }
    return context;
};

