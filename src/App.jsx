import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Routing from "./components/Routing/Routing";
import { jwtDecode } from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { getJwt, getUser } from "./Services/userServices";
import {
  addToCartAPI,
  decreaseProductAPI,
  getCartAPI,
  increaseProductAPI,
  removeFromCartAPI,
} from "./Services/cartServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserContext from "./contexts/UserContext";
import CartContext from "./contexts/CartContext";

setAuthToken(getJwt());
const App = () => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    try {
      const jwt = localStorage.getItem("token");
      const jwtUser = jwtDecode(jwt);
      if (Date.now() >= jwtDecode.exp * 1000) {
        localStorage.removeItem("token");
        location.reload();
      } else {
        setUser(jwtUser);
      }
    } catch (error) {}
  }, []);

  const addToCart = useCallback(
    (product, quantity) => {
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
          toast.success("Product Added Successfully ");
        })
        .catch((err) => {
          toast.error(" Failed To Add Product ");
          setCart(cart);
        });
    },
    [cart]
  );

  const getCart = useCallback(() => {
    getCartAPI()
      .then((res) => {
        setCart(res.data);
      })
      .catch((err) => {
        toast.error("Something Went Wrong!");
      });
  }, [user]);

  const removeFromCart = useCallback(
    (id) => {
      const oldCart = [...cart];
      const newCart = oldCart.filter((item) => item.product._id !== id);
      setCart(newCart);
      removeFromCartAPI(id)
        .then((res) => {
          toast.success("Product Removed Successfully");
        })
        .catch((err) => {
          toast.error("Something Went Wrong!");
          setCart(oldCart);
        });
    },
    [cart]
  );

  const updatedCart = useCallback(
    (type, id) => {
      const oldCart = [...cart];
      const updatedCart = [...cart];
      const productIndex = updatedCart.findIndex(
        (item) => item.product._id === id
      );

      if (type === "increase") {
        updatedCart[productIndex].quantity += 1;
        setCart(updatedCart);
        increaseProductAPI(id)
          .then((res) => {
            toast.success(" Quantity Updated! ");
          })
          .catch((err) => {
            toast.error("Something went wrong in quantity");
            setCart(oldCart);
          });
      }
      if (type === "decrease") {
        updatedCart[productIndex].quantity -= 1;
        setCart(updatedCart);
        decreaseProductAPI(id)
          .then((res) => {
            toast.success(" Quantity Updated! ");
          })
          .catch((err) => {
            toast.error("Something went wrong in quantity");
            setCart(oldCart);
          });
      }
    },
    [cart]
  );

  useEffect(() => {
    if (user) {
      getCart();
    }
  }, [user]);

  return (
    <UserContext.Provider value={user}>
      <CartContext.Provider
        value={{ cart, addToCart, removeFromCart, updatedCart, setCart }}
      >
        <div className="app">
          <Navbar />
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
