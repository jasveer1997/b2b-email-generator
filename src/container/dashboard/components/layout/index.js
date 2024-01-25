import {Table} from 'antd';

import { columns } from "./columns";
import Filters from "../filters";
import React, {useEffect, useMemo, useState} from "react";
import AddNewUser from "../AddNewUser";
import SkeletonGrid from "../skeletonLoader";

const UsersLayout = ({ usersData, filterValue, setFilterValue, addNewUser, addUserData }) => {

    const { users: { users = [], pagination = {} } = {} } = usersData;
    const data = useMemo(() => {
        return users.map(user => {
            return {
                name: user.name.first_name + " " + user.name.last_name,
                domain: user.domain.name,
                email: user.email
            }
        })
    }, [users]);

    return (
        <>
            <span>
                <Filters filterValue={filterValue} setFilterValue={setFilterValue} />
                <AddNewUser addNewUser={addNewUser} addUserData={addUserData} />
            </span>
            {(usersData.isLoading || !usersData.loaded) ? <SkeletonGrid active /> : <Table columns={columns} dataSource={data} />}

        </>
    );
};

export default UsersLayout;