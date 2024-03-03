import { useContext, useEffect } from "react";
import Navbar from "../Component/Navbar/Navbar";
import Footer from "../Component/Footer/Footer";
import { Outlet } from "react-router-dom";
import { UserContext } from "../context/TokenContext";
import { CartContext } from "../context/CartContext";

export default function Layout() {
  let { getUsetCart, SetNumitem, getUserData, GetUserNumCart } =
    useContext(CartContext);
  let { SetUserData, UserData } = useContext(UserContext);

  useEffect(() => {
    if (UserData) {
      console.log(UserData.token);
      GetUserNumCart(UserData.token);
      getUserData(UserData.token);
    }
  }, [UserData]);

  return (
    <div>
      <Navbar />
      <div className="container my-5 pt-5">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
