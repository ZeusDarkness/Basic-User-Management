/*
* Author: Hỏi Dân IT - @hoidanit   
 
* This source code is developed for the course 
* "Java Spring RESTful APIs - Xây Dựng Backend với Spring Boot". 
* It is intended for educational purposes only. 
* Unauthorized distribution, reproduction, or modification is strictly prohibited. 
* 
* Copyright (c) 2025 Hỏi Dân IT. All Rights Reserved. 
*/

import { App, Modal } from "antd"
import { Input } from 'antd';
import { useState } from "react";
import { createUserApi } from "../../services/api";

interface IProps {
    openCreateModal: boolean;
    setOpenCreateModal: (v: boolean) => void;
    fetchUsers: any;
}
const CreateUserModal = (props: IProps) => {
    const { notification, message } = App.useApp();

    const { openCreateModal, setOpenCreateModal, fetchUsers } = props;
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const res = await createUserApi(name, email);
            if (res.data.data) {
                message.success("Tạo mới user thành công.");
                setOpenCreateModal(false);
                setName("");
                setEmail("");
                await fetchUsers();
            }
        } catch (error: any) {
            const m = error?.response?.data?.message ?? "unknow";
            notification.error({
                message: "Có lỗi xảy ra",
                description: m
            })
        }


        setLoading(false)
    }

    return (
        <Modal
            title="Create a new user"
            maskClosable={false}
            open={openCreateModal}
            onOk={handleSubmit}
            onCancel={() => {
                setOpenCreateModal(false)
            }}
            okText={"Save"}
            okButtonProps={{
                loading: loading
            }}
        >
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 15 }}>
                <span>Name:</span>
                <Input
                    value={name}
                    onChange={(v) => setName(v.target.value)}
                />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <span>Email:</span>
                <Input
                    value={email}
                    onChange={(v) => setEmail(v.target.value)}
                />
            </div>
        </Modal>
    )
}

export default CreateUserModal;