import React, { useEffect } from "react";
import "./App.css";
import Auth from "./components/Auth";
import { useDispatch, useSelector } from 'react-redux';
import Layout from "./components/Layout";
import Notification from './components/Notification';
import { uiActions } from "./store/ui-slice";

function App() {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    const sendRequest = async () => {
      // Sending state as Sending request
      dispatch(uiActions.showNotification(){
        open: true,
        
      })
      try{
        const res = await fetch('https://redux-http-5f762-default-rtdb.firebaseio.com/cartItems.json', {
          method: "PUT",
          body: JSON.stringify(cart),
        });
        const data = await res.json();
        // Send state as Request is successful
      } catch(e){
        // Send state as Error
        console.error(e)
      }
      
    }
    
    sendRequest();
  }, [cart])
  return (
    <div className="App">
      <Notification message="This is a dummy message" type="success"/>
      {!isLoggedIn && <Auth />}
      {isLoggedIn && <Layout />}
    </div>
  );
}

export default App;
