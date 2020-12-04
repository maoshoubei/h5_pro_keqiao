import React from 'react';
import { Toast, WhiteSpace } from 'antd-mobile'
import { connect, fetch } from 'dva'
import { List, Card, Image, Table , Button} from 'antd';
//import { setTitle } from '../events';

const imageUrl = "/map/pump/2020/12/4/5979f8cc-d3fe-4881-ad65-605131eb0110/icon_main_pic.jpg"
const requesturl = "ServiceEngine/rest/services/CustomServer/getPumpEquipDataByGid?gid=5900&access_token=eyJ1c2VyTmFtZSI6ImFkbWluIiwidGltZSI6IjIwMjAtMTItMDMgMTg6MjI6MTUifQ=="
const columns = [
  {
    title: '序号',
    dataIndex: 'no',
    key: 'no',
  },
  {
    title: '任务名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '养护内容',
    dataIndex: 'content',
    key: 'content',
  },
  {
    title: '养护情况',
    dataIndex: 'maintainInfo',
    key: 'maintainInfo',
  },
  {
    title: '执行日期',
    dataIndex: 'time',
    key: 'time',
  },
  {
    title: '养护人员',
    dataIndex: 'person',
    key: 'person',
  },
];


export default class DeviceRecord extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      maintainrecords: []
    }
  }

  componentDidMount() {
    //setTitle('隐患事件详情');
    this.init()
  }

  close(){
    Toast.info('关闭页面');
  }

  init = async () => {
    Toast.loading('加载中...', 0, () => { }, true);
    await fetch(requesturl)
      .then(res => res.json())
      .then(data => {
        Toast.hide();
        var tempDeviceBasicArray = [];
        var tempMaintainRecordArray = [];

        var featuresStr = data.features;
        for (var name in data.features) {
          var temp;
          if ("maintenanceRecords" == name) {
            temp = {
              key: "养护记录",
              value: ""
            }
            tempMaintainRecordArray = data.features[name]
          } else {
            temp = {
              key: name,
              value: data.features[name]
            }
          }
          tempDeviceBasicArray.push(temp);
        }

        var tempRecordArry = [];
        var i = 0;
        for (var j = 0; j < tempMaintainRecordArray.length; j++) {
          var maintainRecordObj = tempMaintainRecordArray[j];
          i++;
          var tempData = {
            key: i, 
            no: i,
            name: maintainRecordObj["planname"],
            content: maintainRecordObj["maintaincontent"],
            maintainInfo: maintainRecordObj["isfeedback"] == "0" ? "未完成" : "已完成",
            time: maintainRecordObj["maintaintime"],
            person: maintainRecordObj["maintainuser"],
          }

          tempRecordArry.push(tempData);
        }
      
        this.setState({
          items: tempDeviceBasicArray,
          maintainrecords: tempRecordArry
        })

      })
  }

  // getImgs = (imgs, model) => {
  //   // const { params = {} } = this.props.location;
  //   // const { imgHeight } = params;

  //   // return imgs.map((img, index) => (
  //   //   <div className={styles.detailBodyImg}>
  //   //     <ShowImg
  //   //       {...this.props}
  //   //       orderIndex={index}
  //   //       attactInfo={imgs.join(',')}
  //   //       type={'IMG'}
  //   //       height={imgHeight ? imgHeight : 83}
  //   //     />
  //   //   </div>
  //   // ));

  //   return imgs.map((img, index) => (
  //     <div>
  //       <img  id="ylimg" width="400px" height="400px" src={img}></img> 
  //     </div>
  //   ));
  // };

  getImgs = item => {
    // const imgArr = item.split(',');
    // console.log(imgArr);
    // //const { params = {} } = this.props.location;
    // //const { parprops = {} } = params;
    // return item == '' ? '' : imgArr.map((ite, index) => (
    //       // <div className={styles.detailBodyImg}>
    //       //   <ShowImg
    //       //     {...this.props}
    //       //     {...parprops}
    //       //     orderIndex={index}
    //       //     attactInfo={imgArr.map(each => each).join(',')}
    //       //     type={'IMG'}
    //       //     height="0"
    //       //   />
    //       // </div>
    //       <img
    //         style={{ width: '88px', height: '88px' }} key={index} src={ite} > </img>
    //     ));

    return           
     <img style={{ width: '88px', height: '88px' }}  src={'./xunshilicheng.png'} > </img>;
  };

  render() {
    const { items, maintainrecords } = this.state;
    return (
      <div>
        <div style={{ position: 'relative' }}>
          <List size="small" bordered dataSource={items} locale={{ emptyText: '暂无数据' }}
            renderItem={item => (
              <List.Item >
                <div style={{ width: '100%', float: 'left' }}>
                  <div style={{ width: '40%', float: 'left' }}>{item.key}:</div>
                  <div style={{ width: '60%', float: 'left', wordBreak: 'break-all', }}>
                    {item.key.includes("图片") ? this.getImgs(item) : item.value}
                  </div>
                </div>
              </List.Item>
            )}
          />

          <Table columns={columns} dataSource={maintainrecords} bordered pagination={false} size="small" />
        </div>
        <div style={{  float: 'right' }}>
          <WhiteSpace />
          <Button  style={{marginBottom:10,marginTop:10,marginRight:10}} onClick={this.close} size={'small'} type="primary">关闭</Button>
        </div>
      </div >
    )
  }
}

