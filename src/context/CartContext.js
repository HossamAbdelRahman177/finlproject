import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";

export let CartContext = createContext();

export function CartContextProvider({ children }) {
  let [Numitem, SetNumitem] = useState(0);
  let [CartOwnerId, SetCartOwnerId] = useState("");
  let [Loading, SetLoading] = useState(true);
  let [CartData, SetCartData] = useState(null);

  function getUsetCart(token) {
    console.log(token);
    let option = {
      headers: {
        token,
      },
    };

    return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, option);
  }

  async function getUserData(token) {
    SetLoading(true);
    let req = await getUsetCart(token).catch((err) => {
      console.log(err);
      if (err.response.data.statusMsg == "fail") {
        SetCartData(null);
        SetLoading(false);
      }
    });
    console.log(req);

    if (req?.data.status == "success") {
      SetLoading(false);
      SetCartData(req?.data?.data);
    }
  }

  async function GetUserCart(token) {
    let option = {
      headers: {
        token,
      },
    };
    return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, option);
  }

  function addCart(id) {
    let option = {
      headers: {
        token: localStorage.getItem("UserToken"),
      },
    };

    let body = {
      productId: id,
    };
    return axios.post(
      `https://ecommerce.routemisr.com/api/v1/cart`,
      body,
      option
    );
  }

  function RemoveProudect(id) {
    let option = {
      headers: {
        token: localStorage.getItem("UserToken"),
      },
    };
    return axios.delete(
      `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
      option
    );
  }

  async function RemoveItem(id) {
    SetLoading(true);
    let req = await RemoveProudect(id);
    console.log(req);
    if (req?.data.status == "success") {
      SetCartData(req.data.data);
      SetLoading(false);
      SetNumitem(req.data.numOfCartItems);
    }
  }

  function ClearProudect() {
    let option = {
      headers: {
        token: localStorage.getItem("UserToken"),
      },
    };
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, option);
  }

  async function ClearAllPrudects() {
    SetLoading(true);
    let req = await ClearProudect();
    console.log(req);
    if (req.data.message == "success") {
      SetCartData(null);
      SetNumitem(req.data.numOfCartItems);
      SetLoading(false);
      EmptyCart();
    }
  }

  function EmptyCart() {
    let timerInterval;
    Swal.fire({
      title: "Products are now being deleted!",
      html: "I will close in <b></b> milliseconds.",
      timer: 2000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        const timer = Swal.getPopup().querySelector("b");
        timerInterval = setInterval(() => {
          timer.textContent = `${Swal.getTimerLeft()}`;
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log("I was closed by the timer");
      }
    });
  }

  function checkOUtPayment(id, data) {
    let option = {
      headers: {
        token: localStorage.getItem("UserToken"),
      },
    };

    let body = {
      shippingAddress: data,
    };

    return axios.post(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:3000`,
      body,
      option
    );
  }

  function UpdateData(id, count) {
    let option = {
      headers: {
        token: localStorage.getItem("UserToken"),
      },
    };
    let body = {
      count,
    };
    return axios.put(
      `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
      body,
      option
    );
  }

  async function GetUserNumCart(token) {
    
    let req = await getUsetCart(token).catch((err) => {
      console.log(err);
    });

    console.log(req);
    if (req?.data?.status == "success") {
      SetNumitem(req.data.numOfCartItems);
    }
  }
  async function UpdateCount(id, count) {
    if (count == 0) {
      RemoveItem(id);
    } else {
      let req = await UpdateData(id, count).catch((err) => {
        console.log(err);
      });

      console.log(req);
      if (req?.data?.status == "success") {
        SetCartData(req?.data?.data);
        SetLoading(false);
      }
    }
  }

  // function GetSuerOrders(){
  //   return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${CartOwnerId}`)
  // }

  return (
    <CartContext.Provider
      value={{
        ClearProudect,
        addCart,
        Numitem,
        SetNumitem,
        checkOUtPayment,
        getUsetCart,
        RemoveProudect,
        UpdateData,
        GetUserCart,
        SetCartOwnerId,
        // GetSuerOrders,
        CartOwnerId,
        getUserData,
        Loading,
        CartData,
        SetLoading,
        SetCartData,
        RemoveItem,
        ClearAllPrudects,
        UpdateCount,
        GetUserNumCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
