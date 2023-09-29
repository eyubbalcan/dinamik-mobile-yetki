import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import InputText from "../../../components/Input/InputText";
import ErrorText from "../../../components/Typography/ErrorText";
import { showNotification } from "../../common/headerSlice";
import { addNewLead } from "../leadSlice";
import SelectBox from "../../../components/Input/SelectBox";
import CheckBox from "../../../components/Input/CheckBox";
import axios from "axios";

const INITIAL_LEAD_OBJ = {
  first_name: "",
  password: "",
  email: "",
};

function AddLeadModalBody({ closeModal, user, setUser }) {
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    isActive: true,
    warehouseNo: 0,
  });
  const [depolar, setDepolar] = useState([]);
  const [selectedDepo, setSelectedDepo] = useState(0);

  const [errorMessage, setErrorMessage] = useState("");
  const [leadObj, setLeadObj] = useState(INITIAL_LEAD_OBJ);

  const handleAddPerson = () => {
    axios
      .post("http://192.168.1.40:5143/api/AuthUser", newUser)
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

    setShow(false);
  };
  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setLeadObj({ ...leadObj, [updateType]: value });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://192.168.1.40:5143/api/AuthUser");
      setData(response.data);

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

  const handleDepoChange = (event) => {
    setSelectedDepo(event.target.value);
    setUser((x) => ({ ...x, wareHouseNo: Number(event.target.value ?? 0) }));
  };
  return (
    <>
      <InputText
        type="text"
        defaultValue={leadObj.first_name}
        updateType="first_name"
        containerStyle="mt-4"
        labelTitle="Kullanıcı Adı"
        updateFormValue={updateFormValue}
      />

      <InputText
        type="text"
        defaultValue={leadObj.last_name}
        updateType="last_name"
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
          containerStyle="w-72"
          labelStyle="visible"
          defaultValue="TODAY"
          updateFormValue={updateFormValue}
        />
      </div>
      {console.log(depolar)}
      <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
      <div className="modal-action">
        <button className="btn btn-ghost" onClick={() => closeModal()}>
          Çık
        </button>
        <button
          className="btn btn-primary px-6"
          onClick={() => handleAddPerson()}>
          Kaydet
        </button>
      </div>
    </>
  );
}

export default AddLeadModalBody;
