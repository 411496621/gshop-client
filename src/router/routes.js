import MSite from "../pages/MSite/MSite"
import Search from "../pages/Search/Search"
import Order from '../pages/Order/Order'
import Profile from  "../pages/Profile/Profile"
import Login from "../pages/Login/Login"
import Shop from "../pages/Shop/Shop"
import ShopGoods from "../pages/Shop/ShopGoods/ShopGoods"
import ShopRatings from "../pages/Shop/ShopRatings/ShopRatings"
import ShopInfo from "../pages/Shop/ShopInfo/ShopInfo"

export default [
  {
    path:'/msite',
    component:MSite,
    meta:{
      showFooter:true
    }
  },
  {
    path:'/search',
    component:Search,
    meta:{
      showFooter:true
    }
  },
  {
    path:'/order',
    component:Order,
    meta:{
      showFooter:true
    }
  },
  {
    path:'/profile',
    component:Profile,
    meta:{
      showFooter:true
    }
  },
  {
    path:'/login',
    component:Login
  },
  {
    path:'/shop',
    component:Shop,
    children:[
      {
        path:'goods',
        component:ShopGoods
      },
      {
        path:'ratings',
        component:ShopRatings
      },
      {
        path:'info',
        component:ShopInfo
      },
      {
        path:'/shop',
        redirect:'/shop/goods'
      }
    ]
  },
  {
    path:'/',
    redirect:'/msite'
  }
]
