import React, {useEffect, useState} from 'react';
import { Button, Form, Input, Modal, notification } from 'antd';
import { validateName, validateDomain } from './validators';
const CollectionCreateForm = ({ loading, open, onCreate, onCancel }) => {
    const [form] = Form.useForm();

    return (
        <Modal
            open={open}
            title="Create a new user"
            okText="Create"
            cancelText="Cancel"
            onCancel={onCancel}
            confirmLoading={loading}
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        onCreate(values);
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
                        { validator: validateName },
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
                        { validator: validateName },
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
                        { validator: validateDomain },
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
    const [form] = Form.useForm();
    useEffect(() => {
        if(addUserData.loaded) {
            form.resetFields();
            setOpen(false);
            notification.success({
                duration: 3,
                message: "Added!",
                description: "Successfully added a new user",
                placement: 'top',
            });
        }
    }, [addUserData.loaded])

    useEffect(() => {
        if(addUserData.hasError) {
            notification.error({
                duration: 3,
                message: "Internal Server Error",
                description: "Failed to add user, please try again after some time",
                placement: 'top',
            });
        }
    }, [addUserData.hasError])

    return (
        <div>
            <Button
                type="primary"
                onClick={() => {
                    setOpen(true);
                }}
                loading={addUserData.isLoading}
            >
                Add New User
            </Button>
            <CollectionCreateForm
                open={open}
                loading={addUserData.isLoading}
                onCreate={addNewUser}
                onCancel={() => {
                    setOpen(false);
                }}
            />
        </div>
    );
};
export default App;

// Later - not handling middle name for now!