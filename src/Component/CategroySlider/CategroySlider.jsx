import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useQuery } from "react-query";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Loader from "../Loader";

export default function CategroySlider() {
  let { data, isLoading } = useQuery("CategroyApi", getCategroy);

  async function getCategroy() {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }
  if (isLoading) return <Loader />;

  const CategoryList = data.data.data;

  return (
    <>
      <h2 className="fw-bolder mb-2">Shop Popular Categorise</h2>
      <div>
        <OwlCarousel items={6} loop>
          {CategoryList.map((el) => {
            return (
              <div key={el._id} className="item  w-100 ">
                <div>
                  <img src={el.image} height={200} alt="" className="w-100" />
                  <div className="fw-bolder w-100 my-1 text-center ">
                    {el.name}
                  </div>
                </div>
              </div>
            );
          })}
        </OwlCarousel>
      </div>
    </>
  );
}
