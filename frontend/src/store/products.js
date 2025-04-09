import { create } from "zustand";

export const useProductStore = create((set, get) => ({
  products: [],
  silksarees: [],
  newarrivals: [],
  favourites: [],
  cartItems: JSON.parse(localStorage.getItem("cartItems")) || {},

  setProduct: (products) => set({ products }),

  fetchProduct: async () => {
    const res = await fetch("https://seetharam.onrender.com/api/products/allproducts");
    const data = await res.json();
    set({ products: data.data });
  },

  fetchSilkSarees: async () => {
    const res = await fetch("https://seetharam.onrender.com/api/products/silksarees");
    const data = await res.json();
    set({ products: data.data });
  },

  fetchNewArrivals: async () => {
    const res = await fetch("https://seetharam.onrender.com/api/products/newarrivals");
    const data = await res.json();
    set({ products: data.data });
  },

  fetchShopSilkSarees: async () => {
    const res = await fetch("https://seetharam.onrender.com/api/products/silksarees");
    const data = await res.json();
    const limitProducts = data.data.slice(0, 8);
    set((state) => ({ ...state, silksarees: limitProducts }));
  },

  fetchShopNewArrivals: async () => {
    const res = await fetch("https://seetharam.onrender.com/api/products/newarrivals");
    const data = await res.json();
    const limitProducts = data.data.slice(0, 8);
    set((state) => ({ ...state, newarrivals: limitProducts }));
  },

  fetchCart: async () => {
    if (!localStorage.getItem("auth-token")) return;

    try {
      const response = await fetch("https://seetharam.onrender.com/api/users/getcart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth-token"),
        },
      });

      const data = await response.json();

      if (response.ok && data.success) {
        const cartItems = data.cartData || {};
        set({ cartItems });
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
      } else {
        console.error("Failed to fetch cart:", data.message);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  },

  addToCart: async (itemId, showSnackbar) => {
    const token = localStorage.getItem("auth-token");

    if (!token) {
      showSnackbar("Please login to add to cart", "warning");
      return;
    }

    const cart = get().cartItems;
    const updatedCart = { ...cart, [itemId]: (cart[itemId] || 0) + 1 };
    set({ cartItems: updatedCart });
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));

    try {
      const res = await fetch("https://seetharam.onrender.com/api/users/addtocart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify({ itemId }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        showSnackbar(data.message || "Failed to add to cart", "error");
      } else {
        showSnackbar("Added to cart successfully", "success");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      showSnackbar("Something went wrong", "error");
    }
  },

  removeFromCart: async (itemId) => {
    const cart = get().cartItems;
    if (cart[itemId] > 0) {
      const updatedCart = { ...cart };
      updatedCart[itemId]--;

      if (updatedCart[itemId] === 0) delete updatedCart[itemId];

      set({ cartItems: updatedCart });
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    }

    if (localStorage.getItem("auth-token")) {
      try {
        await fetch("https://seetharam.onrender.com/api/users/removefromcart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth-token"),
          },
          body: JSON.stringify({ itemId }),
        });
      } catch (error) {
        console.error("Error removing from cart:", error);
      }
    }
  },

  getTotalCartItem: () => {
    const cart = get().cartItems;
    return Object.values(cart).reduce((total, count) => total + count, 0);
  },

  getTotalCartAmount: () => {
    const { cartItems, products } = get();

    if (!products || products.length === 0) {
      console.warn("🚨 Products not loaded yet. Returning 0.");
      return 0;
    }

    let totalAmount = 0;
    for (const itemId in cartItems) {
      if (cartItems[itemId] > 0) {
        const itemInfo = products.find(
          (product) => String(product._id || product.id) === String(itemId)
        );
        if (itemInfo) {
          totalAmount += itemInfo.new_price * cartItems[itemId];
        } else {
          console.warn(`🚨 Product not found for ID: ${itemId}`);
        }
      }
    }

    return totalAmount;
  },

  logout: () => {
    localStorage.removeItem("cartItems");
    localStorage.removeItem("auth-token");
    set({ cartItems: {}, favourites: [] });
  },

  isFavourited: (productId) => {
    return get().favourites.some((item) => item && item._id === productId);
  },

  fetchFavourites: async () => {
    if (!localStorage.getItem("auth-token")) return;

    try {
      const res = await fetch("https://seetharam.onrender.com/api/users/getfavourites", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth-token"),
        },
      });

      const data = await res.json();
      if (res.ok && data.success) {
        set({ favourites: data.favourites });
      } else {
        console.error("Failed to fetch favourites:", data.message);
      }
    } catch (error) {
      console.error("Error fetching favourites:", error);
    }
  },

  handleFavourites: async (product, showSnackbar) => {
    if (!product || !product._id) {
      console.error("Invalid product passed to handleFavourites:", product);
      return;
    }

    const token = localStorage.getItem("auth-token");
    if (!token) {
      showSnackbar("Please login to add to favourites", "warning");
      return;
    }

    const current = get().favourites || [];

    const isExist = current.find((item) => item && item._id === product._id);
    const updatedFavourites = isExist
      ? current.filter((item) => item && item._id !== product._id)
      : [...current, product];

    set({ favourites: updatedFavourites });

    try {
      await fetch("https://seetharam.onrender.com/api/users/togglefavourite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify({ productId: product._id }),
      });

      showSnackbar(
        isExist ? "Removed from favourites" : "Added to favourites",
        "success"
      );
    } catch (error) {
      console.error("Error syncing favourite:", error);
      showSnackbar("Failed to update favourites", "error");
    }
  },

  getTotalFavouriteItem: () => {
    return get().favourites.length;
  },
}));
