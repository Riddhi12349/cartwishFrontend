import React, { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import { NavLink, useNavigate, Link } from "react-router-dom";
import LinkWithIcon from "./LinkWithIcon";
import rocket from "../../assets/rocket.png";
import star from "../../assets/glowing-star.png";
import idButton from "../../assets/id-button.png";
import memo from "../../assets/memo.png";
import order from "../../assets/package.png";
import lock from "../../assets/locked.png";
import UserContext from "../Contexts/UserContext";
import getSuggestionsAPI from "../services/productServices";

const Navbar = ({ cartCount }) => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState(-1);

  const [suggestions, setSuggestions] = useState([]);

  const user = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.trim() !== "") {
      navigate(`/products?search=${search.trim()}`);
    }
    setSuggestions([]);
  };

  useEffect(() => {
    const delaySuggestions = setTimeout(() => {
      if (search.trim() !== "") {
        getSuggestionsAPI(search)
          .then((res) => {
            setSuggestions(res.data);
          })
          .catch((err) => console.log(err));
      } else {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(delaySuggestions);
  }, [search]);

  const handleKeyDown = (e) => {
    if (selectedItem < suggestions.length) {
      if (e.key === "ArrowDown") {
        setSelectedItem((current) =>
          current === suggestions.length - 1 ? 0 : current + 1
        );
      } else if (e.key === "ArrowUp") {
        setSelectedItem((current) =>
          current === 0 ? suggestions.length - 1 : current - 1
        );
      } else if (e.key === "Enter" && selectedItem > -1) {
        const suggestion = suggestions[selectedItem];
        navigate(`/products?search=${suggestion.title}`);
        setSearch("");
        setSuggestions([]);
      }
    }
  };
  return (
    <nav className="align_center navbar">
      <div className="align_center">
        <h1 className="navbar_heading"> CartWish </h1>
        <form className="align_center navbar_form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="navbar_search"
            placeholder="Search Products"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button type="submit" className="search_button">
            {" "}
            Search{" "}
          </button>

          {suggestions.length > 0 && (
            <ul className="search_result">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className={
                    selectedItem === index
                      ? "search_suggestion_link active"
                      : "search_suggestion_link"
                  }
                >
                  <Link
                    to={`/products?search=${suggestion.title}`}
                    onClick={() => {
                      setSearch("");
                      setSuggestions([]);
                    }}
                  >
                    {suggestion.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </form>
      </div>

      <div className="align_center navbar_links">
        <LinkWithIcon title="Home" link="/" emoji={rocket} />
        <LinkWithIcon title="Products" link="/products" emoji={star} />

        {user && (
          <>
            {" "}
            <LinkWithIcon title="My Orders" link="/myorders" emoji={order} />
            <LinkWithIcon title="Logout" link="/logout" emoji={lock} />
            <NavLink to="/cart" className="align_center">
              Cart <p className="align_center cart_counts">{cartCount}</p>
            </NavLink>{" "}
          </>
        )}
        {!user && (
          <>
            {" "}
            <LinkWithIcon title="LogIn" link="/login" emoji={idButton} />
            <LinkWithIcon title="SignUp" link="/signup" emoji={memo} />{" "}
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
