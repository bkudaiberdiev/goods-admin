import React, {useState} from 'react';
import "../global.css"
import {Link} from "react-router-dom";
function Sidebar() {
  const [active, setActive] = useState("main");
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <h3>Склад товаров</h3>
      </div>

      <ul className="sidebar_menu">
        <li style={{ background: active === "main" ? "#e7e7e7" : ""}}>
          <Link onClick={() => setActive("main")} to="/">Все товары</Link>
        </li>
        <li style={{ background: active === "goodsin" ? "#e7e7e7" : ""}}>
          <Link  onClick={() => setActive("goodsin")}  to="/goods/in">Поступление товара</Link>
        </li>
        <li style={{ background: active === "goodsout" ? "#e7e7e7" : ""}}>
          <Link onClick={() => setActive("goodsout")}  to="/goods/out">Выдача товара</Link>
        </li>
        <li style={{ background: active === "producers" ? "#e7e7e7" : ""}}>
          <Link onClick={() => setActive("producers")} to="/producers">Поставщики</Link>
        </li>
        <li style={{ background: active === "consumers" ? "#e7e7e7" : ""}}>
          <Link onClick={() => setActive("consumers")} to="/consumers">Покупатели</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
