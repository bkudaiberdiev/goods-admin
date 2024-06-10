import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Button, Input, Popconfirm, Table} from "antd";
import toast from "react-hot-toast";

interface IGoods {
  id: number;
  name: string;
  price: string | number;
}
function Home() {
  const [search, setSearch] = useState("");
  const [goods, setGoods] = useState<IGoods[]>([]);
  useEffect(() => {
    async function getGoods() {
      try {
        const response = await axios.get(process.env.BASE_URL + "/goods")
        setGoods(response.data.data);
      } catch(e: any) {
        return e.message
      }
    }
    getGoods();
  }, []);

  const handleDelete = async (id: any) => {
    try {
      const response = await axios.get(process.env.BASE_URL + `/goods/delete/${id}`)
      if (response.status === 200) {
        toast.success("Товар успешно удален")
        await axios.get("http://besh.space/goods")
      }
    } catch(e: any) {
      return e.message;
    }
  };
  const columns = [
    {
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Цена',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: "Действие",
      key: "action",
      render: (_: any, record: any) => (
        <Popconfirm
          title="Вы точно хотите удалить этот товар?"
          onConfirm={() => handleDelete(record.id)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="link" danger>Delete</Button>
        </Popconfirm>
      ),

    }
  ];
  const handleChange = (e: any) => {
    setSearch(e.target.value)
  }
  return (
    <div className="home">
      <h1 style={{ marginBottom: "30px"}}>Список товаров на складе</h1>
      <Input size="large" placeholder="Поиск" value={search} onChange={handleChange} />
      <div style={{ height: "calc(100vh - 210px)", overflow: "auto"}}>
        <Table size="middle"
               dataSource={goods.filter((el) => el.name.toLowerCase().includes(search.toLowerCase()))}
               columns={columns} pagination={false} />
      </div>
    </div>
  );
}

export default Home;
