import { Breadcrumb, Card, Form, Radio, Select, Button, DatePicker, Tag, Space, Table,Popconfirm } from "antd"
import { Link, useNavigate } from "react-router-dom"
import 'moment/locale/zh-cn'
import locale from "antd/es/date-picker/locale/zh_CN"
import './article.scss'
import img404 from '../../assets/error.png'
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { useEffect, useState } from "react"
import { http } from "../../utils"
import { useStore } from "../../store"
import { observer } from "mobx-react-lite"
const { Option } = Select;
const { RangePicker } = DatePicker;
const Article = ()=>{
    const { channelStore} = useStore();
    // 文章列表信息
    const [articles, setArticles] = useState({
        list:[],
        count:0//文章数
    })

    const [params, setParams] = useState({
        page:1,
        per_page:10
    })

    const onPageChange = (page)=>{
        setParams({
            ...params,
            page
        })
    }

    const delArticle = async (data)=>{
        await http.get(`/mp/articles/${data.id}`)
        setParams({
            ...params,
            page:1
        })
    }
    const navigate = useNavigate()

    const goPublish = async (data) => {
        navigate(`/publish?id=${data.id}`)
    }

    useEffect(()=>{
        async function fetchArticleList(){
            const res = await http.get('/mp/articles',{params})
            const {results, total_count} = res.data
            setArticles({
                list: results,
                count: total_count
            })
        }
        fetchArticleList()
    },[params])

    
    const columns = [
        {
            title:"封面",
            dataIndex:'cover',
            render: cover => {
                return <img src={cover.images[0] || img404} width={200} height={150} alt=''/>
            }
        },
        {
            title:'标题',
            dataIndex: 'title',
            widht:220,
        },
        {
            title:'状态',
            dataIndex: 'status',
            render: data => <Tag color='green'>审核通过</Tag>
        },
        {
            title:'发布时间',
            dataIndex:'pubdate',
        },
        {
            title:'阅读数',
            dataIndex:'read_count',
        },
        {
            title:'点赞数',
            dataIndex:'like_count',
        },
        {
            title:'操作',
            render: data => {
                return (
                    <Space size='middle'>
                        <Button type="primary" shape="circle" icon={<EditOutlined/>} onClick={()=> goPublish(data)} />
                        <Popconfirm title="是否确认删除?" okText="删除" cancelText="取消"
                                onConfirm={()=>{delArticle(data)}} >
                                    <Button type='primary' danger shape='circle' icon={<DeleteOutlined />}/>
                        </Popconfirm>
                        
                    </Space>
                )
            }
        }
    ];

    const onFinish = (values) =>{
        const {status, channel_id, date} = values;
        const _params = {}
        if(status !== -1){
            _params.status = status
        }
        if(channel_id){
            _params.channel_id = channel_id
        }
        if(date){
            _params.begin_pubdate = date[0].format('YYYY-MM_DD')
            _params.end_pubdate = date[1].format('YYYY-MM_DD')
        }

        setParams({
            ...params,
            ..._params
        })
    }
    return (
        <div> 
            <Card
                title={<Breadcrumb separator=">">
                    <Breadcrumb.Item>
                        <Link to='/home'>首页</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>内容管理</Breadcrumb.Item>
                </Breadcrumb>}
                style={{marginBottom:20}}
            >
                <Form
                    initialValues={{status:-1}}
                    onFinish={onFinish}
                >
                    <Form.Item label="状态" name="status">
                        <Radio.Group>
                            <Radio value={-1}>全部</Radio>
                            <Radio value={0}>草稿</Radio>
                            <Radio value={1}>待审核</Radio>
                            <Radio value={2}>审核通过</Radio>
                            <Radio value={3}>审核失败</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item label="频道" name="channel_id">
                        <Select
                            placeholder="请选择文章频道"
                            // defaultValue="rose"
                            style={{width:200}}
                        >
                            {channelStore.channelList.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
                            
                        </Select>
                    </Form.Item>
                    <Form.Item label="日期" name="date">
                        <RangePicker locale={locale}/>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{marginLeft:80}}>
                            筛选
                        </Button>
                    </Form.Item>
                </Form>
            </Card>   
            <Card title={`根据筛选条件共查询到 ${articles.count} 条结果`}>
                <Table 
                    rowKey='id' 
                    columns={columns} 
                    dataSource={articles.list}
                    pagination={{
                        pageSize:params.per_page,
                        total: articles.count,
                        onChange: onPageChange
                    }}
                />
            </Card> 
        </div>
    )
}

export default observer(Article) 