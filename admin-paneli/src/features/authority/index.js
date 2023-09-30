import TitleCard from "../../components/Cards/TitleCard";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Profile from "../../pages/authority/Profile";
import Modul from "../../pages/authority/Modul";

function Authority() {
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
              <Profile />
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
