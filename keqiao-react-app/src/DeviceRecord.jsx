import React from 'react'
import { Toast } from 'antd-mobile'
// import './App.css';


export default class DeviceRecord extends React.Component {
    constructor(props) {
      super(props);
      console.log(props);
      this.state = {
        features: {}
      };
    }
  
    componentWillMount() {
      this.getDatas(); 
    }

    getDatas() {
      Toast.loading('正在加载...', 0, null, true)
      console.log('请求数据！');
    //   Toast.loading('正在加载...', 0, null, true)
    // fetch('http://192.168.10.245:6086/ServiceEngine/rest/services/CustomServer/getPumpEquipDataByGid?gid=1022&access_token=eyJ1c2VyTmFtZSI6ImFkbWluIiwidGltZSI6IjIwMjAtMTItMDEgMDk6MjY6MjIifQ==' + this.props.location.query.token, {
    //   method: "GET"
    // }).then((res) => {
    //   return res.json(); //请求成功，获请求元数据
    // }).then((result) => {
    //   console.log(result)
  
    //   Toast.hide()
    // }).catch((err) => {
    //   console.log(err)
    //   Toast.hide()
    // })
  }

  render(){
      return(
        <div>
            <h1>我是设备台账信息！!!!</h1>
            {/* <Button>Start</Button> */}
        </div>
      )
  }
}
