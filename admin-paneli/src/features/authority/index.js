import TitleCard from "../../components/Cards/TitleCard";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Profile from "../../pages/authority/Profile";

function Authority() {
  return (
    <>
      <TitleCard title="Yetkilendirme Sayfası" topMargin="mt-2">
        <div className="overflow-x-auto w-full">
          <Tabs>
            <TabList>
              <Tab>Profil</Tab>
              <Tab>Vergi</Tab>
            </TabList>
            <TabPanel>
              <Profile />
            </TabPanel>
            <TabPanel>Vergi modülü yüklenecek</TabPanel>
          </Tabs>
        </div>
      </TitleCard>
    </>
  );
}

export default Authority;
