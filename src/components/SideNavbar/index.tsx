import { useEffect, useState } from 'react';
import { Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';

import styles from './styles.module.scss';
import EximbayLogo from 'assests/images/svgs/eximbay-logo.svg';
import EximbayLogoSM from 'assests/images/svgs/eximbay-logo-sm.svg';
import SidebarArrowIcon from 'assests/images/svgs/icon-sidebar-arrow.svg';
import DashboardIcon from 'assests/images/svgs/nav-dashboard.svg';
import AllpaymentIcon from 'assests/images/svgs/nav-allpayment.svg';
import SettlementIcon from 'assests/images/svgs/nav-settlement.svg';
import AccountIcon from 'assests/images/svgs/nav-account.svg';
import CustomerIcon from 'assests/images/svgs/nav-customer.svg';
import InvoiceIcon from 'assests/images/svgs/nav-invoice.svg';

import BaseIcon from 'components/BaseIcon';

const { SubMenu } = Menu;

interface IRoutes {
  key: string;
  text: string;
  url?: string;
  icon: any;
  children?: IRoute[];
}

interface IRoute {
  key: string;
  text: string;
  url: string;
}

const SideNavbar = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const [selectedKey, setSelectedKey] = useState(['1']);

  useEffect(() => {
    routes.forEach((route: IRoutes) => {
      if (location.pathname.startsWith(route.url || '####')) {
        setSelectedKey([route.key]);
      }

      if (route.children) {
        route.children.forEach((routeChild: IRoute) => {
          if (location.pathname.startsWith(routeChild.url || '####')) {
            setSelectedKey([routeChild.key]);
          }
        });
      }
    });
  }, [location.pathname]);

  const onOpenChange = (keys: any) => {
    const routeKeys = routes.map((route: IRoutes) => route.key);

    const latestOpenKey = keys.find((key: string) => selectedKey.indexOf(key) === -1);

    if (routeKeys.indexOf(latestOpenKey) === -1) {
      setSelectedKey(keys);
    } else {
      setSelectedKey(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const routes: IRoutes[] = [
    {
      key: '1',
      text: t('sideNavbar.dashboard'),
      url: '/',
      icon: <BaseIcon src={DashboardIcon} />,
    },
    {
      key: '2',
      text: t('sideNavbar.transactionManagement'),
      url: '/tasks',
      icon: <BaseIcon src={AllpaymentIcon} />,
      children: [
        {
          key: '2.1',
          text: t('sideNavbar.transactionHistory'),
          url: '/settings/setting1',
        },
        {
          key: '2.2',
          text: `${t('sideNavbar.convenienceStore')}/${t('sideNavbar.cashPaymentManagement')}`,
          url: '/settings/setting1',
        },
        {
          key: '2.3',
          text: t('sideNavbar.monthlyPayment'),
          url: '/settings/setting1',
        },
        {
          key: '2.4',
          text: t('sideNavbar.chargeback'),
          url: '/settings/setting1',
        },
      ],
    },
    {
      key: '3',
      text: t('sideNavbar.settlementHistory'),
      url: '/tasks',
      icon: <BaseIcon src={SettlementIcon} />,
      children: [
        {
          key: '3.1',
          text: `${t('sideNavbar.unsettled')}/${t('sideNavbar.depositPendingHistory')}`,
          url: '/settings/setting1',
        },
        {
          key: '3.2',
          text: t('sideNavbar.depositCompletionDetails'),
          url: '/settings/setting1',
        },
        {
          key: '3.3',
          text: t('sideNavbar.paymentPending'),
          url: '/settings/setting1',
        },
        {
          key: '3.4',
          text: t('sideNavbar.taxBill'),
          url: '/settings/setting1',
        },
      ],
    },
    {
      key: '4',
      text: t('sideNavbar.invoiceManagement'),
      url: '/tasks',
      icon: <BaseIcon src={InvoiceIcon} />,
      children: [
        {
          key: '4.1',
          text: t('sideNavbar.shipmentHistory'),
          url: '/settings/setting1',
        },
        {
          key: '4.2',
          text: t('sideNavbar.transactionHistory'),
          url: '/settings/setting1',
        },
        {
          key: '4.3',
          text: t('sideNavbar.createInvoice'),
          url: '/settings/setting1',
        },
      ],
    },
    {
      key: '5',
      text: t('sideNavbar.accountInformation'),
      url: '/tasks',
      icon: <BaseIcon src={AccountIcon} />,
      children: [
        {
          key: '5.1',
          text: t('sideNavbar.accountAndUsageInformation'),
          url: '/settings/setting1',
        },
        {
          key: '5.2',
          text: t('sideNavbar.paymentMethodContractInformation'),
          url: '/settings/setting1',
        },
        {
          key: '5.3',
          text: t('sideNavbar.accountManagement'),
          url: '/settings/setting1',
        },
        {
          key: '5.4',
          text: t('sideNavbar.addAndManageAccounts'),
          url: '/settings/setting1',
        },
      ],
    },
    {
      key: '6',
      text: t('sideNavbar.eximbayCustomerCenter'),
      url: '/tasks',
      icon: <BaseIcon src={CustomerIcon} />,
    },
  ];

  return (
    <div
      className={styles.sideNavbar}
      style={{ width: collapsed ? 80 : 250, transition: 'width 0.3s' }}
    >
      <div className={styles.logo}>
        <div className={styles.imageLogo}>
          <img src={collapsed ? EximbayLogoSM : EximbayLogo} alt="eximbay-logo" />
        </div>

        <div
          className={classnames(styles.sidebarArrow, {
            [styles.collapsedArrow]: collapsed,
          })}
          onClick={() => setCollapsed(!collapsed)}
        >
          <img src={SidebarArrowIcon} alt="" />
        </div>
      </div>

      <Menu
        inlineCollapsed={collapsed}
        openKeys={selectedKey}
        onOpenChange={onOpenChange}
        defaultSelectedKeys={selectedKey}
        mode="inline"
      >
        {routes.map((route: IRoutes) => {
          if (route.children) {
            return (
              <SubMenu key={route.key} icon={route.icon} title={route.text}>
                {route.children?.map((childRoute: IRoute) => (
                  <Menu.Item key={childRoute.key}>
                    <Link to={childRoute.url}>{childRoute.text}</Link>
                  </Menu.Item>
                ))}
              </SubMenu>
            );
          }

          return (
            <Menu.Item icon={route.icon} key={route.key}>
              <Link to={route?.url || ''}>{route.text}</Link>
            </Menu.Item>
          );
        })}
      </Menu>
    </div>
  );
};

export default SideNavbar;
