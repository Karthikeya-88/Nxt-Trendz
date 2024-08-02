import CartContext from '../../context/CartContext'
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
          <button type="button" className="shop-now-btn">
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
