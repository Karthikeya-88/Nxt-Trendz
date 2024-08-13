import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import CartContext from '../../context/CartContext'
import Payment from '../Payment'

import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      let total = 0
      cartList.forEach(each => {
        total += each.price * each.quantity
      })

      return (
        <div className="CartSummary">
          <h1 className="summaryHead">
            <span className="summarySpan">Order Total:</span> Rs {total}/-
          </h1>
          <p className="summaryDes">{cartList.length} Items in cart</p>
          <Popup
            modal
            trigger={
              <button type="button" className="shop-now-btn">
                Checkout
              </button>
            }
          >
            {close => <Payment close={close} />}
          </Popup>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
