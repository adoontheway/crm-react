import {Button, Card, Checkbox, Form, Input, message} from 'antd'
import logo from '../../assets/logo.png'

import './login.scss'

import { useStore } from '../../store'

import { useNavigate } from 'react-router-dom'

const Login = () => {
    
    const {loginStore} = useStore()
    const navigate = useNavigate()

    const onFinished = async (values) => {
        console.log("onFinished:", values)
        try{
            await loginStore.login({mobile:values.mobile,code:values.code})
            navigate("/", {replace: true})
            message.success("登陆成功")
        }catch(e){
            console.log("login error: ",e)
        }
        
    }
    const onFinishFailed = (errorInfo) => {
        console.log("onFinished:", errorInfo)
    }
    return (
        <div className='login'>
            <Card className='login-container'>
                <img className='login-logo' src={logo} alt=''/>
                {/** 登陆表单 */}
                <Form
                    validateTrigger={['onBlur','onChange']}
                    initialValues={{
                        mobile:'13811111111',
                        code:'246810',
                        remember: true
                    }}
                    onFinish={onFinished}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        name="mobile"
                        rules={[
                            {
                                required: true,
                                message:"请输入手机号码"
                            },
                            {
                                pattern: /^1[3-9]\d{9}$/,
                                message: "手机格式不对",
                                // validateTrigger: "onBlur"
                            }
                        ]}
                    >
                        <Input size='large' placeholder='请输入手机号' maxLength={11}/>
                    </Form.Item>
                    <Form.Item
                        name="code"
                        rules={[
                            {
                                required: true,
                                message:"请输入验证码",
                                validateTrigger: 'onBlur'
                            },
                            {
                                length:6,
                                message:"验证码6个字符"
                            }
                        ]}
                    >
                        <Input size='large' placeholder='请输入验证码' maxLength={6}/>
                    </Form.Item>
                    <Form.Item
                        name="remember"
                        valuePropName='checked'
                    >
                        <Checkbox className='login-checkbox-label'>
                        我已阅读并同意【用户协议】和【隐私条款】
                        </Checkbox>
                    </Form.Item>

                    <Form.Item>
                        <Button type='primary' htmlType='submit' size='large' block>
                            登陆
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default Login