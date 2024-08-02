import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  addCartItem = product => {
    const {cartList} = this.state
    //   TODO: Update the code here to implement addCartItem
    const productOrder = cartList.find(each => each.id === product.id)
    if (productOrder) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(each => {
          if (productOrder.id === each.id) {
            const updateQuantity = each.quantity + product.quantity
            return {...each, quantity: updateQuantity}
          }
          return each
        }),
      }))
    } else {
      const updateCartList = [...cartList, product]
      this.setState({cartList: updateCartList})
    }
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const removedOrder = cartList.filter(each => each.id !== id)
    this.setState({cartList: removedOrder})
  }

  incrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(each => {
        if (id === each.id) {
          const changeQuantity = each.quantity + 1
          return {...each, quantity: changeQuantity}
        }
        return each
      }),
    }))
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const product = cartList.find(each => each.id === id)
    if (product.quantity > 1) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(each => {
          if (id === each.id) {
            const changeQuantity = each.quantity - 1
            return {...each, quantity: changeQuantity}
          }
          return each
        }),
      }))
    }
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
