import { useEffect, useState } from "react";
import TitleCard from "../../components/Cards/TitleCard";
import axios from "axios";
import { Link } from "react-router-dom";
import AddUser from "./components/AddUser";

function Leads() {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [newUser, setNewUser] = useState({
    id: 0,
    username: "",
    isActive: true,
    warehouseNo: 0,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://192.168.1.40:5139/api/AuthUser/GetUsers"
      );
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleClose = () => setShow(false);
  const openAddUserModal = () => {
    setShow(true);
    setNewUser({
      id: 0,
      username: "",
      isActive: true,
      wareHouseNo: 0,
    });
  };

  return (
    <>
      <div className="main-title home-wrapper">
        <div></div>
      </div>
      <TitleCard
        title="Kullanıcılar"
        topMargin="mt-2"
        TopSideButtons={
          <button
            onClick={openAddUserModal}
            className="btn px-6 btn-sm normal-case btn-primary"
          >
            Ekle
          </button>
        }
      >
        {/* Leads List in table format loaded from slice after api call */}
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Kullanıcı</th>
                <th>Aktiflik</th>
                <th>Yetki</th>
              </tr>
            </thead>
            <tbody>
              {data.map((l, k) => {
                return (
                  <tr key={k}>
                    <td>
                      <p>{l.username}</p>
                    </td>
                    <td>{l.isActive}</td>
                    <td>
                      <Link
                        className="btn px-6 btn-sm normal-case btn-primary"
                        to={`/app/authority/${l.id}`}
                      >
                        Düzenle
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </TitleCard>
      <div className={`modal ${show ? "modal-open" : ""}`}>
        <div className={`modal-box  ${data === "lg" ? "max-w-5xl" : ""}`}>
          <h1 className="  text-center text-2xl sm:text-3xl ">
            Yeni Kullanıcı
          </h1>
          <AddUser
            user={newUser}
            setUser={setNewUser}
            handleClose={handleClose}
          />
        </div>
      </div>
    </>
  );
}

export default Leads;
