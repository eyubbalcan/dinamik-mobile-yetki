import { useDispatch } from "react-redux";
import ToogleInput from "../../components/Input/ToogleInput";
import TitleCard from "../../components/Cards/TitleCard";
import InputText from "../../components/Input/InputText";
import { showNotification } from "../../features/common/headerSlice";
import SelectBox from "../../components/Input/SelectBox";
// import { useState } from "react";

function Profile({ user }) {
  const dispatch = useDispatch();
  // const [dis, setDis] = useState([]);
  console.log(1, user);

  // Call API to update profile settings changes
  const updateProfile = () => {
    dispatch(showNotification({ message: "Profile Updated", status: 1 }));
  };

  const updateFormValue = ({ updateType, value }) => {
    console.log(updateType);
  };

  return (
    <>
      {user !== null && user !== undefined && (
        <TitleCard title="Profil Ayarları" topMargin="mt-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputText
              labelTitle="Kullanıcı Adı"
              defaultValue={user.username}
              updateFormValue={updateFormValue}
            />
            <InputText
              labelTitle="Şifre"
              defaultValue="123"
              type="password"
              updateFormValue={updateFormValue}
            />
            <ToogleInput
              updateType="syncData"
              labelTitle="Aktiflik Durumu"
              defaultValue={true}
              updateFormValue={updateFormValue}
            />
          </div>
          <div className="divider"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SelectBox
              options={[]}
              labelTitle="Depo Seçiniz"
              placeholder="Seçiniz"
              containerStyle="w-80"
              labelStyle="visible"
              defaultValue="TODAY"
              updateFormValue={updateFormValue}
            />
          </div>

          <div className="mt-16">
            <button
              className="btn btn-primary float-right"
              onClick={() => updateProfile()}
            >
              Güncelle
            </button>
          </div>
        </TitleCard>
      )}
    </>
  );
}
export default Profile;
