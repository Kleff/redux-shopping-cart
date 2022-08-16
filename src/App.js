import React, { useEffect } from "react";
import "./App.css";
import Auth from "./components/Auth";
import { useDispatch, useSelector } from 'react-redux';
import Layout from "./components/Layout";
import Notification from './components/Notification';
import { uiActions } from "./store/ui-slice";

let isFirstRender = true;

function App() {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const notification = useSelector(state => state.ui.notification);
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  
  useEffect(() => {
    if(isFirstRender){
      isFirstRender = false;
      return;
    }
    const sendRequest = async () => {

      dispatch(uiActions.showNotification({
        open: true,
        message: "Sending Request",
        type: "warning"
      }));

      try{
        await fetch('https://redux-http-5f762-default-rtdb.firebaseio.com/cartItems.json', {
          method: "PUT",
          body: JSON.stringify(cart),
        });
        
        dispatch(uiActions.showNotification({
          open: true,
          message: "Sent Request to Database Successfully",
          type: "success"
        }));

      } catch(e){
        dispatch(uiActions.showNotification({
          open: true,
          message: "Sending Request fail",
          type: "error"
        }));
        console.error(e)
      }
    }
    
    sendRequest();
  }, [cart])
  return (
    <div className="App">
      {notification && <Notification message={notification.message} type={notification.type} />}
      {!isLoggedIn && <Auth />}
      {isLoggedIn && <Layout />}
    </div>
  );
}

export default App;
