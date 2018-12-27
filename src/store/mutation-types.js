/*
  使actions通过commit函数可以与指定的mutation函数通信的模块
* */
export const RECEIVE_ADDRESS = 'receive_address' // 接受获取地址
export const RECEIVE_CATEGORYS = 'receive_categorys' // 接受获取食品分类
export const RECEIVE_SHOPS = 'receive_shops'  // 接受获取商家列表
export const RECEIVE_USER = 'receive_user'   // 存储user
export const RECEIVE_LOGOUT = 'receive_logout' // 清空user
export const RECEIVE_SHOP_GOODS = 'receive_shop_goods'
export const RECEIVE_SHOP_INFO = 'receive_shop_info'
export const RECEIVE_SHOP_RATINGS = 'receive_shop_ratings'
export const ADD_FOOD_COUNT = 'add_food_count'
export const REDUCE_FOOD_COUNT = 'reduce_food_count'
export const CLEAR_FOODS_COUNT = 'clear_foods_count'
