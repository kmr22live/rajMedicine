import React, { useEffect } from "react";
import Headers from "../Header/Header";
import ProductCard from "../Body/ProductCard";
import Footer from "../Footer/Footer";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Main() {
  const authlogin = useSelector((state) => state.auth.authToken);

  const nav = useNavigate();
  useEffect(() => {
    if (!authlogin) {
      nav("/signin");
    }
  }, [authlogin]);

  return (
    <>
      {authlogin && (
        <div>
          <Headers />
          <ProductCard />
          <Footer />
        </div>
      )}
    </>
  );
}
