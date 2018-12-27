import Vue from "vue"
import moment from "moment"
Vue.filter('dateFormat',function (date,format) {
    return  moment(date).format(format || 'YYYY-MM-DD HH:mm:ss')
})
