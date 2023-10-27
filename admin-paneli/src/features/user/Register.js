import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import LandingIntro from "./LandingIntro";
import ErrorText from "../../components/Typography/ErrorText";
import InputText from "../../components/Input/InputText";
import axios from "axios";

function Register() {
  const [newUser, setNewUser] = useState({
    id: 0,
    username: "",
    isActive: true,
    warehouseNo: 0,
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleAddPerson = () => {
    console.log(newUser);
    axios

      .post("http://localhost:5139/api/AuthUser", newUser)
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
  };

  const submitForm = (e) => {
    e.preventDefault();
    setErrorMessage("");
  };

  const updateFormValue = ({ updateType, value }) => {
    setNewUser((x) => ({ ...x, [updateType]: value }));
  };
  return (
    <div className="min-h-screen bg-base-200 flex items-center">
      <div className="card mx-auto w-full max-w-5xl  shadow-xl">
        <div className="grid  md:grid-cols-2 grid-cols-1  bg-base-100 rounded-xl">
          <div className="">
            <LandingIntro />
          </div>
          <div className="py-24 px-10">
            <h2 className="text-2xl font-semibold mb-2 text-center">
              Kayıt Ol
            </h2>
            <form onSubmit={(e) => submitForm(e)}>
              <div className="mb-4">
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
              </div>

              <ErrorText styleClass="mt-8">{errorMessage}</ErrorText>
              <button
                onClick={() => {
                  handleAddPerson();
                }}
                type="submit"
                className={
                  "btn mt-2 w-full btn-primary" + (loading ? " loading" : "")
                }
              >
                Kaydet
              </button>

              <div className="text-center mt-4">
                Zaten hesabınız var mı?{" "}
                <Link to="/app/welcome">
                  <span className="  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">
                    Giriş
                  </span>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
