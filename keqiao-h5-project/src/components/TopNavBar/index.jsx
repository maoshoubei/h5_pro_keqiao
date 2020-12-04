import React from 'react';
import * as PropTypes from 'prop-types';

import { NavBar, Icon } from 'antd-mobile';
import withRouter from 'umi/withRouter';
import router from 'umi/router';

@withRouter
class TopNavBar extends React.Component {
  static defaultProps = {
    title: '',
    isHide: false,
  }

  goBack(e) {
    e.preventDefault()
    const { isHide } = this.props;
    if (isHide) return;
    router.goBack();
  }

  render() {
    const { isHide, location } = this.props;
    var { title, onLeftClick } = this.props;
    const routeList = sessionStorage.getItem('routeList') ? JSON.parse(sessionStorage.getItem('routeList')) : [];
    const curRouter = routeList.find(item => {
      if (item.path === location.pathname) return item
    })

    if (null == title | '' == title) {
      title = curRouter ? curRouter['title'] : '未定义';
    }

    return (
      <NavBar
        mode="dark"
        icon={isHide ? '' : <Icon type="left" />}
        onLeftClick={(onLeftClick) ? onLeftClick : this.goBack.bind(this)}
      >{title}</NavBar>
    );
  }
}

TopNavBar.propTypes = {
  title: PropTypes.string,
  isHide: PropTypes.bool,
}

export default TopNavBar;
