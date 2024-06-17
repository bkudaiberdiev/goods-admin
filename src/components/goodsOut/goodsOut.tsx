import React, {useEffect, useState} from 'react';
import {Button, Input, Table} from "antd";
import axios from "axios";
import Popup from "reactjs-popup";
import toast from "react-hot-toast";
import {useLocation, useParams} from "react-router-dom";

const columns = [
  {
    title: 'Название товара',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Количество',
    dataIndex: 'quantityIn',
    key: 'quantityIn',
  },
  {
    title: 'Цена',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: 'Дата',
    dataIndex: 'createdAt',
    key: 'createdAt',
  },
  {
    title: 'Описание товара',
    dataIndex: 'good',
    key: 'good',
    render: (item: any) => item.name
  },
  {
    title: "Имя поставщика",
    dataIndex: 'consumer',
    key: 'consumer',
    render: (item: any) => item.name,
  },
  {
    title: 'Тип товара',
    dataIndex: 'good',
    key: 'good',
    render: (item: any) => item.productType.name
  },
];
const initialValue = {
  price:0.0,
  productId:0,
  quantityOut:0,
  name:"",
  consumerId:0
}
const selectStyle = { marginBottom: "20px", height: "40px", border: "1px solid lightgrey", borderRadius: "8px", width: "100%" }

function GoodsOut() {
  const [goodsOut, setGoodsOut] = useState([])
  const [good, setGood] = useState(initialValue);
  const [goods, setGoods] = useState([]);
  const [consumers, setConsumers] = useState([]);

  // const [good, setConsumers] = useState([]);
  useEffect(() => {
    const getGoods = async () => {
      const response = await axios.get("http://besh.space:8080/goods")
      setGoods(response.data.data)

    }
    const getGoodsOut = async () => {
      try {
        const res = await axios.get("http://besh.space:8080/goods/out")
        setGoodsOut(res.data.data)
        return res.data;
      } catch(e: any) {
        return e.message;
      }
    }
    const getConsumers = async () => {
      const res = await axios.get("http://besh.space:8080/consumer")
      setConsumers(res.data.data)
    }
    getConsumers();
    getGoods();
    getGoodsOut();
  }, []);
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const handleChange = (e: any) => {
    const {name, value} = e.target;
    setGood({...good, [name]: value})
  }

  const handleClick = async (e : any) => {
    try {
      const res = await axios.post("http://besh.space:8080/goods/out", good)
      if (res.status === 400 || res.data.status === "FAIL") {
        toast.error("Заполните необходиые поля")
        return;
      } else if (res.status === 200) {
        toast.success("Товар добавлен")
        closeModal();
        return window.location.reload()
      }
    } catch (e: any) {
      if (e.response.status === 400) {
        toast.error("Заполните необходимые поля");
      }
      return e.message;
    }
  }
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center"}}>
        <h1 style={{marginBottom: "24px"}}>Выдача товара</h1>
        <Button type="primary" onClick={() => setOpen(o => !o)}>Добавить товар</Button>
      </div>
      <Popup open={open} onClose={closeModal} contentStyle={{ width: "500px"}}>
        <div className="modal">
          <h2 style={{marginBottom: "20px"}}>Добавить товар</h2>
          <Input name="name" onChange={handleChange} size="large" placeholder="Имя"/>
          <Input name="price" onChange={handleChange} size="large" placeholder="Цена"/>
          <Input name="quantityOut" onChange={handleChange} size="large" placeholder="Количество"/>
          <select style={selectStyle} onChange={handleChange} name="productId">
            <option value="">Выберите продукт</option>
            {goods.map((item: any) => {
              return (
                <option value={item.id}>{item.name}</option>
              )
            })}
          </select>
          <select style={selectStyle} onChange={handleChange} name="consumerId">
            <option value="">Выберите покупателя</option>
            {consumers.map((item: any) => {
              return (
                <option value={item.id}>{item.name}</option>
              )
            })}
          </select>
          <div style={{display: "flex", gap: "10px"}}>
            <Button type="primary" onClick={handleClick}>Добавить</Button>
            <Button onClick={() => {
              closeModal();
            }} danger>Отменить</Button>
          </div>
        </div>
      </Popup>
      <Table pagination={false} dataSource={goodsOut} columns={columns} />

    </div>
  );
}

export default GoodsOut;
