import { useDispatch } from "react-redux";
import ToogleInput from "../../components/Input/ToogleInput";
import TitleCard from "../../components/Cards/TitleCard";
import { showNotification } from "../../features/common/headerSlice";
import axios from "axios";
import { useState, useEffect, useMemo } from "react";
import _ from "lodash";

function Modul({ user }) {
  const dispatch = useDispatch();
  const [claims, setClaims] = useState([]);
  const [userClaims, setUserClaims] = useState([]);

  useEffect(() => {
    fetchClaims();
  }, []);

  useEffect(() => {
    if (claims.length > 0) {
      fetchUserClaims();
    }
    // eslint-disable-next-line
  }, [claims]);

  const fetchClaims = async () => {
    try {
      const response = await axios.get(
        "http://192.168.1.40:5139/api/AuthUser/GetAuthority"
      );
      setClaims(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchUserClaims = async () => {
    try {
      const response = await axios.get(
        `http://192.168.1.40:5139/api/AuthUser/GetClaims/${user.id}`
      );
      setUserClaims(response.data.Claims);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const updateProfile = () => {
    dispatch(showNotification({ message: "Profile Updated", status: 1 }));

    axios
      .post("http://192.168.1.40:5139/api/AuthUser/PostClaims", {
        userId: user.id,
        claims: userClaims,
      })
      .then((response) => {
        if (response.data.Status) {
          dispatch(showNotification({ message: "Eklendi", status: 1 }));
        } else {
          console.log(response.data.Mesaj);
        }
      })
      .catch((error) => {
        console.error("Veri gönderme hatası:", error);
      });
  };

  const updateFormValue = ({ updateType, value }) => {
    if (value && !userClaims.includes(updateType)) {
      setUserClaims((x) => [...x, updateType]);
    }
    if (!value && userClaims.includes(updateType)) {
      var newArray = userClaims.filter((x) => x !== updateType);
      setUserClaims([...newArray]);
    }
  };

  const showSwitch = useMemo(() => {
    if (claims.length > 0 && !_.isNil(userClaims) && _.isArray(userClaims)) {
      return (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 bg-slate-100">
            {claims.slice(1, 3).map((l, k) => (
              <ToogleInput
                key={k}
                updateType={l.name}
                labelTitle={l.description}
                defaultValue={userClaims.includes(l.name)}
                updateFormValue={updateFormValue}
              />
            ))}
          </div>
          <div className="divider"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 bg-slate-100">
            {claims.slice(4, 10).map((l, k) => (
              <ToogleInput
                key={k}
                updateType={l.name}
                labelTitle={l.description}
                defaultValue={userClaims.includes(l.name)}
                updateFormValue={updateFormValue}
              />
            ))}
          </div>
          <div className="divider"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 bg-slate-100">
            {claims.slice(10, 15).map((l, k) => (
              <ToogleInput
                key={k}
                updateType={l.name} 
                labelTitle={l.description}
                defaultValue={userClaims.includes(l.name)}
                updateFormValue={updateFormValue}
              />
            ))}
          </div>
        </>
      );
    } else return <></>;
    // eslint-disable-next-line
  }, [userClaims]);

  return (
    <>
      <TitleCard title="Modül Ayarları" topMargin="mt-2">
        {claims && showSwitch}
        <div className="divider"></div>
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
