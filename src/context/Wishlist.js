import axios from "axios";
import { createContext, useState } from "react";

export let WishListContext = createContext();

export function WishListContextPorvider({ children }) {
  let [NumWhishList, SetNumWhishList] = useState(0);
  let [heartData, SetHeartData] = useState([]);
  let [WhishList, SetwhishLit] = useState([]);

  function postWishListProudect(id) {
    let option = {
      headers: {
        token: localStorage.getItem("UserToken"),
      },
    };

    let body = {
      productId: id,
    };
    return axios.post(
      `https://ecommerce.routemisr.com/api/v1/wishlist`,
      body,
      option
    );
  }

  function getMyWishList() {
    let option = {
      headers: {
        token: localStorage.getItem(`UserToken`),
      },
    };

    return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, option);
  }

  function DeletItemWhishList(id) {
    let option = {
      headers: {
        token: localStorage.getItem("UserToken"),
      },
    };

    return axios.delete(
      `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
      option
    );
  }




  return (
    <WishListContext.Provider
      value={{
        postWishListProudect,
        heartData,
        SetHeartData,
        getMyWishList,
        DeletItemWhishList,
        NumWhishList,
        SetNumWhishList,
        WhishList,
        SetwhishLit,
      }}
    >
      {children}
    </WishListContext.Provider>
  );
}
