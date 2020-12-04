import React from 'react';
import { Toast } from 'antd-mobile'
import { setTitle } from '../events/index';
import { connect, fetch } from 'dva'
import { List, Card, Layout, Table, Button } from 'antd';
import { NavBar, Icon } from 'antd-mobile';
import ImageViewer from 'react-wx-images-viewer';
import { config } from '../../public/config'

const { Content, Header } = Layout;

const requesturl = "/ServiceEngine/rest/services/CustomServer/getPumpEquipDataByGid"

export default class DeviceRecord extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      maintainrecords: [],
      index: 0,
      isOpen: false,
      imgList: [],
      imgs: [],
      imgItem: ''
    }
  }

  //初始化标题和数据信息
  componentDidMount() {
    var paramsArray = window.location.search.split('?');
    var parms;
    if (paramsArray.length > 1) {
      parms = paramsArray[1];
    }
    this.init(parms)
  }

  //关闭当前页面
  close() {
    //Toast.info('关闭页面');
  }

  //关闭查看大图
  onClose = () => {
    this.setState({
      isOpen: false
    })
  }

  // 打开某个图片
  openViewer = (index) => {
    //const url = window.location.protocol + '//' + window.location.host;
    const { imgs } = this.state;
    const imgList1 = this.state.imgList[index];
    this.setState({ index, isOpen: true, imgList1 });
  }

  //判断字符串是不是中文
  isChinese(s) {
    if (escape(s).indexOf("%u") < 0) {
      return false;
    } else {
      return true;
    }

  }

  init = async (params) => {
    Toast.loading('加载中...', 0, () => { }, true);
    await fetch(requesturl + '?' + params)
      .then(res => res.json())
      .then(data => {
        Toast.hide();
        var tempDeviceBasicArray = [];
        var tempMaintainRecordArray = [];
        var tempImgArr = [];

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
            if (!this.isChinese(name)) {
              continue;
            }
            if (name.includes("图片")) {
              var itemStr = data.features[name];
              const imgArr = itemStr.split(',');

              for (var i = 0; i < imgArr.length; i++) {
                if (imgArr[i] == '' || imgArr[i].length == 0) {
                  continue;
                }
                var tempImgStr = config.rootUrl.concat(imgArr[i]);
                tempImgArr.push(tempImgStr);
              }
            }
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
          maintainrecords: tempRecordArry,
          imgList: tempImgArr
        })
      })
  }

  getImgs() {
    const { imgList } = this.state;
    return imgList.map((imgItem, index) => (
      <div style={{ marginLeft: 2, marginRight: 2 }}>
        <img id='imgId' style={{ width: '40px', height: '40px' }} key={index} src={imgItem} onClick={this.openViewer}></img>
      </div>
    ));
  };

  render() {
    const { items, maintainrecords, imgs = [], imgList, isOpen, index } = this.state;
    return (
      <Layout>
        <NavBar style={{ position: 'fixed', width: '100%', zIndex: 1 }} mode="dark">{'设备台账信息'}</NavBar>
        <Content style={{ position: 'relative', marginTop: 48 }}>
          <List size="small" bordered dataSource={items} locale={{ emptyText: '暂无数据' }}
            renderItem={item => (
              <List.Item >
                <div style={{ width: '100%', float: 'left' }}>
                  <div style={{ width: '40%', float: 'left' }}>{item.key}:</div>
                  <div style={{ width: '60%', float: 'left', wordBreak: 'break-all', display: "flex" }}>
                    {item.key.includes("图片") ?
                      imgList.map((imgItem, i) => {
                        return (
                          <div style={{ marginLeft: 2, marginRight: 2 }}>
                            <img style={{ width: '40px', height: '40px', float: "left", display: "inline" }} onClick={this.openViewer.bind(this, i)} src={imgItem} alt="" />
                          </div>
                        )
                      })
                      : item.value}
                  </div>
                </div>
              </List.Item>
            )}
          />
          <div style={{ position: 'relative' }}>
            <List size="large" dataSource={maintainrecords} locale={{ emptyText: '暂无数据' }}
              renderItem={item => (
                <List.Item style={{ backgroundColor: '#f6f6f6' }}>
                  <Card style={{ width: '100%' }} type="inner">
                    <div style={{ width: '100%', float: 'left' }}>
                      <div style={{ width: '30%', float: 'left' }}>任务名称:</div>
                      <div style={{ width: '70%', float: 'left', wordBreak: 'break-all', }}>
                        {item.name}
                      </div>
                    </div>
                    <div style={{ width: '100%', float: 'left' }}>
                      <div style={{ width: '30%', float: 'left' }}>养护内容:</div>
                      <div style={{ width: '70%', float: 'left', wordBreak: 'break-all', }}>
                        {item.content}
                      </div>
                    </div>
                    <div style={{ width: '100%', float: 'left' }}>
                      <div style={{ width: '30%', float: 'left' }}>养护情况:</div>
                      <div style={{ width: '70%', float: 'left', wordBreak: 'break-all', }}>
                        {item.maintainInfo}
                      </div>
                    </div>
                    <div style={{ width: '100%', float: 'left' }}>
                      <div style={{ width: '30%', float: 'left' }}>
                        执行日期:
                      </div>
                      <div style={{ width: '70%', float: 'left', wordBreak: 'break-all', }}>
                        {item.time}
                      </div>
                    </div>
                    <div style={{ width: '100%', float: 'left' }}>
                      <div style={{ width: '30%', float: 'left' }}>养护人员:</div>
                      <div style={{ width: '70%', float: 'left', wordBreak: 'break-all', }}>
                        {item.maintainuser}
                      </div>
                    </div>
                  </Card>
                </List.Item>
              )}
            />
          </div>
        </Content>
        {isOpen ? <ImageViewer onClose={this.onClose} urls={imgList} index={index} /> : ""}
      </Layout>
    )
  }
}

