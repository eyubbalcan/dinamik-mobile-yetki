import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import TitleCard from "../../components/Cards/TitleCard";
import { openModal } from "../common/modalSlice";
import { getLeadsContent } from "./leadSlice";
import { MODAL_BODY_TYPES } from "../../utils/globalConstantUtil";
import axios from "axios";
import { Link } from "react-router-dom";

const TopSideButtons = () => {
  const dispatch = useDispatch();

  const openAddNewLeadModal = () => {
    dispatch(
      openModal({
        title: "Add New Lead",
        bodyType: MODAL_BODY_TYPES.LEAD_ADD_NEW,
      })
    );
  };

  return (
    <div className="inline-block float-right">
      <button
        className="btn px-6 btn-sm normal-case btn-primary"
        onClick={() => openAddNewLeadModal()}
      >
        Kullanıcı Ekle
      </button>
    </div>
  );
};

function Leads() {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  useEffect(() => {
    dispatch(getLeadsContent());
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://192.168.1.40:5143/api/AuthUser");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <TitleCard
        title="Current Leads"
        topMargin="mt-2"
        TopSideButtons={<TopSideButtons />}
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
                      <Link to="/app/auth123">
                        <button className="btn px-6 btn-sm normal-case btn-primary">
                          Düzenle
                        </button>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </TitleCard>
    </>
  );
}

export default Leads;
