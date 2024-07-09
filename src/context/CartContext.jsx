import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(storedCartItems);
    updateTotalCountsAndPrice(storedCartItems);
  }, []);

  const updateTotalCountsAndPrice = (items) => {
    let totalPrice = 0;

    items.forEach((item) => {
      totalPrice += item.count * item.price;
    });

    setTotalPrice(totalPrice);

    console.log(totalPrice);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    localStorage.setItem("totalPrice", JSON.stringify(totalPrice));
  };

  const addToCart = (product) => {
    const itemIndex = cartItems.findIndex((item) => item.id === product.id);

    if (itemIndex !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[itemIndex].count++;
      setCartItems(updatedCartItems);
      updateTotalCountsAndPrice(updatedCartItems);
    } else {
      const newItem = {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        imageUrl: product.imageUrl,
        count: 1,
      };
      setCartItems([...cartItems, newItem]);
      updateTotalCountsAndPrice([...cartItems, newItem]); 
    }
  };

  const removeFromCart = (productId) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedCartItems);
    updateTotalCountsAndPrice(updatedCartItems); 
  };

  const incrementItem = (productId) => {
    const updatedCartItems = [...cartItems];
    const itemIndex = updatedCartItems.findIndex(
      (item) => item.id === productId
    );

    if (itemIndex !== -1) {
      updatedCartItems[itemIndex].count++;
      setCartItems(updatedCartItems);
      updateTotalCountsAndPrice(updatedCartItems);
    }
  };

  const decrementItem = (productId) => {
    const updatedCartItems = [...cartItems];
    const itemIndex = updatedCartItems.findIndex(
      (item) => item.id === productId
    );

    if (itemIndex !== -1 && updatedCartItems[itemIndex].count > 1) {
      updatedCartItems[itemIndex].count--;
      setCartItems(updatedCartItems);
      updateTotalCountsAndPrice(updatedCartItems); 
    }
  };

  const clearCart = () => {
    setCartItems([]);
    setTotalPrice(0);
    localStorage.removeItem("cartItems");
    localStorage.removeItem("totalPrice");
  };

  const cartContextValue = {
    cartItems,
    totalPrice,
    addToCart,
    removeFromCart,
    incrementItem,
    decrementItem,
    clearCart,
  };

  return (
    <CartContext.Provider value={cartContextValue}>
      {children}
    </CartContext.Provider>
  );
};
