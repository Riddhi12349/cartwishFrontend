import "./ProductsList.css";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useProductList from "./../../hooks/useProductList";

const ProductsList = () => {
  const [sortBy, setSortBy] = useState("");
  const [sortedProducts, setSortedProducts] = useState([]);
  const [search, setSearch] = useSearchParams();
  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8];

  const category = search.get("category");
  const searchQuery = search.get("search");

  const { data, error, isFetching, hasNextPage, fetchNextPage } =
    useProductList({
      search: searchQuery,
      category,
      perPage: 10,
    });

  const handlePageChange = () => {
    const currentPrams = Object.fromEntries([...search]);
    setSearch({ ...currentPrams, page: parseInt(currentPrams.page) + 1 });
  };

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      if (
        scrollTop + clientHeight >= scrollHeight - 1 &&
        !isFetching &&
        hasNextPage &&
        data
      ) {
        fetchNextPage();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [data, isFetching]);

  useEffect(() => {
    if (data && data.pages) {
      const products = data.pages.flatMap((page) => page.products);

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
      <header className="align_center products_list_header">
        <h2>Products</h2>
        <select
          name="sort"
          id=""
          className="products_sorting"
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="">Relevance</option>
          <option value="price desc">Price High To Low</option>
          <option value="price asc">Price Low To High</option>
          <option value="rate desc">Rate High To Low</option>
          <option value="rete asc">Rate Low To High</option>
        </select>
      </header>
      <div className="products_list">
        {error && <em className="form_error">{error}</em>}
        {sortedProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
        {isFetching && skeletons.map((n) => <ProductCardSkeleton key={n} />)}
      </div>
    </section>
  );
};

export default ProductsList;
