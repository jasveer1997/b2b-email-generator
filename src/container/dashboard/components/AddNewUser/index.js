import React, {useEffect, useState} from 'react';
import { Button, Form, Input, Modal } from 'antd';
const CollectionCreateForm = ({ open, onCreate, onCancel }) => {
    const [form] = Form.useForm();
    return (
        <Modal
            open={open}
            title="Create a new user"
            okText="Create"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        onCreate(values);
                        form.resetFields();
                    })
                    .catch((info) => {
                        console.log('Validate Failed:', info);
                    });
            }}
        >
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
                initialValues={{
                    modifier: 'public',
                }}
            >
                <Form.Item
                    name="first_name"
                    label="First Name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the first name!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="last_name"
                    label="Last Name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the last name!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="domain"
                    label="Domain"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the domain!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
};
const App = ({ addNewUser, addUserData }) => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if(addUserData.loaded) {
            setOpen(false);
        }
    }, [addUserData.loaded])

    return (
        <div>
            <Button
                type="primary"
                onClick={() => {
                    setOpen(true);
                }}
            >
                Add New User
            </Button>
            <CollectionCreateForm
                open={open}
                onCreate={addNewUser}
                onCancel={() => {
                    setOpen(false);
                }}
            />
        </div>
    );
};
export default App;