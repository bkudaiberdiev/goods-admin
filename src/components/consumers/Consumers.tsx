import React, {useEffect, useState} from 'react';
import {Button, Input, Popconfirm, Table} from "antd";
import axios from "axios";
import Popup from "reactjs-popup";
import toast from "react-hot-toast";


const initialValue = {
  name: "",
  phone: "",
  email: "",
  address: "",
}
function Consumers() {
  const [consumer, setConsumer] = useState(initialValue)
  const [consumers, setConsumers] = useState([]);
  const handleDelete = async (record: any) => {
    const res = await axios.delete("http://besh.space:8080/consumer", { data: record})
    if (res.status === 200) {
      toast.success("Покупатель удален")
      return window.location.reload()
    }
  }
  const columns = [
    {
      title: 'Имя покупателя',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Телефон',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Почта',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Адрес',
      dataIndex: 'address',
      key: 'address',
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
        <Popconfirm
          title="Вы точно хотите удалить этого покупателя?"
          onConfirm={() => handleDelete(record)}
          okText="Да"
          cancelText="Нет"
        >
          <Button type="link" danger>Удалить</Button>
        </Popconfirm>
      ),

    }
  ];
  useEffect(() => {
    const getConsumers = async () => {
      try {
        const res = await axios.get("http://besh.space:8080/consumer")
        setConsumers(res.data.data)
        return res.data;
      } catch(e: any) {
        return e.message;
      }
    }

    getConsumers();
  }, []);

  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const handleChange = (e: any) => {
    const {name, value} = e.target;
    setConsumer({...consumer, [name]: value})
  }
  const handleClick = async () => {
    try {
      const res = await axios.post("http://besh.space:8080/consumer", consumer)
      if (res.status === 400 || res.data.status === "FAIL") {
        toast.error("Заполните необходимые поля");
        return;
      } else if (res.status === 200) {
        toast.success("Покупатель добавлен")
        return window.location.reload()

      }
    } catch (e: any) {
      return e.message;
    }
  }
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center"}}>
        <h1 style={{marginBottom: "24px"}}>Покупатели</h1>
        <Button type="primary" onClick={() => setOpen(o => !o)}>Добавить покупателя</Button>
      </div>
      <Popup open={open} closeOnDocumentClick onClose={closeModal} contentStyle={{ width: "500px"}}>
        <div className="modal">
          <h2 style={{ marginBottom: "20px"}}>Добавить покупателя</h2>
          <Input name="name" onChange={handleChange} size="large" placeholder="Имя" />
          <Input name="email" onChange={handleChange} size="large" placeholder="Почта" />
          <Input name="phone" onChange={handleChange} size="large" placeholder="Телефон" />
          <Input name="address" onChange={handleChange} size="large" placeholder="Адрес" />
          <div style={{ display: "flex", gap: "10px"}}>
            <Button type="primary" onClick={handleClick}>Добавить</Button>
            <Button onClick={() => {
              closeModal();
            }} danger>Отменить</Button>
          </div>
        </div>
      </Popup>
      <Table pagination={false} dataSource={consumers} columns={columns} />

    </div>
  );
}

export default Consumers;
