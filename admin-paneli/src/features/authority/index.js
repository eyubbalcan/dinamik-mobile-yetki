import TitleCard from "../../components/Cards/TitleCard";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

function Authority() {
  return (
    <>
      <TitleCard
        title="Kullanıcılar"
        topMargin="mt-2"
      >
        <div className="overflow-x-auto w-full">
          <Tabs>
            <TabList>
              <Tab>Title 1 asdsad </Tab>
              <Tab>Title 2</Tab>
            </TabList>

            <TabPanel>
              <h2>Any content 1</h2>
            </TabPanel>
            <TabPanel>
              <h2>Any content 2</h2>
            </TabPanel>
          </Tabs>
        </div>
      </TitleCard>
    </>
  );
}

export default Authority;
