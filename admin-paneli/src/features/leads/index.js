import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TitleCard from "../../components/Cards/TitleCard";
import { openModal } from "../common/modalSlice";
import { deleteLead, getLeadsContent } from "./leadSlice";
import {
  CONFIRMATION_MODAL_CLOSE_TYPES,
  MODAL_BODY_TYPES,
} from "../../utils/globalConstantUtil";
// import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
// import { showNotification } from "../common/headerSlice";
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
  const { leads } = useSelector((state) => state.lead);
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

//   const getDummyStatus = (index) => {
//     if (index % 5 === 0) return <div className="badge">Not Interested</div>;
//     else if (index % 5 === 1)
//       return <div className="badge badge-primary">In Progress</div>;
//     else if (index % 5 === 2)
//       return <div className="badge badge-secondary">Sold</div>;
//     else if (index % 5 === 3)
//       return <div className="badge badge-accent">Need Followup</div>;
//     else return <div className="badge badge-ghost">Open</div>;
//   };

//   const deleteCurrentLead = (index) => {
//     dispatch(
//       openModal({
//         title: "Confirmation",
//         bodyType: MODAL_BODY_TYPES.CONFIRMATION,
//         extraObject: {
//           message: `Are you sure you want to delete this lead?`,
//           type: CONFIRMATION_MODAL_CLOSE_TYPES.LEAD_DELETE,
//           index,
//         },
//       })
//     );
//   };

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
                      <Link to="/yetki">
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
