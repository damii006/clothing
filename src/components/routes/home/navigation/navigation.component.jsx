 
import { Fragment, useContext } from 'react';
import {Outlet, Link} from 'react-router-dom'
import CartIcon from '../../../cart-icon/cart-icon.component';
import {  UserContext  } from '../../../../contexts/user.contexts'
import CartDropdown from '../../../cart-dropdown/cart-dropdown.component';
import { CartContext, CartProvider } from '../../../../contexts/carts.context';
import { ReactComponent as DamilolasLogo } from '../../../../assets/crown.svg';
import { signOutUser } from '../../../../utils/firebase/firebase.utils';
import {NavigationContainer, NavLinks, NavLink, LogoContainer} from './navigation.styles';

const Navigation = () => {
  const {  currentUser  } = useContext (UserContext);
  const { isCartOpen } = useContext(CartContext);
  
  return (
      <Fragment>
        <NavigationContainer>
          <LogoContainer to='/'>
            <DamilolasLogo className='logo'/>
          </LogoContainer >
          <NavLinks>
            <NavLink to ='/shop'>
              SHOP
            </NavLink>
            {currentUser ?  (
              <NavLink as='span' onClick={signOutUser}>
                SIGN OUT
                </NavLink>
            ) :  (
              <NavLink to= 'auth'>
                SIGN IN 
              </NavLink>
            )}
            <CartIcon/>
          </NavLinks>
          {isCartOpen && <CartDropdown/>}
        </NavigationContainer>
        <Outlet/>
      </Fragment>
    ) 
  }

  export default Navigation;