import { useDispatch, useSelector } from "react-redux";
import productData from "../../assets/data/data";
import { addTocart, disableAddToCartBtn } from "../../store/CartSlice";
import Pagination from "./Pagination";
import { useEffect, useState } from "react";
import Carousel from "../Carousel/Carousel";

export default function Products() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.cart.productList);
  const [medicineText, setMedicineText] = useState("");

  const searchedDatafromStore = useSelector(
    (state) => state.cart.inputsearchData
  );

  useEffect(() => {
    setMedicineText(searchedDatafromStore);
  }, [searchedDatafromStore]);
  console.log(medicineText);

  const addingItemsToCart = (e, item) => {
    dispatch(disableAddToCartBtn(item));
    dispatch(addTocart(item));
  };
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(20);
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const totalpage = Math.ceil(productData.length / postsPerPage);
  // const currentPosts = coinsData.slice(firstPostIndex, lastPostIndex);
  return (
    <>
      <div className="container">
        <Carousel />
      </div>
      <section className="py-0">
        <div className="container px-4 px-lg-5 mt-4">
          <div className="row gx-4 gx-lg-3 row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 justify-content-center">
            {data
              .filter((a) =>
                a?.Name?.toLowerCase().includes(
                  searchedDatafromStore.toLowerCase()
                )
              )
              .slice(firstPostIndex, lastPostIndex)
              .map((data, i) => {
                return (
                  <div
                    className="col mb-4"
                    id={i}
                    key={"medicineProduct" + data.id}
                  >
                    <div className="card h-100 card-product-img">
                      {data.rating > 0 && (
                        <div
                          className="badge bg-dark text-white position-absolute"
                          style={{ top: "0.5rem", right: "0.5rem" }}
                        >
                          Verified
                        </div>
                      )}
                      <img
                        className="card-img-top"
                        src="https://res.cloudinary.com/druttjvrf/image/upload/v1685439354/Raj_3_so8su8.png"
                        alt="..."
                      />

                      <div className="card-body p-3 ">
                        <div className="text-center">
                          <h5 className="fw-bolder">{data.Name}</h5>
                          <p className="">({data.pack_size})</p>
                          {data.rating > 0 && (
                            <div className="d-flex justify-content-center small text-warning mb-2">
                              <div className="bi-star-fill">
                                <i className="fa-solid fa-star"></i>
                              </div>{" "}
                              <span className="star-rating-text">
                                {data.rating}
                              </span>
                            </div>
                          )}
                          {data.mrp && (
                            <span className="text-muted text-decoration-line-through">
                              {"₹" + data.price}
                            </span>
                          )}
                          &nbsp;{"₹" + data.mrp}
                        </div>
                      </div>

                      <div className="card-footer p-3 pt-0 border-top-0 bg-transparent">
                        <div className="text-center">
                          <button
                            disabled={data.btn_disable}
                            className="btn btn-dark mt-auto"
                            id={"cart" + data.id}
                            onClick={(e) => addingItemsToCart(e, data)}
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>
      <div className="pagination-wrapper">
        <Pagination
          totalPosts={data.length}
          postsPerPage={postsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          totalpage={totalpage}
        />
      </div>
    </>
  );
}
