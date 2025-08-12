import { App, Input, Modal } from "antd";
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
                message.success("Create user successfully");
                setOpenCreateModal(false);
                setName("");
                setEmail("");
                await fetchUsers();
            }
        } catch (error: any) {
            const m = error?.response?.data?.message ?? "unknow";
            notification.error({
                message: "Co loi xay ra",
                description: m,
            });
        }

        setLoading(false);
    };
    return (
        <Modal
            title="Create a new user"
            maskClosable={false}
            closable={{ "aria-label": "Custom Close Button" }}
            open={openCreateModal}
            onOk={handleSubmit}
            onCancel={() => {
                setOpenCreateModal(false);
            }}
            okText={"Save"}
            okButtonProps={{ loading: loading }}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                    marginBottom: 15,
                }}
            >
                <span>Name: </span>
                <Input value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <span>Email: </span>
                <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
        </Modal>
    );
};

export default CreateUserModal;
