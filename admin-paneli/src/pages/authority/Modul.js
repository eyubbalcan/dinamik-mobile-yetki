import { useDispatch } from "react-redux";
import ToogleInput from "../../components/Input/ToogleInput";
import TitleCard from "../../components/Cards/TitleCard";
import InputText from "../../components/Input/InputText";
import { showNotification } from "../../features/common/headerSlice";

function Modul() {
  const dispatch = useDispatch();

  // Call API to update profile settings changes
  const updateProfile = () => {
    dispatch(showNotification({ message: "Profile Updated", status: 1 }));
  };

  const updateFormValue = ({ updateType, value }) => {
    // console.log(updateType);
  };

  return (
    <>
      <TitleCard title="Modül Ayarları" topMargin="mt-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-300">
          <ToogleInput
            updateType="syncData"
            labelTitle="Stok Kartları"
            defaultValue={true}
            updateFormValue={updateFormValue}
          />
          <ToogleInput
            updateType="syncData"
            labelTitle="Cari Kartlar"
            defaultValue={true}
            updateFormValue={updateFormValue}
          />
    
        </div>

        <div className="divider"></div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 bg-slate-300">
        <ToogleInput
            updateType="syncData"
            labelTitle="Satış Siparişi"
            defaultValue={true}
            updateFormValue={updateFormValue}
          />
          <ToogleInput
            updateType="syncData"
            labelTitle="Alış Spiarişi"
            defaultValue={true}
            updateFormValue={updateFormValue}
          />
          <ToogleInput
            updateType="syncData"
            labelTitle="Satış İrsaliyesi"
            defaultValue={true}
            updateFormValue={updateFormValue}
          />

          <ToogleInput
            updateType="syncData"
            labelTitle="Alış İrsaliyesi"
            defaultValue={true}
            updateFormValue={updateFormValue}
          />
        </div>
        <div className="divider"></div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 bg-slate-300">
          <ToogleInput
            updateType="syncData"
            labelTitle="Satış Faturası"
            defaultValue={true}
            updateFormValue={updateFormValue}
          />
          <ToogleInput
            updateType="syncData"
            labelTitle="Alış Faturası"
            defaultValue={true}
            updateFormValue={updateFormValue}
          />
          <ToogleInput
            updateType="syncData"
            labelTitle="Satış İade Faturası"
            defaultValue={true}
            updateFormValue={updateFormValue}
          />
          <ToogleInput
            updateType="syncData"
            labelTitle="Toptan İade Çıkış İrsaliyesi"
            defaultValue={true}
            updateFormValue={updateFormValue}
          />
        </div>
        <div className="divider"></div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 bg-slate-300">
          <ToogleInput
            updateType="syncData"
            labelTitle="Sayım Sonuçları Giriş Fişi"
            defaultValue={true}
            updateFormValue={updateFormValue}
          />
          <ToogleInput
            updateType="syncData"
            labelTitle="Depolar Arası Sevk Fişi"
            defaultValue={true}
            updateFormValue={updateFormValue}
          />
          <ToogleInput
            updateType="syncData"
            labelTitle="Tekil Etiket Basımı"
            defaultValue={true}
            updateFormValue={updateFormValue}
          />
          <ToogleInput
            updateType="syncData"
            labelTitle="Toplu Etiket Basımı"
            defaultValue={true}
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
    </>
  );
}
export default Modul;
