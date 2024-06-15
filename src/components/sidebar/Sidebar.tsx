import React from 'react';
import "../global.css"
import {Link} from "react-router-dom";
function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <h3>Склад товаров</h3>
      </div>

      <ul className="sidebar_menu">
        <li>
          <Link to="/">Главная</Link>
        </li>
        <li>
          <Link to="/add-product">Добавить товар</Link>
        </li>
        <li>
          <Link to="/producers">Поставщики</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
