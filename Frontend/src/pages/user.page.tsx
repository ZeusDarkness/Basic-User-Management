/*
* Author: Hỏi Dân IT - @hoidanit   
 
* This source code is developed for the course 
* "Java Spring RESTful APIs - Xây Dựng Backend với Spring Boot". 
* It is intended for educational purposes only. 
* Unauthorized distribution, reproduction, or modification is strictly prohibited. 
* 
* Copyright (c) 2025 Hỏi Dân IT. All Rights Reserved. 
*/

import { DeleteOutlined, EditOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Button, message, Popconfirm, Table } from "antd";
import { useEffect, useState } from "react";
import CreateUserModal from "../components/modal/create.user.modal";
import { deleteUserApi, getUsersApi } from "../services/api";
import UpdateUserModal from "../components/modal/update.user.modal";

interface IUser {
    id: number;
    name: string;
    email: string;
}
const UserPage = () => {

    const [users, setUsers] = useState<IUser[]>([]);
    const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);

    const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);
    const [dataUpdate, setDataUpdate] = useState<IUser | null>(null);

    const fetchUsers = async () => {
        const res = await getUsersApi();
        if (res?.data?.status === "success") {
            setUsers(res.data.data)
        }
    }
    useEffect(() => {
        fetchUsers();
    }, []);

    const handleClickEdit = (data: IUser) => {
        setDataUpdate(data);
        setOpenUpdateModal(true)
    }

    const handleClickDelete = async (data: IUser) => {
        const res = await deleteUserApi(data.id);
        if (res.data) {
            message.success("Xóa user thành công");
            await fetchUsers()
        }
    }


    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Action',
            render: (_: string, record: IUser) => {

                return (
                    <>
                        <EditOutlined
                            onClick={() => handleClickEdit(record)}
                            style={{
                                cursor: "pointer",
                                color: "orange",
                                marginRight: 10
                            }}
                        />
                        <Popconfirm
                            title="Delete the user"
                            description="Are you sure to delete this user?"
                            onConfirm={() => handleClickDelete(record)}
                            // onCancel={cancel}
                            okText="Yes"
                            cancelText="No"
                        >
                            <DeleteOutlined style={{
                                cursor: "pointer",
                                color: "red",
                            }} />
                        </Popconfirm>


                    </>
                )
            }
        },
    ];

    return (
        <div style={{ padding: 10 }}>
            <div style={{
                display: "flex",
                justifyContent: "space-between", alignItems: "center"
            }}>
                <h3>Table Users</h3>
                <Button
                    type="primary"
                    icon={<PlusCircleOutlined />}
                    onClick={() => setOpenCreateModal(true)}
                >
                    Add user
                </Button>
            </div>
            <Table
                bordered
                dataSource={users}
                columns={columns}
                rowKey={"id"}
            />
            <CreateUserModal
                openCreateModal={openCreateModal}
                setOpenCreateModal={setOpenCreateModal}
                fetchUsers={fetchUsers}
            />

            <UpdateUserModal
                openUpdateModal={openUpdateModal}
                setOpenUpdateModal={setOpenUpdateModal}
                fetchUsers={fetchUsers}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
            />
        </div>
    )


}

export default UserPage;