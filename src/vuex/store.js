import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        token:"eyJlbmMiOiJBMTI4R0NNIiwiYWxnIjoiUlNBLU9BRVAtMjU2In0.AP7UDG0Pgc-CHjlKaOGkff_ac5Yvrtpckbr2_YuuKgrlk1KD0c8OusHo9G8RSHK6WU10441VTeuMlIak-LSGtao29XnYWvzLYvFzYSR4gA9YIjJyT10MHEyRtLyJpiid9gaOfWnRgkoBurayJ6BsVF0o8M8wrmdmI1-_oElEqorxseaXtQkm_CnrLvdqW2wJ9If-vXpWQr0JaefPp33N5DgzhJ7h0nIrgrsRE_UgH6ywLPTgemoOq3s0X1xiQIZVbdm_E3ssMkLGuIIkv0GXxPE9yfzwjeZLccigCcTem5JspNhmZ8XqCSBD0p3upTef0SYwomQYa0v5HY6Dg0webw.w_t-IY8mNRqL6OnD.CkfVUYzDL8dmrSOMOxhgHLcdBIwglAtoIqzAUYPQ0Pbb1GNBLUGlf7xgPpeu7HdgHbJovPPlKdWT0lB2JknLZKr9_cX0UZSChmQFE-Z7Xj7wsNyZGDUt4hAgSfjy5LXlRaDsmwrzlbk4TLA85YHSkqYlCqhlqaaNKTtc0UuQqzwVOchqNQALWLDRNTPk4zgPrczDnVF-01aDxIdDbjNamQ.oz0kNS2eIj5sKbTxUO-YkQ",
        apiToken:"",
        mapSetShow:false,//地图设置显隐控制
	   	count: 0,
	   	color: ['#325B69', '#698570', '#AE5548', '#6D9EA8', '#9CC2B0', '#C98769']
    },
    getter: {

    },
    /* mutations 里面放置的是我们操作state对象属性的方法 */
    mutation: {
       
    },
    action: {
        
    }
})