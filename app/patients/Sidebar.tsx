"use client";
import React, { useState } from "react";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Icon } from "@iconify/react";
import { Layout, Menu, theme } from "antd";

import UploadDocument from "./UploadDocument";
import PatientList from "./PatientList";
import HeaderContent from "./HeaderContent";

const { Header, Content, Footer, Sider } = Layout;

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout className="min-h-screen">
      <Sider
        breakpoint="md"
        collapsedWidth="80"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        theme="light"
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: (
                <Icon
                  icon="streamline:medical-files-report-history"
                  width="1rem"
                  height="1rem"
                />
              ),
              label: "Medical Records",
            },
            {
              key: "2",
              icon: (
                <Icon
                  icon="material-symbols-light:upload"
                  width="1rem"
                  height="1rem"
                />
              ),
              label: "Upload Medical Records",
            },
            {
              key: "3",
              icon: (
                <Icon
                  icon="iconamoon:profile-light"
                  width="1rem"
                  height="1rem"
                />
              ),
              label: "Profile",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ background: colorBgContainer }}>
          <HeaderContent />
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <div className="flex justify-end">
              <UploadDocument />
            </div>
            <div>
              <PatientList></PatientList>
            </div>
          </div>
        </Content>
        {/* <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer> */}
      </Layout>
    </Layout>
  );
};

export default App;
