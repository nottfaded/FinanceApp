import { Button, Segmented, Tabs, Typography } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { Express } from "./Express";


const items = [
  {
    key: 'express',
    label: 'Express',
  },
  {
    key: 'income',
    label: 'Income',
  },
];

export function Main() {
  const navigate = useNavigate();
  const location = useLocation();
  const activeTabKey = location.pathname.split("/").pop() || "express";

  const onTabChange = (key: string) => {
    navigate(`/main/${key}`);
  };

  return (
    <div className="size-full flex flex-col justify-center items-center text-center">
      <Button size="middle" className="mt-2">Total</Button>

      <div>
        <Typography.Title style={{ marginBottom: 0 }} level={3}>10000$</Typography.Title>
        <Tabs
          type="line"
          className="items-center"
          activeKey={activeTabKey}
          onChange={onTabChange}
          items={items}
          tabBarGutter={80}
          tabBarStyle={{
            margin: 0
          }}
        />
      </div>


      <Segmented className="mt-5" size="large" options={['Day', 'Week', 'Month', 'Year']} />


      <div className="size-full">
        {activeTabKey == 'express'
          ? <Express />
          : <div>nothing</div>
        }
      </div>


    </div>
  )
}