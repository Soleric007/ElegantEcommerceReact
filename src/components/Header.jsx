import React, { useContext, useRef } from 'react'
import CartModal from './CartModal'
import { CartContext } from '../store/shopping-cart'

const Header = () => {
    const { items } = useContext(CartContext)
    const modal = useRef()
    const handleCartClick = () => {
        modal.current.showModal()
    }
    const cartQuantity = items.length
    let modalActions = <button>
        Close
    </button>
    if (cartQuantity > 0) {
        modalActions = (
            <>
            <button>Close</button>
            <button>Checkout</button>
            </>
        )
    }
  return (
    <>
    <CartModal title="Your Cart" actions={modalActions} ref={modal} />
        <header id='main-header'> 
            <div id='main-title'>
                <img src="logo.png" alt="logo" />
                <h1>
                    ELEGANT CLOTHING
                </h1>
            </div>
            <p>
                <button onClick={handleCartClick}>
                    Cart({items.length})
                </button>
            </p>
        </header>
    </>
  )
}

export default Header
