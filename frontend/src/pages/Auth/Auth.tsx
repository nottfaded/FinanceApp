import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Button, Card, Checkbox, Form, Input, message, Typography } from "antd";
import ROUTES from "../../config/routes";
import { useUserStore } from "../../hooks/useUserStore";
import { useNavigate } from "react-router-dom";

export function Auth() {
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const state  = useUserStore();
    const navigate = useNavigate();

    const onLogin = async () => {
        try {
            await form.validateFields();

            messageApi.open({
                key: 'login',
                type: 'loading',
                content: 'Loading...'
            });

            setTimeout(() => {
                messageApi.open({
                    key: 'login',
                    type: 'success',
                    content: 'Success!',
                    duration: 2
                });

                state.setUserData({
                    email: 'example@gmail.com'
                })
                // form.setFields([
                //     {
                //         name: 'email',
                //         errors: ['error']
                //     }
                // ])

                navigate(ROUTES.main);
            }, 1500)
        }
        catch (_) { }
    }
    const onRegister = async () => {
        try {
            await form.validateFields();

            messageApi.open({
                key: 'login',
                type: 'loading',
                content: 'Loading...'
            });

            setTimeout(() => {
                messageApi.open({
                    key: 'login',
                    type: 'success',
                    content: 'Success!',
                    duration: 2
                });

                state.setUserData({
                    email: form.getFieldValue('email')
                })

                navigate(ROUTES.main);
            }, 1500)
        }
        catch (_) { }
    }

    return (
        <div className="min-h-screen flex justify-center items-center text-center">
            {contextHolder}

            <Card
                className="w-80 sm:w-96"
            >
                <Typography.Title className="pb-2" level={4} underline={true}>Sign in to your account</Typography.Title>

                <Form
                    form={form}
                    name="auth"
                    initialValues={{ remember: true }}
                    style={{ maxWidth: 360 }}
                >
                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: 'Please input your Email!' }]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="Email" size="large" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your Password!' }]}
                    >
                        <Input prefix={<LockOutlined />} type="password" placeholder="Password" size="large" />
                    </Form.Item>

                    <Form.Item>
                        <div className="flex justify-between">
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item>
                            <a href="">Forgot password</a>
                        </div>

                    </Form.Item>

                    <Form.Item>
                        <div className="flex justify-around">
                            <Button className="w-5/12" type="primary" onClick={onLogin}>
                                Login
                            </Button>
                            <Button className="w-5/12" type="primary" onClick={onRegister}>
                                Register
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}