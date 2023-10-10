import { useEffect, useState } from "react";
import InputText from "../../../components/Input/InputText";
import SelectBox from "../../../components/Input/SelectBox";
import axios from "axios";

function AddUser({ closeModal, user, setUser, handleClose }) {
  const [depolar, setDepolar] = useState([]);
  const [selectedDepo, setSelectedDepo] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const depolarResponse = await axios.get("http://localhost:5145/api/Depo");
      const temp = depolarResponse.data.map((x) => ({
        value: x.dep_no,
        name: x.dep_adi,
      }));
      setDepolar(temp);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleAddPerson = () => {
    console.log(user);
    axios

      .post("http://localhost:5145/api/AuthUser/GetUsers", user)
      .then((response) => {
        if (response.data.Status) {
          console.log("kaydedildi");
        } else {
          console.log(response.data.Mesaj);
        }
      })
      .catch((error) => {
        console.error("Veri gönderme hatası:", error);
      });

    fetchData();
  };

  const handleDepoChange = (event) => {
    setSelectedDepo(event.target.value);
    setUser((x) => ({ ...x, wareHouseNo: Number(event.target.value ?? 0) }));
  };
  const updateFormValue = ({ updateType, value }) => {
    setUser((x) => ({ ...x, [updateType]: value }));
  };
  return (
    <>
      <InputText
        type="text"
        defaultValue={""}
        updateType="username"
        containerStyle="mt-4"
        labelTitle="Kullanıcı Adı"
        updateFormValue={updateFormValue}
      />

      <InputText
        type="text"
        defaultValue={""}
        updateType="password"
        containerStyle="mt-4"
        labelTitle="Şifreniz"
        updateFormValue={updateFormValue}
      />

      <div>
        <SelectBox
          value={selectedDepo}
          onChange={handleDepoChange}
          options={depolar}
          labelTitle="Depo Seçiniz"
          placeholder="Seçiniz"
          updateType="wareHouseNo"
          containerStyle="w-72"
          labelStyle="visible"
          updateFormValue={updateFormValue}
        />
      </div>
      <div className="modal-action">
        <button className="btn btn-ghost" onClick={() => handleClose()}>
          Çık
        </button>
        <button
          className="btn btn-primary px-6"
          onClick={() => {
            handleAddPerson();
            handleClose();
          }}
        >
          Kaydet
        </button>
      </div>
    </>
  );
}

export default AddUser;
