import React, {useEffect, useState} from "react";
import {Route, Routes} from "react-router-dom";

import {Layout, Menu} from 'antd';

import container from "./container";
import UsersLayout from "./components/layout";
import {SIDEBAR_ITEMS} from "./config/constants";
import DashboardFooter from "./components/footer";
import {ContentStyle, LayoutStyle, SideStyle, StyleFooter} from "./style";
import SkeletonGrid from "./components/skeletonLoader";

const { Header, Content, Footer, Sider } = Layout;

const DashboardRouting = props => {
    const { usersData, addUserData, fetchUsers, ...rest } = props;

    const [filterValue, setFilterValue] = useState([]);

    useEffect(() => {
        fetchUsers({ domains: filterValue.map(({ value }) => value) });
    }, [filterValue.length]);

    useEffect(() => {
        if (addUserData.loaded && !addUserData.hasError) {
            fetchUsers({ domains: filterValue })
        }
    }, [addUserData]);

    // Render loaders
    if (usersData.isLoading || !usersData.loaded) {
        return <SkeletonGrid active />;
    }

    return (
        <UsersLayout {...rest} filterValue={filterValue} setFilterValue={setFilterValue} addUserData={addUserData} users={usersData.users}/>
    );
};

const Dashboard = ({ userDetails, fetchUsers, ...rest }) => {
    const { usersData = {} } = rest;

    // fetch data
    useEffect(() => {
        if (!usersData.loaded && !usersData.isLoading) {
            fetchUsers();
        }
    }, [usersData.loaded]);

    return  (
        <Layout hasSider>
            <Sider {...SideStyle}>
                <div className="logo" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['2']} items={SIDEBAR_ITEMS} />
            </Sider>
            <Layout className="site-layout" {...LayoutStyle}>
                <div style={{ flex: 1 }}>
                    <Content {...ContentStyle}>
                        <DashboardRouting fetchUsers={fetchUsers} usersData={usersData} {...rest} />
                    </Content>
                </div>
                <Footer {...StyleFooter}>
                    <DashboardFooter />
                </Footer>
            </Layout>
        </Layout>
    );
}

export default container(Dashboard);

// Later/Future: Add Carousel of 3-4 images
// Later/Future: Add filters, Search, sort
// Later/future: Add itemCount to url/ls
