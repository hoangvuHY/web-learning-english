import { Dropdown, Menu } from 'antd';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { SearchOutlined, DownOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import classNames from 'classnames';

import styles from './styles.module.scss';
import { useState } from 'react';

const PageHeader = () => {
  const navigate = useNavigate();

  const [visible, setVisible] = useState(false);

  const handleLogout = () => {
    Cookies.remove('token');
    Cookies.remove('refreshToken');
    navigate('/login');
  };

  const menu = (
    <Menu className={styles.menuAccount}>
      <Menu.Item key="1">My Account</Menu.Item>
      <Menu.Item key="2">Change Password</Menu.Item>
      <Menu.Item key="3" onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <div className={styles.headerContainer}>
      <div className={styles.left}>
        <SearchOutlined className={styles.searchIcon} />
        <Input className={styles.searchPage} placeholder="Search" />
      </div>
      <div className={styles.right}>
        <div className={styles.textLeft}>Exibay Customer Center</div>
        <div className={styles.account}>
          <Dropdown
            visible={visible}
            onVisibleChange={() => setVisible(!visible)}
            overlay={menu}
            trigger={['click']}
          >
            <div className={styles.dropdownAccount}>
              <div className={styles.avatar} />

              <div className={styles.userName}>
                <span>user name</span>
                <span>nick name</span>
              </div>

              <DownOutlined
                className={classNames(styles.dropdownIcon, {
                  [styles.visible]: visible,
                })}
              />
            </div>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
