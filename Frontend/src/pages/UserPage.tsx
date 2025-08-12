import {
    DeleteOutlined,
    EditOutlined,
    PlusCircleOutlined,
} from "@ant-design/icons";
import { Button, Table } from "antd";
import { useEffect, useState } from "react";
import CreateUserModal from "../components/modal/CreateUserModal";
import { getUsersApi } from "../services/api";
import UpdateUserModal from "../components/modal/UpdateUserModal";
interface IUser {
    id: number;
    name: string;
    email: string;
}
const UserPage = () => {
    const [users, setUsers] = useState<IUser[]>([]);
    const [dataUpdate, setDataUpdate] = useState<IUser | null>(null);
    const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);
    const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);
    const fetchUsers = async () => {
        const res = await getUsersApi();
        if (res?.data?.status === "success") {
            setUsers(res.data.data);
        }
    };
    useEffect(() => {
        fetchUsers();
    }, []);
    const handleEditUser = (data: IUser) => {
        setDataUpdate(data);
        setOpenUpdateModal(true);
    };
    const handleDeleteUser = () => {};

    const columns = [
        {
            title: "Id",
            dataIndex: "id",
        },
        {
            title: "Name",
            dataIndex: "name",
        },
        {
            title: "Email",
            dataIndex: "email",
        },
        {
            title: "Action",
            render: (_: string, record: IUser) => {
                return (
                    <div
                        style={{
                            display: "flex",
                            gap: 20,
                        }}
                    >
                        <EditOutlined
                            onClick={() => handleEditUser(record)}
                            style={{ color: "orange", cursor: "pointer" }}
                        />
                        <DeleteOutlined
                            style={{ color: "red", cursor: "pointer" }}
                        />
                    </div>
                );
            },
        },
    ];
    return (
        <div style={{ padding: 10 }}>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <h3>Table Users</h3>
                <Button
                    type="primary"
                    icon={<PlusCircleOutlined />}
                    onClick={() => setOpenCreateModal(true)}
                >
                    Add User
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
    );
};

export default UserPage;
