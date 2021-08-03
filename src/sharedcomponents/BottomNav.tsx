import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import "../index.css";
import { Bottomstuffs } from "./bottomstuffs";
import { IconContext } from "react-icons";

function Navbar() {
  return (
    <div className="flexbox-container">
      {Bottomstuffs.map((item, index) => {
        return (
          <li key={index} className={item.cName}>
            <Link to={item.path} className="bottom-container">
              {item.icon}
              {item.title}
            </Link>
          </li>
        );
      })}
    </div>
  );
}

export default Navbar;
