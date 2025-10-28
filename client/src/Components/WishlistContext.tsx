import React, { createContext, useContext, useEffect, useState } from "react";

// Define the shape of the wishlist context
interface WishlistContextType {
  wishlist: { [key: string]: boolean }; // Object to track wishlist items by their IDs
  addToWishlist: (id: string) => void; // Function to add an item to the wishlist
  removeFromWishlist: (id: string) => void; // Function to remove an item from the wishlist
  itemCount: number; // Property to track the number of items in the wishlist
}

// Create the context with an undefined initial value
const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

// Provider component to wrap around the application
export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlist, setWishlist] = useState<{ [key: string]: boolean }>({});
  const [isInitialized, setIsInitialized] = useState(false);

  // Load wishlist from localStorage on first render
  useEffect(() => {
    const storedWishlist = localStorage.getItem("wishlist");
    if (storedWishlist) {
      try {
        const parsedWishlist = JSON.parse(storedWishlist);
        if (parsedWishlist && typeof parsedWishlist === "object") {
          setWishlist(parsedWishlist);
        }
      } catch (e) {
        console.warn("Failed to parse wishlist from localStorage", e);
      }
    }
    setIsInitialized(true); // <- Done loading
  }, []);

  // Save wishlist to localStorage when it changes
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }
    
  }, [wishlist, isInitialized]);

  // Function to add an item to the wishlist
  const addToWishlist = (id: string) => {
    setWishlist((prevWishlist) => ({
      ...prevWishlist,
      [id]: true, // Mark the item as in the wishlist
    }));
  };

  // Function to remove an item from the wishlist
  const removeFromWishlist = (id: string) => {
    setWishlist((prevWishlist) => {
      const newWishlist = { ...prevWishlist };
      delete newWishlist[id]; // Remove the item from the wishlist
      return newWishlist;
    });
  };

  // Calculate the number of items in the wishlist
  const itemCount = Object.keys(wishlist).length;

  // Provide the wishlist state and functions to the context
  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, itemCount }}>
      {children}
    </WishlistContext.Provider>
  );
};

// Custom hook to use the WishlistContext
export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};