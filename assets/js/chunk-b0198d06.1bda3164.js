(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-b0198d06"],{"2b9a":function(t,e,a){},"56e0":function(t,e,a){"use strict";var n=a("2b9a"),i=a.n(n);i.a},da83:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("a-breadcrumb",{attrs:{separator:""}},[a("a-breadcrumb-item",[a("router-link",{attrs:{to:"/store/index"}},[t._v("当前位置：首页")])],1),a("a-breadcrumb-separator",[t._v(">")]),a("a-breadcrumb-item",[t._v(" 购物车 ")])],1),a("a-divider"),a("a-table",{attrs:{columns:t.columns,"data-source":t.data,pagination:t.pagination,rowKey:"id"},scopedSlots:t._u([{key:"name",fn:function(e){return a("a",{},[t._v(t._s(e))])}},{key:"pic",fn:function(t,e){return a("span",{},[a("img",{staticStyle:{width:"100px",heigth:"100px"},attrs:{referrer:"no-referrer|origin|unsafe-url",src:e.picture}})])}},{key:"quantity",fn:function(e,n){return[a("el-input-number",{attrs:{min:1,max:10,label:"describe"},on:{change:function(e){return t.changeQuantity(n.id,n.quantity)}},model:{value:n.quantity,callback:function(e){t.$set(n,"quantity",e)},expression:"record.quantity"}},[t._v(t._s(n.quantity))])]}},{key:"createTime",fn:function(e,n){return a("span",{},[t._v(t._s(t._f("formatTime")(n.createTime)))])}},{key:"operation",fn:function(e,n){return[t.data.length?a("a-popconfirm",{attrs:{title:"您确定要删除吗?"},on:{confirm:function(){return t.onDelete(n.id)}}},[a("a",{attrs:{href:"javascript:;"}},[t._v("删除")])]):t._e()]}}])},[a("span",{attrs:{slot:"customTitle"},slot:"customTitle"},[a("a-icon",{staticStyle:{"font-size":"18px"},attrs:{type:"book"}}),t._v(" 图书")],1)]),a("el-button",{staticStyle:{"margin-left":"600px"},attrs:{type:"danger",round:""},on:{click:t.jump}},[t._v("结算")])],1)},i=[],o=(a("4de4"),a("2909")),r=a("c466"),s=[{title:" ",dataIndex:"pictrue",scopedSlots:{customRender:"pic"}},{dataIndex:"name",key:"name",slots:{title:"customTitle"},scopedSlots:{customRender:"name"}},{title:"价格",dataIndex:"price",key:"price"},{title:"数量",dataIndex:"quantity",key:"quantity",scopedSlots:{customRender:"quantity"},align:"center"},{title:"加入时间",dataIndex:"createTime",key:"createTime",scopedSlots:{customRender:"createTime"}},{title:"operation",dataIndex:"operation",scopedSlots:{customRender:"operation"}}],c={data:function(){return{data:[],columns:s,total:0,pagination:{defaultPageSize:5,showSizeChanger:!0,pageSizeOptions:["5","10","15","20"]}}},methods:{onDelete:function(t){var e=Object(o["a"])(this.data);this.data=e.filter((function(e){return e.id!==t})),this.axios.delete("http://39.107.230.124:7777/cart/item/"+t).then((function(t){console.log(t)}))},changeQuantity:function(t,e){console.log(e),this.axios.post("http://39.107.230.124:7777/cart/item/"+t,{quantity:e}).then((function(t){console.log(t)}))},jump:function(){this.$router.push({path:"/store/steps"})}},mounted:function(){var t=this;this.axios.get("http://39.107.230.124:7777/cart/item",{params:{pageNum:1,pageSize:this.total}}).then((function(e){console.log(e.data.data),t.data=e.data.data.list,console.log(t.data)}))},filters:{formatTime:function(t){var e=new Date(t);return Object(r["a"])(e,"yyyy-MM-dd hh:mm:ss")}}},u=c,l=(a("56e0"),a("2877")),d=Object(l["a"])(u,n,i,!1,null,null,null);e["default"]=d.exports}}]);
//# sourceMappingURL=chunk-b0198d06.1bda3164.js.map