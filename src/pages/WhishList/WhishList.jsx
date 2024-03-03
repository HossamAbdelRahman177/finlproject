import React, { useContext, useEffect, useState } from "react";
import OwlCarousel from "react-owl-carousel";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { CartContext } from "../../context/CartContext";
import { WishListContext } from "../../context/Wishlist";
export default function WhishList() {
  let [loading, setLoading] = useState(true);
  let [whishlistData, SetwhishlistData] = useState(null);
  let [spinnerButton, SetSpinnerButton] = useState(true);
  let { addCart, SetNumitem } = useContext(CartContext);
  let { getMyWishList, DeletItemWhishList, WhishList, SetwhishLit } =
    useContext(WishListContext);
  useEffect(() => {
    getWhishList();
  }, []);

  console.log(whishlistData);
  async function getWhishList() {
    setLoading(true);
    let req = await getMyWishList();
    if (req?.data?.status == "success") {
      SetwhishLit(req.data.data);
      SetwhishlistData(req?.data?.data);
      setLoading(false);
    }
  }

  async function AddToCart(id) {
    SetSpinnerButton(false);
    setLoading(true);
    let req = await addCart(id).catch((err) => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: '<a href="#">Why do I have this issue?</a>',
      });
    });
    setLoading(false);
    console.log(req);

    if (req?.data?.status == "success") {
      setLoading(true);
      SetSpinnerButton(true);
      SetNumitem(req?.data?.numOfCartItems);
      Swal.fire({
        title: "Good job!",
        text: req.data.message,
        icon: "success",
      });
      setLoading(false);
    }
  }

  async function RemoveItem(id) {
    setLoading(true);
    let req = await DeletItemWhishList(id);
    console.log(req.data.data);
    console.log(WhishList);
    if (req?.data.status == "success") {
      SetwhishlistData(req?.data?.data);
      setLoading(false);
    }
  }

  return (
    <>
      {loading ? (
        <div className=" loading d-flex justify-content-center align-items-center bg-white position-fixed top-0 end-0 start-0 bottom-0">
          <span className="loader3"></span>
        </div>
      ) : (
        <div>
          <h1 className="fw-bolder pb-5">
            wishList Item <i className="fa-solid fa-heart text-danger"></i>
          </h1>
          {whishlistData.map((element) => {
            // console.log(element);
            return (
              <div
                key={element.id}
                className="row mb-3 p-2 align-items-center border-bottom border-3 "
              >
                <div className="col-md-10">
                  <div className="row align-items-center">
                    <div className="col-md-1">
                      <img src={element.imageCover} alt="" className="w-100" />
                    </div>

                    <div className="col-md-11">
                      <h6 className="fw-bolder text-main"> {element.title} </h6>
                      <h5 className="text-muted fw-bolder">
                        {element.price} EPG{" "}
                      </h5>
                      <span className="fw-bolder d-block">
                        {" "}
                        {element.ratingsAverage}{" "}
                        <i className="fa-solid fa-star rating-color"></i>{" "}
                      </span>
                      <Link
                        onClick={() => RemoveItem(element.id)}
                        className="text-danger"
                      >
                        Remove <i className="fa-solid fa-trash"></i>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-md-2">
                  {spinnerButton ? (
                    <button
                      onClick={() => AddToCart(element.id)}
                      className="btn btn-outline-dark"
                    >
                      Add To Cart{" "}
                    </button>
                  ) : (
                    <button className="btn btn-outline-dark">
                      {" "}
                      <i className="fa-solid fa-spinner fa-spin"></i>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
