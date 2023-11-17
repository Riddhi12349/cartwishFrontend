import React, { useEffect, useState } from "react";
import "./ProductList.css";
import ProductCard from "./ProductCard";
import useData from "../hooks/useData";
import ProductCardSkeleton from "./ProductCardSkeleton";
import { useSearchParams } from "react-router-dom";
// import Pagination from "../Common/Pagination";
// import SingleProductPage from "./SingleProduct/SingleProductPage";

const ProductList = () => {
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("");
  const [sortedProducts, setSortedProducts] = useState([]);
  const [search, setSearch] = useSearchParams();
  const category = search.get("category");
  // const page = search.get("page");
  const searchQuery = search.get("search");

  const { data, error, isLoading } = useData(
    "/products",
    {
      params: {
        search: searchQuery,
        category,
        perPage: 10,
        page,
      },
    },
    [searchQuery, category, page]
  );

  useEffect(() => {
    setPage(1);
  }, [searchQuery, category]);

  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8];

  // const handlePageChange = (page) => {
  //   const currentParams = Object.fromEntries([...search]);
  //   console.log(currentParams);
  //   setSearch({ ...currentParams, page: page }); }

  // FOR INFINITE SCROLLING -------------------------
  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;

      // console.log("scrollTop : ", scrollTop);
      // console.log("clientHeight : ", clientHeight);
      // console.log("scrollHeight ", scrollHeight);

      // scrolltop + clientHt = scrollHt ---> then we will reach at the bottom

      if (
        scrollTop + clientHeight >= scrollHeight - 1 &&
        !isLoading &&
        data &&
        page < data.totalPages
      ) {
        console.log("Reached at the bottom");
        setPage((prev) => prev + 1);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [data, isLoading]);

  //For sorting Features
  useEffect(() => {
    if (data && data.products) {
      const products = [...data.products];

      if (sortBy === "price desc") {
        setSortedProducts(products.sort((a, b) => b.price - a.price));
      } else if (sortBy === "price asc") {
        setSortedProducts(products.sort((a, b) => a.price - b.price));
      } else if (sortBy === "rate desc") {
        setSortedProducts(
          products.sort((a, b) => b.reviews.rate - a.reviews.rate)
        );
      } else if (sortBy === "rate asc") {
        setSortedProducts(
          products.sort((a, b) => a.reviews.rate - b.reviews.rate)
        );
      } else {
        setSortedProducts(products);
      }
    }
  }, [sortBy, data]);
  return (
    <section className="products_list_section">
      <header className="align products_list_header">
        <h2>Products</h2>
        <select
          name="sort"
          id=""
          className="products_sorting"
          //  onChange={(e) => setSortBy(e.target.value)}
          onChange={(e) => {
            //console.log(e.target.value);
            setSortBy(e.target.value);
          }}
        >
          <option value="">Relevance</option>
          <option value="price desc"> Price HIGH to LOW </option>
          <option value="price asc"> Price LOW to HIGH </option>
          <option value="rate desc"> Rate HIGH to LOW </option>
          <option value="rate asc"> Rate LOW to HIGH </option>
        </select>
      </header>

      <div className="products_list">
        {error && <em className="form_error"> {error} </em>}

        {data?.products &&
          sortedProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        {isLoading && skeletons.map((n) => <ProductCardSkeleton key={n} />)}
        {/* <button onClick={() => handlePageChange(2)}> Page 2</button>{" "} */}
      </div>
      {/*
       {data?.products && (
        <Pagination
          totalPosts={data.products.length}
          postsPerPage={8}
          onClick={handlePageChange}
          currentPage={page}
        />
       )} 
       */}
    </section>
  );
};
export default ProductList;
