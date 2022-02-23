import React, { useState } from "react";
import { Link } from "react-router-dom";
import { links } from "../links";

const Navbar = () => {
  const [active, setActive] = useState(1);
  return (
    <div className="navbar-container">
      {links.map((item, index) => {
        const { id, url, title } = item;
        return (
          <Link to={url} key={id}>
            <button
              className={`links ${index + 1 === active ? "active" : ""}`}
              onClick={() => setActive(id)}
            >
              {title}
            </button>
          </Link>
        );
      })}
    </div>
  );
};

export default Navbar;
