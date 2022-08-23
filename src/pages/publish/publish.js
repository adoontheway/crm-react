import { useStore } from "../../store"
import { PlusOutlined } from "@ant-design/icons"
import { Breadcrumb, Button, Card, Form, Input, Radio, Select, Space, Upload } from "antd"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import { Link } from "react-router-dom"

import './publish.scss'
import { observer } from "mobx-react-lite"
import { useState } from "react"

const {Option} = Select;

const Publish = ()=>{
    const [imgCount, setImgCount] = useState(1)
    const onRadioChange = (e)=>{
        setImgCount(e.target.value)
    }

    const [fileList, setFileList] = useState([])
    const onUploadChange = (result) => {
        const _fileList = result.fileList.map(file => {
            if(file.response){
                return {
                    url: file.response.data.url
                }
            }
            return file
        })
        setFileList(_fileList)
    }
    const {channelStore} = useStore();
    return (
        <div className="publish">
            <Card
                title={
                    <Breadcrumb separator='>'>
                        <Breadcrumb.Item>
                            <Link to='/home'>首页</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            发布文章
                        </Breadcrumb.Item>
                    </Breadcrumb>
                }
            >
                <Form
                    labelCol={{span:4}}
                    wrapperCol={{span:16}}
                    initialValues={{type:1}}
                >
                    <Form.Item
                        label='标题'
                        name='title'
                        rules={[
                            {
                                required:true,
                                message:'请输入文章标题'
                            }
                        ]}
                    >
                        <Input placeholder="请输入文章标题" style={{width:400}}/>
                    </Form.Item>

                    <Form.Item 
                        label="频道" 
                        name="channel_id"
                        rules={[
                            {
                                required:true,
                                message:"请选择文章频道"
                            }
                        ]}
                    >
                        <Select
                            placeholder="请选择文章频道"
                            style={{width:400}}
                        >
                            {channelStore.channelList.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
                            
                        </Select>
                    </Form.Item>

                    <Form.Item label="封面">
                        <Form.Item name='type'>
                            <Radio.Group
                                value={imgCount}
                                onChange={onRadioChange}
                            >
                                <Radio value={1}>单图</Radio>
                                <Radio value={3}>三图</Radio>
                                <Radio value={0}>无图</Radio>
                            </Radio.Group>
                        </Form.Item>
                        {imgCount > 0 && <Upload 
                            name="image" 
                            listType="picture-card" 
                            className="avatar-uploader" 
                            showUploadList
                            action='http://geek.itheima.net/v1_0/upload'
                            fileList={fileList}
                            onChange={onUploadChange}
                            maxCount={imgCount}
                        >
                            <div style={{marginTop:8}}>
                                <PlusOutlined /> 
                            </div>
                        </Upload>
                    }
                        
                    </Form.Item>
                    <Form.Item 
                        label='内容' 
                        name='content' 
                        rules={[
                            {
                                required: true,
                                message: '请输入文章内容'
                            }
                        ]}
                    >
                        <ReactQuill 
                            theme="snow" 
                            className="publish-quill"
                            placeholder="请输入文章内容"
                        />
                    </Form.Item>
                    <Form.Item wrapperCol={{offset:4}}>
                        <Space>
                            <Button size="large" type="primary" htmlType="submit">
                                发布文章
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default observer(Publish) 