import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Button, Input, Popconfirm, Table} from "antd";
import toast from "react-hot-toast";
import Popup from "reactjs-popup";

interface IGoods {
  id: number;
  name: string;
  price: string | number;
}
const selectStyle = { marginBottom: "20px", height: "40px", border: "1px solid lightgrey", borderRadius: "8px", width: "100%" }

function Home() {
  const [search, setSearch] = useState("");
  const [goods, setGoods] = useState<IGoods[]>([]);
  const [types, setTypes] = useState([]);
  useEffect(() => {
    async function getGoods() {
      try {
        const response = await axios.get("http://besh.space:8080/goods")
        setGoods(response.data.data);
      } catch(e: any) {
        return e.message
      }
    }

    async function getTypes() {
      const res =  await axios.get("http://besh.space:8080/product-type")
      setTypes(res.data.data)
    }
    getTypes();
    getGoods();
  }, []);

  const handleDelete = async (id: any) => {
    try {
      const response = await axios.get(`http://besh.space:8080/goods/delete/${id}`)
      if (response.status === 200) {
        toast.success("Товар успешно удален")
        await axios.get("http://besh.space:8080/goods")
      }
    } catch(e: any) {
      return e.message;
    }
  };
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const columns = [
    {
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Тип продукта',
      dataIndex: 'productType',
      key: 'productType',
      render: (item: any) => item.name,
    },
    {
      title: 'Дата',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: "Действие",
      key: "action",
      render: (_: any, record: any) => (
        <>
          <Popconfirm
            title="Вы точно хотите удалить этот товар?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger>Delete</Button>
          </Popconfirm>
        </>
      ),

    }
  ];
  const [type, setType] = useState("")
  const handleChange = (e: any) => {
    setSearch(e.target.value)
  }
  const onChange = (e: any) => {
    setType(e.target.value);
  }

  const [addOpen, setAddOpen] = useState(false);
  const [product, setProduct] = useState({
    name: "",
    productType: ""
  })
  const closeAddModal = () => setAddOpen(false);
  const addProduct = async () => {
    const res = await axios.post("http://besh.space:8080/goods", {
      ...product,
      productType: {
        id: product.productType
      }
    })
    if (res.status === 400 || res.data.status === "FAIL") {
      toast.error("Заполните все поля")
    } else if (res.status === 200) {
      toast.success("Товар успешно добавлен");
      window.location.reload()
    }
  }
  const onTypeChange = (e: any) => {
    const {name, value} = e.target;
    setProduct({...product, [name]: value})
  }
  return (
    <div className="home">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center"}}>
        <h1 style={{marginBottom: "30px"}}>Список товаров на складе</h1>
        <div style={{ display: "flex", gap:"8px"}}>
          <Popup open={open} onClose={closeModal} contentStyle={{ width: "500px", padding: "24px"}}>
            <h2 style={{marginBottom: "24px"}}>Добавить товар</h2>
            <Input size="large" style={{marginBottom: "24px"}} name="name" onChange={onChange} placeholder="Тип товара" />
            <Button disabled={!type} size="large" onClick={ async()=> {
              try {
                const res = await axios.post("http://besh.space:8080/product-type", {
                  name: type,
                })
                if (res.status === 200) {
                  toast.success("Тип успешно добавлен")
                  window.location.reload()
                }
              } catch (e: any) {
                return e.message;
            }}
            }>Добавить</Button>
          </Popup>
          <Button onClick={() => setOpen(o => !o)}>Добавить тип товара</Button>
          <Button onClick={() => setAddOpen(o => !o)} type="primary">Добавить товар</Button>
          <Popup open={addOpen} onClose={closeAddModal} contentStyle={{width: "500px", padding: "24px"}}>
            <h2 style={{ marginBottom: "20px"}}>Добавить товар</h2>
            <Input size="large" style={{ marginBottom: "20px"}} name="name" onChange={onTypeChange}/>
            <select style={selectStyle} name="productType" onChange={onTypeChange}>
              <option value="">Выберите тип</option>
              {types.map((item: any) => {
                return (
                  <option value={item.id}>{item.name}</option>
                )
              })}
            </select>
            <Button onClick={addProduct}>Добавить</Button>
          </Popup>
        </div>
      </div>
      <Input size="large" placeholder="Поиск" value={search} onChange={handleChange}/>
      <div style={{height: "calc(100vh - 210px)", overflow: "auto"}}>
        <Table size="middle"
               dataSource={goods.filter((el) => el.name.toLowerCase().includes(search.toLowerCase()))}
               columns={columns} pagination={false} />
      </div>
    </div>
  );
}

export default Home;
