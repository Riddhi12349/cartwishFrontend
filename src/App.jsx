import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Routing from "./components/Routing/Routing";
import { getUser, getJwt } from "./components/services/useServices";
import setAuthToken from "./components/utils/setAuthToken";
import "react-toastify/dist/ReactToastify.css";
import {
  addToCartAPI,
  getCartAPI,
  removeFromCartAPI,
  increaseProductAPI,
  decreaseProductAPI,
} from "./components/services/cartServices";
import UserContext from "./components/Contexts/UserContext";
import CartContext from "./components/Contexts/CartContext";

setAuthToken(getJwt());

const App = () => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    try {
      const jwtUser = getUser();

      //  console.log(jwtUser);
      //----setting up the expiration time of the token
      if (Date.now() >= jwtUser.exp * 1000) {
        localStorage.removeItem("token");
        setUser(null);
        location.reload();
      } else {
        setUser(jwtUser);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const addToCart = (product, quantity) => {
    const oldCart = [...cart];
    const updatedCart = [...cart];
    const productIndex = updatedCart.findIndex(
      (item) => item.product._id === product._id
    );
    if (productIndex === -1) {
      updatedCart.push({ product: product, quantity: quantity });
    } else {
      updatedCart[productIndex].quantity += quantity;
    }

    setCart(updatedCart);
    addToCartAPI(product._id, quantity)
      .then((res) => {
        // console.log(res.data);
        toast.success("Product Added Successfully!");
      })
      .catch((err) => {
        // console.log(err.response);
        toast.error("Failed to Add Product");
        setCart(cart);
      });
  };

  const updateCart = (type, id) => {
    const oldCart = [...cart];
    const updatedCart = [...cart];
    const productIndex = updatedCart.findIndex(
      (item) => item.product._id === id
    );

    if (type === "increase") {
      updatedCart[productIndex].quantity += 1;
      setCart(updatedCart);

      increaseProductAPI(id).catch((err) => {
        toast.error("Something went wrong!");
        setCart(oldCart);
      });
    }

    if (type === "decrease") {
      updatedCart[productIndex].quantity -= 1;
      setCart(updatedCart);

      decreaseProductAPI(id).catch((err) => {
        toast.error("Something went wrong!");
        setCart(oldCart);
      });
    }
  };
  const getCart = () => {
    getCartAPI()
      .then((res) => {
        setCart(res.data);
      })
      .catch((err) => {
        toast.error("Something went wrong!");
      });
  };

  useEffect(() => {
    if (user) {
      getCart();
    }
  }, [user]);

  const removeFromCart = (id) => {
    const oldCart = [...cart];
    const newCart = oldCart.filter((item) => item.product._id !== id);
    setCart(newCart);

    removeFromCartAPI(id).catch((err) => {
      toast.error("Something went wrong!");
      setCart(oldCart);
    });
  };

  return (
    <UserContext.Provider value={{ user }}>
      <CartContext.Provider
        value={{ addToCart, cart, removeFromCart, updateCart, setCart }}
      >
        <div className="app">
          <Navbar cartCount={cart.length} />
          <main>
            <ToastContainer position="bottom-right" />
            <Routing />
          </main>
        </div>
      </CartContext.Provider>
    </UserContext.Provider>
  );
};

export default App;
