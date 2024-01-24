import {Table} from 'antd';

import { columns } from "./columns";
import Filters from "../filters";
import {useEffect, useMemo, useState} from "react";
import AddNewUser from "../AddNewUser";

const UsersLayout = ({ filterValue, setFilterValue, users: { users = [], pagination = {} } = {}, addNewUser, addUserData }) => {

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
            <Table columns={columns} dataSource={data} />
        </>
    );
};

export default UsersLayout;