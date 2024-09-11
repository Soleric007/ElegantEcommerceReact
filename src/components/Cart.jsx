import React, { useContext } from 'react'
import { CartContext } from '../store/shopping-cart'

const Cart = () => {
    const {items, onUpdateItemQuantity } = useContext(CartContext)
    const totalPrice = items.reduce(
        (acc, item) => acc + item.price * item.quantity, 0 
    )
    const formattedTotalPrice = `$${totalPrice.toFixed(2)}`
    console.log(items)
    return (
        <div>
            {items.length === 0 && <p>No items in cart.</p>}
            
            {items.length > 0 && (
                <ul id='cart-items'>
                    {items.map((item) => {
                        return (
                            <li key={item.id}>
                                <div>
                                    <span>{item.name}</span>
                                    <span>{item.price}</span>
                                    <div className='cart-item-actions'>
                                        <button onClick={() => onUpdateItemQuantity(item.id, -1)}>
                                            -
                                        </button>
                                        <span>
                                            {item.quantity}
                                        </span>
                                        <button onClick={() => onUpdateItemQuantity(item.id, 1)}>
                                            +
                                        </button>
                                    </div>
                                </div>
                            </li>
                        )
                    })}
                </ul>)}
                <p id='cart-total-price'>
                    Cart Total: <strong>{formattedTotalPrice}</strong>
                </p>
        </div>
    )
}

export default Cart
