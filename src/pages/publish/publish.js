import { useStore } from "../../store"
import { PlusOutlined } from "@ant-design/icons"
import { Breadcrumb, Button, Card, Form, Input, message, Radio, Select, Space, Upload } from "antd"
import ReactQuill from "react-quill"

import { Link, useNavigate, useSearchParams } from "react-router-dom"


import { observer } from "mobx-react-lite"
import { useEffect, useRef, useState } from "react"
import { http } from "../../utils"

import './publish.scss'
import "react-quill/dist/quill.snow.css"

const {Option} = Select;

const Publish = ()=>{
    
    const [params] = useSearchParams();
    const article_id = params.get('id');
    const formRef = useRef(null)
    useEffect(()=>{
        const loadDetail = async ()=>{
            let res = await http.get(`/mp/articles/${article_id}`)
            const {cover,...formValue} = res.data
            formRef.current.setFieldsValue({
                ...formValue,
                type: cover.type
            })
            setImgCount(res.data.cover.type)
            fileListRef.current = res.data.cover.images.map((el)=>{return {url:el}})
            setFileList(fileListRef.current)
        }
        if(article_id)
            loadDetail()
    },[article_id, formRef])

    const [imgCount, setImgCount] = useState(1)
    const onRadioChange = (e)=>{
        let count = e.target.value
        setImgCount(count)
        // 从仓库取图片
        if(count === 1){
            if(fileListRef.current.length > 0){
                setFileList([fileListRef.current[0]])
            }
        }else if(count === 3){
            if(fileListRef.current.length !== 0){
                setFileList(fileListRef.current)
            }
        }
        
    }
    // 不止可以用于引用页面元素，还可以作为暂存仓库
    const fileListRef = useRef([]);
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
        fileListRef.current = _fileList
        setFileList(_fileList)
    }
    const navigate = useNavigate()
    // submit
    const onFinished = async (values)=>{
        console.log(values)
        const p = {
            ...values,
            cover: {
                type:values.type,
                images:(fileList.map((img)=>img.url))
            }
        }
        if(article_id){
            await http.put(`/mp/articles/${article_id}?draft=false`,p)
        }else{
            await http.post('/mp/articles?draft=false',p)
        }
        navigate('/article')
        message.success('发布成功')
    }
    // read channel list from channelStore
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
                            {article_id ? '编辑':'发布'}文章
                        </Breadcrumb.Item>
                    </Breadcrumb>
                }
            >
                <Form
                    labelCol={{span:4}}
                    wrapperCol={{span:16}}
                    initialValues={{type:1}}
                    onFinish={onFinished}
                    ref={formRef}
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
                            multiple={imgCount > 1}
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
                            {article_id ? '编辑':'发布'}文章
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default observer(Publish) 