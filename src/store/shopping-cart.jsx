import React, { createContext, useReducer } from "react";
import { DUMMY_PRODUCTS } from "../dummy-products";
import { useState } from "react";

export const CartContext = createContext({
    items: [],
    addToCart: () => {},
    onUpdateItemQuantity: ()=> {}
})

function shoppingCartReducer(state, action){
    if (action.type === 'ADD_ITEM'){
        const updatedItems = [...state.items]

        const existingItemIndex = updatedItems.findIndex((item) => {
            return item.id === action.payload.id
          })

        const existingItem = updatedItems[existingItemIndex];
          
        if (existingItem) {
            const newItem = {
              ...existingItem,
              quantity: existingItem.quantity + 1
            }
            // Replaces the existing item in the updatedItems array with the newItem
            updatedItems[existingItemIndex] = newItem
          } else {
            const product = DUMMY_PRODUCTS.find((product) => {
              return product.id === action.payload.id
            })
  
            updatedItems.push(
              {
                id: action.payload.id,
                name: product.title,
                price: product.price,
                quantity: 1
              }


            )
          }
          return {
            items: updatedItems
          }
    }

    if (action.type === 'UPDATE_ITEM_QUANTITY'){
        const updatedItems =[...state.items]
        const updatedItemIndex = updatedItems.findIndex(
          (item) => item.id === action.payload.productId
        )
  
        const updatedItem = {
          ...updatedItems[updatedItemIndex]
        }
  
        updatedItem.quantity += action.payload.amount
  
        if (updatedItem.quantity <= 0) {
          updatedItems.splice(updatedItemIndex, 1)
        } else {
          updatedItems[updatedItemIndex] = updatedItem
        }
        return {
          items: updatedItems
        }
    }

}

function name(params) {
    
}

const CartContextProvider = ({children}) => {
    const [shoppingCartState, shoppingCartDispatch] = useReducer(shoppingCartReducer, {items: []})
    
    
    function handleAddToCart(id){
       shoppingCartDispatch({
        type: 'ADD_ITEM',
        payload: { id }
       })
    }
    function onUpdateItemQuantity(productId, amount){
      shoppingCartDispatch({
        type: 'UPDATE_ITEM_QUANTITY',
        payload: { productId, amount }
      })
    }
  
    const ctxValue = {
      items: shoppingCartState.items,
      onUpdateItemQuantity: onUpdateItemQuantity,
      addToCart: handleAddToCart,
      
    }
    return (
        <CartContext.Provider value={ctxValue}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContextProvider