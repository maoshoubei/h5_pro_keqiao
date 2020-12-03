import React from 'react';
import { Toast } from 'antd-mobile'
import { connect, fetch } from 'dva'
import { List, Card, Image, Table } from 'antd';
import Record from '../components/Record'


const requesturl = "/ServiceEngine/rest/services/CustomServer/getPumpEquipDataByGid?gid=5903&access_token=eyJ1c2VyTmFtZSI6ImFkbWluIiwidGltZSI6IjIwMjAtMTItMDMgMTg6MjI6MTUifQ=="
const dataSource = [
  {
    key: '1',
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园1号',
  },
  {
    key: '2',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
  },
];

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
    title: '完成率',
    dataIndex: 'percent',
    key: 'percent',
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

  // get请求
  componentDidMount() {
    Toast.loading('加载中...', 0, () => { }, true);
    this.init()
  }

  init = async () => {
    await fetch(requesturl)
      .then(res => res.json())
      .then(data => {
        Toast.hide();
        console.log(data)
        var tempDeviceBasicArray = [];
        var tempMaintainRecordArray = [];

        for (var name in data.features) {
          if ("maintenanceRecords" == name) {
            tempMaintainRecordArray = data.features[name]
            var temp1 = {
              taskName: "养护任务名称1",
              taskContent: "我是养护记录1",
              percent: "90%",
              dateTime: "2020-12-12 12:12:12",
              personName: "张三",
            }
            tempMaintainRecordArray.push(temp1);
            continue;
          }
          var temp = {
            key: name,
            value: data.features[name]
          }
          tempDeviceBasicArray.push(temp);
        }

        this.setState({
          items: tempDeviceBasicArray,
          maintainrecords: tempMaintainRecordArray
        })

      })
  }

  render() {
    const { items } = this.state;
    return (
      <div>
        <h1>设备台账信息</h1>
        <div style={{ position: 'relative' }}>
          <List size="large" bordered dataSource={items} locale={{ emptyText: '暂无数据' }}
            renderItem={item => (
              <List.Item >
                <div style={{ width: '100%', float: 'left' }}>
                  <div style={{ width: '30%', float: 'left' }}>{item.key}:</div>
                  <div style={{ width: '70%', float: 'left', wordBreak: 'break-all', }}>{item.value}</div>
                </div>
              </List.Item>
            )}
          />

          <Table columns={columns} dataSource={dataSource} bordered  pagination={false} size="small"/>
        </div>
      </div >
    )
  }
}

