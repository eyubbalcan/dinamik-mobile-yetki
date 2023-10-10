import TitleCard from "../../components/Cards/TitleCard";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Profile from "../../pages/authority/Profile";
import Modul from "../../pages/authority/Modul";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

function Authority() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5145/api/AuthUser/GetUser/${id}`)
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);

  return (
    <>
      <TitleCard title="Yetkilendirme Sayfası" topMargin="mt-2">
        <div className="overflow-x-auto w-full">
          <Tabs>
            <TabList>
              <Tab>Profil</Tab>
              <Tab>Modüller</Tab>
            </TabList>
            <TabPanel>
              <Profile user={user} />
            </TabPanel>
            <TabPanel>
              <Modul />
            </TabPanel>
          </Tabs>
        </div>
      </TitleCard>
    </>
  );
}

export default Authority;
