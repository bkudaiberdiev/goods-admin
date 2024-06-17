import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Button, Input, Popconfirm} from "antd";
import Popup from "reactjs-popup";
import toast from "react-hot-toast";

interface IProducer {
  companyName: string;
  email: string;
  address: string;
  phone: string;
  fio: string;
}
const initialForm: IProducer = {
  companyName: "",
  fio: "",
  address: "",
  phone: "",
  email: "",
}
function Producers() {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const [formData, setFormData] = useState(initialForm)
  const [producers, setProducers] = useState<IProducer[]>([]);
  useEffect(() => {
   const getProducers = async () => {
     try {
       const res = await axios.get("http://besh.space:8080/producer")
       setProducers(res.data.data);
     } catch(e: any) {
       return e.message;
     }
   }
   getProducers();
  }, [open])

  const handleChange = (e: any) => {
    const { name, value} = e.target;
    setFormData({ ...formData, [name]: value})
  }

  const handleSubmit = async(e: any) => {
    try {
      const res = await axios.post("http://besh.space:8080/producer", {...formData})
      if (res.data.status === "FAIL" || res.status === 400) {
        toast.error("Заполните необходимые поля");
        return;
      } else if (res.status === 200) {
        toast.success("Поставщик успешно добавлен")
        closeModal();
        setFormData(initialForm)
        return window.location.reload()

      }
    } catch(e: any) {
      if (e.response.status === 400) {
        toast.error("Заполните необходимые поля");
      }
      return e.message;
    }
  };

  const deleteProducer = async(producer: IProducer) => {
    try {
      const res = await axios.delete("http://besh.space:8080/producer", { data: producer})
      if (res.status === 200) {
        toast.success("Постващик успешно удален", {
          position: "top-right"
        })
        return window.location.reload()
      }
    } catch(e: any) {
      return e.message;
    }
  }
  return (
    <div>
      <div style={{display: "flex", justifyContent: "space-between"}}>
        <h1 style={{marginBottom: "24px"}}>Поставщики</h1>
        <div>
          <Button type="primary" className="button" onClick={() => setOpen(o => !o)}>
            Добавить поставщика
          </Button>
          <Popup open={open} closeOnDocumentClick onClose={closeModal} contentStyle={{ width: "500px"}}>
            <div className="modal">
              <h2 style={{ marginBottom: "20px"}}>Добавить поставщика</h2>
              <Input value={formData.companyName} name="companyName" onChange={handleChange} size="large" placeholder="Название поставщика" />
              <Input value={formData.fio} name="fio" onChange={handleChange} size="large" placeholder="ФИО" />
              <Input value={formData.email} name="email" onChange={handleChange} size="large" placeholder="Почта" />
              <Input value={formData.address} name="address" onChange={handleChange} size="large" placeholder="Адресс" />
              <Input value={formData.phone} name="phone" onChange={handleChange} size="large" placeholder="Телефон" />
              <div style={{ display: "flex", gap: "10px"}}>
                <Button onClick={handleSubmit} type="primary">Добавить</Button>
                <Button onClick={() => {
                  closeModal();
                  setFormData(initialForm)
                }} danger>Отменить</Button>
              </div>
            </div>
          </Popup>
        </div>
      </div>
      <table id="customers">
        <tr>
          <th>Имя поставщика</th>
          <th>Почта</th>
          <th>ФИО</th>
          <th>Адрес</th>
          <th>Номер телефона</th>
          <th></th>
        </tr>
        {producers.map((producer) => {
          return (
            <tr>
              <td>{producer.companyName}</td>
              <td>{producer.email}</td>
              <td>{producer.fio}</td>
              <td>{producer.address}</td>
              <td>{producer.phone}</td>
              <td>
                <Popconfirm
                  title="Вы точно хотите удалить этого постащика?"
                  onConfirm={() => deleteProducer(producer)}
                  okText="Да"
                  cancelText="Нет"
                >
                  <Button danger>Удалить</Button>
                </Popconfirm>
              </td>
            </tr>
          )
        })}
      </table>
    </div>
  );
}

export default Producers;
