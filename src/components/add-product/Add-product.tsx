import React, {useState} from 'react';
import {Button, Input} from "antd";
import {log} from "node:util";
import axios from "axios";
import toast from "react-hot-toast";

function AddProduct() {
  const [good, setGood] = useState({
    name: "",
    price: "",
  })
  const handleChange = (e: any) => {
    const {name, value} = e.target;
    setGood({...good, [name]: value})
  }
  const handleClick = async () => {
    try {
      const response  = await axios.post(process.env.BASE_URL + "/goods", good)
      setGood({
        name: "",
        price: "",
      })
      if (response.status === 200) {
        toast.success("Товар успешно добавлен")
      }
    } catch(e: any) {
      return e.message
    }
  }
  return (
    <div className="add">
      <h1>Добавить товар</h1>

      <Input value={good.name} name="name" onChange={handleChange} size="large" placeholder="Название" />
      <Input value={good.price} name="price" onChange={handleChange} size="large" placeholder="Цена" />
      <Button onClick={handleClick} size="large">Добавить</Button>
    </div>
  );
}

export default AddProduct;
