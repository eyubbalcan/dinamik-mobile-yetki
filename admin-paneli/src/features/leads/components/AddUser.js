import { useEffect, useState } from "react";
import InputText from "../../../components/Input/InputText";
import ErrorText from "../../../components/Typography/ErrorText";
import SelectBox from "../../../components/Input/SelectBox";
import axios from "axios";

function AddUser({ closeModal, user, setUser }) {
  const [depolar, setDepolar] = useState([]);
  const [selectedDepo, setSelectedDepo] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const depolarResponse = await axios.get(
        "http://192.168.1.40:5143/api/Depo"
      );
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
    axios
      .post("http://192.168.1.40:5143/api/AuthUser", setUser)
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
    setErrorMessage("");
  };
  return (
    <>
      <InputText
        type="text"
        defaultValue={""}
        updateType="user_name"
        containerStyle="mt-4"
        labelTitle="Kullanıcı Adı"
        onChange={(e) => {
          setUser((x) => ({ ...x, username: e.target.value ?? "" }));
        }}
        updateFormValue={updateFormValue}
      />

      <InputText
        type="text"
        defaultValue={""}
        updateType="user_password"
        containerStyle="mt-4"
        labelTitle="Şifreniz"
        onChange={(e) => {
          setUser((x) => ({ ...x, password: e.target.value ?? "" }));
        }}
        updateFormValue={updateFormValue}
      />

      <div>
        <SelectBox
          value={selectedDepo}
          onChange={handleDepoChange}
          options={depolar}
          labelTitle="Depo Seçiniz"
          placeholder="Seçiniz"
          containerStyle="w-72"
          labelStyle="visible"
        />
      </div>
      <ErrorText styleClass="mt-16">{"errorMessage"}</ErrorText>
      <div className="modal-action">
        <button className="btn btn-ghost" onClick={() => closeModal()}>
          Çık
        </button>
        <button
          className="btn btn-primary px-6"
          onClick={() => handleAddPerson()}
        >
          Kaydet
        </button>
      </div>
    </>
  );
}

export default AddUser;
