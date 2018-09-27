import SignIn from '@/components/SignIn'
import Home from '@/components/Home'
import Main from '@/components/Main'
import Enterprise from '@/components/enterprise/Index'
import EnterpriseDetail from '@/components/enterprise/Detail'

let routes = [
  {
    path: '/SignIn',
    component: SignIn,
    name: '',
    hidden: true
  },
  {
    path: '/Home',
    component: Main,
    name: '',
    hidden: true,
    children: [
      { path: '/home', component: Home, name: '主页' }
    ]
  },
  {
    path: '/',
    component: Main,
    name: '企业信息管理',
    iconCls: 'fa fa-id-card-o',
    children: [
      { path: '/enterprise/index', component: Enterprise, name: '企业信息' },
      { path: '/enterprise/detail/:enterpriseId', component: EnterpriseDetail, name: '企业信息', hidden: true }
    ]
  },
]
export default routes;
