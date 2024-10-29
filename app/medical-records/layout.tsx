"use client";
// app/dashboard/layout.tsx
import { ReactNode } from "react";
import Sidebar from "@/app/medical-records/Sidebar";
import React, { useState } from "react";

import { Icon } from "@iconify/react";
import { Layout, Menu, theme } from "antd";
import { useRouter, usePathname } from "next/navigation";

import PatientList from "./PatientList";
import HeaderContent from "./HeaderContent";

const { Header, Content, Footer, Sider } = Layout;

interface PatientLayoutProps {
  children: ReactNode;
}

const PatientDashboardLayout = ({ children }: PatientLayoutProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const pathname = usePathname();
  const router = useRouter();
  const handleClick = (path: string) => {
    router.push(path); // Navigate to the specified route
  };
  return (
    <div className="">
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
            selectedKeys={[pathname]}
            defaultSelectedKeys={["1"]}
            items={[
              {
                key: "/medical-records",
                icon: (
                  <Icon
                    icon="streamline:medical-files-report-history"
                    width="1rem"
                    height="1rem"
                  />
                ),
                label: "Medical Records",
                onClick: () => handleClick("/medical-records"),
              },
              {
                key: "/medical-records/upload",
                icon: (
                  <Icon
                    icon="material-symbols-light:upload"
                    width="1rem"
                    height="1rem"
                  />
                ),
                label: "Upload Record",
                onClick: () => handleClick("/medical-records/upload"),
              },
              {
                key: "/profile",
                icon: (
                  <Icon
                    icon="tdesign:user-setting"
                    width="1rem"
                    height="1rem"
                  />
                ),
                label: "Profile",
                onClick: () => handleClick("/profile"),
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
              <div className="flex justify-end">{/* <UploadDocument /> */}</div>
              <div>
                <main className="content mt-3">{children}</main>
              </div>
            </div>
          </Content>
          {/* <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer> */}
        </Layout>
      </Layout>
    </div>
  );
};

export default PatientDashboardLayout;
