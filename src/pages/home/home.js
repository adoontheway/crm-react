import Bar from "../../components/bar"

const Home = ()=>{
    
    
    return (
        <div>  
            <Bar 
                title='主流框架使用满意度' 
                xData={['react','vue','angular']} 
                yData={[30,40,50]} 
                style={{width:'500px',height:'400px'}}
            />

<Bar 
                title='这个是瞎掰的' 
                xData={['react','vue','angular']} 
                yData={[50,100,60]} 
                style={{width:'400px',height:'300px'}}
            />
        </div>
    )
}

export default Home