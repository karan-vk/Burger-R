(this["webpackJsonpburger-config"]=this["webpackJsonpburger-config"]||[]).push([[7],{110:function(e,t,n){"use strict";n.r(t);var a=n(9),r=n(10),c=n(12),o=n(11),u=n(0),l=n.n(u),i=n(8),s=n(38),h=n(21),p=l.a.lazy((function(){return n.e(5).then(n.bind(null,106))})),d=l.a.lazy((function(){return n.e(4).then(n.bind(null,108))})),b=function(e){Object(c.a)(n,e);var t=Object(o.a)(n);function n(){var e;Object(a.a)(this,n);for(var r=arguments.length,c=new Array(r),o=0;o<r;o++)c[o]=arguments[o];return(e=t.call.apply(t,[this].concat(c))).CheckoutCanceledHandler=function(){e.props.history.goBack()},e.CheckoutContinuedHandler=function(){e.props.history.replace("/checkout/contact-data")},e}return Object(r.a)(n,[{key:"render",value:function(){var e=l.a.createElement(i.a,{to:"/"});this.props.ings&&(e=l.a.createElement("div",null,l.a.createElement(p,{CheckoutCancel:this.CheckoutCanceledHandler,CheckoutContinued:this.CheckoutContinuedHandler,ingredient:this.props.ings}),l.a.createElement(i.b,{path:this.props.match.path+"/contact-data",component:d})));var t=this.props.purchased?l.a.createElement(i.a,{to:"/"}):null;return l.a.createElement(l.a.Fragment,null,t,l.a.createElement(u.Suspense,{fallback:l.a.createElement(s.a,null)},e))}}]),n}(u.Component);t.default=Object(h.b)((function(e){return{ings:e.burgerBuilder.ingredient,purchased:e.order.purchased}}))(b)}}]);
//# sourceMappingURL=7.5e56869d.chunk.js.map