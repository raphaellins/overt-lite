(this.webpackJsonpview=this.webpackJsonpview||[]).push([[0],{153:function(e,a,t){e.exports=t(202)},202:function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),o=t(12),l=t.n(o),c=t(32),i=t(46),s=t(6),u=t.n(s),m=t(10),d=t(18),p=t(19),h=t(21),v=t(20),g=t(256),b=t(235),f=t(234),k=t(236),E=t(239),x=t(88),w=t(240),N=t(241),y=t(29),C=t.n(y),S=t(232),O=function(e){null===localStorage.getItem("AuthToken")&&e.push("/login")},j=t(231),D=t(237),P=t(15),B=t(40),I=t.n(B),T=function(){var e=localStorage.getItem("AuthToken");return I.a.defaults.headers.common={Authorization:"".concat(e)},"https://us-central1-overtlite.cloudfunctions.net/api"},G=function(){var e=Object(m.a)(u.a.mark((function e(a,t){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,I.a.post("".concat(T(),"/login"),a).catch((function(e){return t(e)}));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(a,t){return e.apply(this,arguments)}}(),W=function(){var e=Object(m.a)(u.a.mark((function e(){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,I.a.get("".concat(T(),"/games"));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),L=function(){var e=Object(m.a)(u.a.mark((function e(a){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,I.a.post("".concat(T(),"/new-draw"),a);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}(),M=function(){var e=Object(m.a)(u.a.mark((function e(a){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,I.a.delete("".concat(T(),"/draw/").concat(a));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}(),z=function(){var e=Object(m.a)(u.a.mark((function e(){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,I.a.get("".concat(T(),"/draws-all"));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),A=function(){var e=Object(m.a)(u.a.mark((function e(a){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,I.a.post("".concat(T(),"/new-game"),a);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}(),R=function(){var e=Object(m.a)(u.a.mark((function e(a){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,I.a.delete("".concat(T(),"/game/").concat(a));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}(),F=function(){var e=Object(m.a)(u.a.mark((function e(){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,I.a.get("".concat(T(),"/games-all"));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),H=function(){var e=Object(m.a)(u.a.mark((function e(){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,I.a.get("".concat(T(),"/user"));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),Q=function(e){Object(h.a)(t,e);var a=Object(v.a)(t);function t(){var e;Object(d.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(e=a.call.apply(a,[this].concat(r))).state={render:!0,firstName:"",lastName:"",profilePicture:"",uiLoading:!0,imageLoading:!1},e.logoutHandler=function(a){var t;localStorage.removeItem("AuthToken"),null===(t=e.props.history)||void 0===t||t.push("/login"),e.setState({left:!1})},e.loadPage=function(a){var t;null===(t=e.props.history)||void 0===t||t.push(a),e.setState({left:!1})},e.componentWillMount=Object(m.a)(u.a.mark((function a(){var t,n;return u.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return O(e.props.history),a.prev=1,a.next=4,H();case 4:(t=a.sent)&&t.data&&e.setState({firstName:t.data.userCredentials.firstName,lastName:t.data.userCredentials.lastName,email:t.data.userCredentials.email,phoneNumber:t.data.userCredentials.phoneNumber,country:t.data.userCredentials.country,username:t.data.userCredentials.username,uiLoading:!1}),a.next=13;break;case 8:a.prev=8,a.t0=a.catch(1),localStorage.removeItem("AuthToken"),null===(n=e.props.history)||void 0===n||n.push("/login"),e.setState({errorMsg:"Error in retrieving the data",uiLoading:!1});case 13:case"end":return a.stop()}}),a,null,[[1,8]])}))),e.toggleDrawer=function(a,t){return function(){var n=Object(m.a)(u.a.mark((function n(r){return u.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if("keydown"!==r.type||"Tab"!==r.key&&"Shift"!==r.key){n.next=2;break}return n.abrupt("return");case 2:return n.prev=2,n.next=5,H();case 5:e.setState(Object(i.a)(Object(i.a)({},e.state),{},Object(c.a)({},a,t))),n.next=11;break;case 8:n.prev=8,n.t0=n.catch(2),console.log("Login Invalid");case 11:case"end":return n.stop()}}),n,null,[[2,8]])})));return function(e){return n.apply(this,arguments)}}()},e}return Object(p.a)(t,[{key:"render",value:function(){var e=this,a=this.props.classes,t=this.state,n=t.left;t.username;return!0===this.state.uiLoading?r.a.createElement("div",{className:a.container},this.state.uiLoading&&r.a.createElement(S.a,{size:150,className:a.uiProgess})):r.a.createElement("div",{className:a.root},r.a.createElement(f.a,null),r.a.createElement(b.a,{position:"fixed",className:a.appBar},r.a.createElement(k.a,null,r.a.createElement(D.a,{onClick:this.toggleDrawer("left",!0)},"Menu"),r.a.createElement(x.a,{variant:"h6",noWrap:!0},"Overt Lite"))),r.a.createElement(g.a,{className:a.drawer,anchor:"left",open:n,onClose:function(){return e.toggleDrawer("left",!1)},classes:{paper:a.drawerPaper}},r.a.createElement("div",{className:a.toolbar}),r.a.createElement(E.a,null,r.a.createElement(w.a,{button:!0,key:"Lottery",onClick:function(){return e.loadPage("/")}},r.a.createElement(N.a,{primary:"Lottery"})),r.a.createElement(w.a,{button:!0,key:"NewDraw",onClick:function(){return e.loadPage("/draw")}},r.a.createElement(N.a,{primary:"New Draw"})),r.a.createElement(w.a,{button:!0,key:"NewGame",onClick:function(){return e.loadPage("/game")}},r.a.createElement(N.a,{primary:"New Game"})),r.a.createElement(w.a,{button:!0,key:"Account",onClick:function(){return e.loadPage("/account")}},r.a.createElement(N.a,{primary:"Account"})),r.a.createElement(w.a,{button:!0,key:"Logout",onClick:this.logoutHandler},r.a.createElement(N.a,{primary:"Logout"})))),r.a.createElement("div",{className:a.container},this.props.children))}}]),t}(n.Component),V=C()((function(e){return Object(j.a)({appBar:{zIndex:e.zIndex.drawer+1},drawer:{width:240,flexShrink:0},drawerPaper:{width:240},uiProgess:{Index:"1000",height:"31px",width:"31px"},container:{paddingRight:10,paddingLeft:10},toolbar:e.mixins.toolbar})}))(Object(P.f)(Q));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var q=t(96),U=t(257),J=t(254),K=t(128),$=t.n(K),X=t(242),Y=function(e){return Object(j.a)({paper:{marginTop:e.spacing(8),display:"flex",flexDirection:"column",alignItems:"center"},avatar:{margin:e.spacing(1),backgroundColor:e.palette.secondary.main},form:{width:"100%",marginTop:e.spacing(1)},submit:{margin:e.spacing(3,0,2)},customError:{color:"red",fontSize:"0.8rem",marginTop:10},progess:{position:"absolute"}})},Z=function(e){Object(h.a)(t,e);var a=Object(v.a)(t);function t(e){var n;return Object(d.a)(this,t),(n=a.call(this,e)).handleChange=function(e){n.setState(Object(c.a)({},e.target.name,e.target.value))},n.handleSubmit=function(){var e=Object(m.a)(u.a.mark((function e(a){var t,r;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a.preventDefault(),n.setState({loading:!0}),t={email:n.state.email?n.state.email:"",password:n.state.password?n.state.password:""},e.next=5,G(t,(function(e){null!=e.response&&n.setState({errors:e.response.data,loading:!1}),console.log(e)}));case 5:null!=(r=e.sent)&&(localStorage.setItem("AuthToken","Bearer ".concat(r.data.token)),n.setState({loading:!1}),n.props.history.push("/"));case 7:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}(),n.state={email:"",password:"",errors:{},loading:!1},n}return Object(p.a)(t,[{key:"componentWillReceiveProps",value:function(e){var a;(null===e||void 0===e||null===(a=e.UI)||void 0===a?void 0:a.errors)&&this.setState({errors:e.UI.errors})}},{key:"render",value:function(){var e=this.props.classes,a=this.state,t=a.errors,n=a.loading;return r.a.createElement(X.a,{component:"main",maxWidth:"xs"},r.a.createElement(f.a,null),r.a.createElement("div",{className:e.paper},r.a.createElement(U.a,{className:e.avatar},r.a.createElement($.a,null)),r.a.createElement(x.a,{component:"h1",variant:"h5"},"Login"),r.a.createElement("form",{className:e.form,noValidate:!0},r.a.createElement(J.a,{variant:"outlined",margin:"normal",required:!0,fullWidth:!0,id:"email",label:"Email Address",name:"email",autoComplete:"email",autoFocus:!0,helperText:null===t||void 0===t?void 0:t.email,error:!!(null===t||void 0===t?void 0:t.email),onChange:this.handleChange}),r.a.createElement(J.a,{variant:"outlined",margin:"normal",required:!0,fullWidth:!0,name:"password",label:"Password",type:"password",id:"password",autoComplete:"current-password",helperText:null===t||void 0===t?void 0:t.password,error:!!(null===t||void 0===t?void 0:t.password),onChange:this.handleChange}),r.a.createElement(D.a,{type:"submit",fullWidth:!0,variant:"contained",color:"primary",className:e.submit,onClick:this.handleSubmit,disabled:n||!this.state.email||!this.state.password},"Sign In",n&&r.a.createElement(S.a,{size:30,className:e.progess})),(null===t||void 0===t?void 0:t.general)&&r.a.createElement(x.a,{variant:"body2",className:e.customError},null===t||void 0===t?void 0:t.general))))}}]),t}(n.Component),_=C()(Y)(Z),ee=t(134),ae=t(245),te=t(246),ne=t(247),re=t(248),oe=t(249),le=t(3),ce=function(e){return Object(j.a)({content:{flexGrow:1,padding:e.spacing(3)},toolbar:e.mixins.toolbar,root:{},details:{display:"flex"},avatar:{height:110,width:100,flexShrink:0,flexGrow:0},locationText:{paddingLeft:"15px"},buttonProperty:{position:"absolute",top:"50%"},uiProgess:{position:"fixed",Index:"1000",height:"31px",width:"31px",left:"50%",top:"35%"},progess:{position:"absolute"},uploadButton:{marginLeft:"8px",margin:e.spacing(1)},customError:{color:"red",fontSize:"0.8rem",marginTop:10},submitButton:{marginTop:"10px"}})},ie=function(e){Object(h.a)(t,e);var a=Object(v.a)(t);function t(e){var n;return Object(d.a)(this,t),(n=a.call(this,e)).componentWillMount=Object(m.a)(u.a.mark((function e(){var a,t;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return O(n.props.history),e.prev=1,e.next=4,H();case 4:a=e.sent,n.setState({firstName:a.data.userCredentials.firstName,lastName:a.data.userCredentials.lastName,email:a.data.userCredentials.email,phoneNumber:a.data.userCredentials.phoneNumber,country:a.data.userCredentials.country,username:a.data.userCredentials.username,uiLoading:!1}),e.next=12;break;case 8:e.prev=8,e.t0=e.catch(1),403===e.t0.response.status&&(null===(t=n.props.history)||void 0===t||t.push("/login")),n.setState({errorMsg:"Error in retrieving the data"});case 12:case"end":return e.stop()}}),e,null,[[1,8]])}))),n.handleChange=function(e){n.setState(Object(c.a)({},e.target.name,e.target.value))},n.state={firstName:"",lastName:"",email:"",phoneNumber:"",username:"",country:"",profilePicture:"",uiLoading:!0,buttonLoading:!1,imageError:""},n}return Object(p.a)(t,[{key:"render",value:function(){var e=this.props,a=e.classes,t=Object(ee.a)(e,["classes"]);return!0===this.state.uiLoading?r.a.createElement("main",{className:a.content},r.a.createElement("div",{className:a.toolbar}),this.state.uiLoading&&r.a.createElement(S.a,{size:150,className:a.uiProgess})):r.a.createElement("main",{className:a.content},r.a.createElement("div",{className:a.toolbar}),r.a.createElement(ae.a,Object.assign({},t,{className:Object(le.a)(a.root,a)}),r.a.createElement(te.a,null,r.a.createElement("div",{className:a.details},r.a.createElement("div",null,r.a.createElement(x.a,{className:a.locationText,gutterBottom:!0,variant:"h4"},this.state.firstName," ",this.state.lastName))),r.a.createElement("div",{className:a.progress})),r.a.createElement(ne.a,null)),r.a.createElement("br",null),r.a.createElement(ae.a,Object.assign({},t,{className:Object(le.a)(a.root,a)}),r.a.createElement("form",{autoComplete:"off",noValidate:!0},r.a.createElement(ne.a,null),r.a.createElement(te.a,null,r.a.createElement(re.a,{container:!0,spacing:3},r.a.createElement(re.a,{item:!0,md:6,xs:12},r.a.createElement(J.a,{fullWidth:!0,label:"First name",margin:"dense",name:"firstName",variant:"outlined",value:this.state.firstName,onChange:this.handleChange})),r.a.createElement(re.a,{item:!0,md:6,xs:12},r.a.createElement(J.a,{fullWidth:!0,label:"Last name",margin:"dense",name:"lastName",variant:"outlined",value:this.state.lastName,onChange:this.handleChange})),r.a.createElement(re.a,{item:!0,md:6,xs:12},r.a.createElement(J.a,{fullWidth:!0,label:"Email",margin:"dense",name:"email",variant:"outlined",disabled:!0,value:this.state.email,onChange:this.handleChange})),r.a.createElement(re.a,{item:!0,md:6,xs:12},r.a.createElement(J.a,{fullWidth:!0,label:"Phone Number",margin:"dense",name:"phone",variant:"outlined",disabled:!0,value:this.state.phoneNumber,onChange:this.handleChange})),r.a.createElement(re.a,{item:!0,md:6,xs:12},r.a.createElement(J.a,{fullWidth:!0,label:"User Name",margin:"dense",name:"userHandle",disabled:!0,variant:"outlined",value:this.state.username,onChange:this.handleChange})),r.a.createElement(re.a,{item:!0,md:6,xs:12},r.a.createElement(J.a,{fullWidth:!0,label:"Country",margin:"dense",name:"country",variant:"outlined",value:this.state.country,onChange:this.handleChange})))),r.a.createElement(ne.a,null),r.a.createElement(oe.a,null))))}}]),t}(n.Component),se=C()(ce)(ie),ue=t(57),me=function(e){return Object(j.a)({root:{marginTop:10,display:"flex",flexDirection:"row",justifyContent:"space-between"},matchedTitle:{fontSize:18,color:"green"},uiProgess:{position:"fixed",Index:"1000",height:"31px",width:"31px",left:"50%",top:"35%"},toolbar:e.mixins.toolbar,line:{marginBottom:50,marginTop:50,color:"gray"}})},de=t(252),pe=t(5),he=t(250),ve=t(129),ge=t.n(ve),be=t(130),fe=t.n(be),ke=function(e){Object(h.a)(t,e);var a=Object(v.a)(t);function t(){return Object(d.a)(this,t),a.apply(this,arguments)}return Object(p.a)(t,[{key:"render",value:function(){var e,a=this.props,t=a.classes,n=a.game,o=a.handleDelete,l=a.plusAction;return r.a.createElement(ae.a,{className:t.root,key:n.gameId},r.a.createElement(te.a,null,r.a.createElement(re.a,{container:!0,spacing:4,className:t.cardHeader},r.a.createElement(re.a,{item:!0,xs:!0},r.a.createElement(x.a,{className:t.title,color:"textSecondary",gutterBottom:!0},"Game: ",n.gameNumber)),r.a.createElement(re.a,{item:!0,xs:!0},n.gameDescription?r.a.createElement(x.a,{className:t.title,color:"textSecondary",gutterBottom:!0},n.gameDescription):""),r.a.createElement(re.a,{item:!0,xs:!0},n.countMatched?r.a.createElement(x.a,{className:n.countMatched>=11?t.matchedTitle:t.title,color:"textSecondary",gutterBottom:!0},"Matched: ",n.countMatched):""),r.a.createElement(re.a,{className:t.buttonAction},r.a.createElement(he.a,{color:"primary","aria-label":"upload picture",component:"span",onClick:function(){return o(n)}},r.a.createElement(ge.a,null)),l?r.a.createElement(he.a,{color:"primary","aria-label":"upload picture",component:"span",onClick:function(){return l(n)}},r.a.createElement(fe.a,null)):"")),r.a.createElement(x.a,{variant:"h5",component:"h2",className:t.numbers},n.numbersPlayed.map((function(e,a){return r.a.createElement("span",{className:t.ball,key:n.gameId+e},e)}))),r.a.createElement(x.a,{variant:"h5",component:"h2",className:t.numbers},null===(e=n.numbersState)||void 0===e?void 0:e.map((function(e,a){return r.a.createElement("span",{className:e.checked?t.ballChecked:t.ball,key:n.gameId+e.value},e.value)})))))}}]),t}(n.Component),Ee=C()((function(e){return Object(j.a)({toolbar:e.mixins.toolbar,root:{marginBottom:10},title:{fontSize:18},matchedTitle:{fontSize:18,color:"green",fontWeight:"bold"},pos:{marginBottom:12},ball:{backgroundColor:"orange",borderRadius:50,padding:2,marginRight:2,color:"black",fontWeight:"bold"},ballChecked:{backgroundColor:"green",borderRadius:50,padding:2,marginRight:2,color:"white",fontWeight:"bold"},ballMatched:{backgroundColor:"green"},numbers:{marginBottom:10},cardHeader:{marginBottom:10},buttonAction:{}})}))(ke),xe=function(e){return Object(j.a)({root:{marginTop:10},matchedTitle:{fontSize:18,color:"green"},uiProgess:{position:"fixed",Index:"1000",height:"31px",width:"31px",left:"50%",top:"35%"},toolbar:e.mixins.toolbar,line:{marginBottom:50,marginTop:50,color:"gray"}})},we=function(e){Object(h.a)(t,e);var a=Object(v.a)(t);function t(){var e;Object(d.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(e=a.call.apply(a,[this].concat(r))).initiateState=function(){e.setState({count:0,rowsPerPage:2,page:0})},e.handleChangePage=function(a,t){var n=e.state.rowsPerPage;e.prepareDate(t,n)},e.handleChangeRowsPerPage=function(a){var t=e.state.page;e.prepareDate(t,a.target.value)},e.prepareDate=function(a){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:2,n=e.state.count,r=e.props.games,o=[],l=a;a>0&&(l=t*a);for(var c=l;c<t*(a+1)&&c<n;c++)o.push(r[c]);e.setState(Object(i.a)(Object(i.a)({},e.state),{},{gamesScreen:o,page:a,rowsPerPage:t}))},e}return Object(p.a)(t,[{key:"componentWillMount",value:function(){var e=this;this.initiateState(),setTimeout((function(){e.setState({count:e.props.games.length}),e.prepareDate(0)}),1e3)}},{key:"render",value:function(){var e=this.props,a=e.handleDelete,t=e.classes,n=this.state,o=n.count,l=n.page,c=n.rowsPerPage,i=n.gamesScreen;return r.a.createElement("div",null,r.a.createElement("div",{className:t.toolbar}),null===i||void 0===i?void 0:i.map((function(e){return r.a.createElement(Ee,{key:e.gameId,game:e,handleDelete:a})})),r.a.createElement(de.a,{component:"div",count:o,page:l,onChangePage:this.handleChangePage,rowsPerPage:c,onChangeRowsPerPage:this.handleChangeRowsPerPage,rowsPerPageOptions:[2,5]}))}}]),t}(n.Component),Ne=Object(pe.a)(xe)(we),ye=function(e){Object(h.a)(t,e);var a=Object(v.a)(t);function t(){var e;Object(d.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(e=a.call.apply(a,[this].concat(r))).initiate=function(){e.setState({retrievedData:[],gameQueued:[],gameFinished:[],gameFinishedScreen:[],gameQueuedScreen:[],loading:!0})},e.componentDidMount=Object(m.a)(u.a.mark((function a(){var t;return u.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,H();case 3:a.next=9;break;case 5:a.prev=5,a.t0=a.catch(0),localStorage.removeItem("AuthToken"),null===(t=e.props.history)||void 0===t||t.push("/login");case 9:case"end":return a.stop()}}),a,null,[[0,5]])}))),e.componentWillMount=Object(m.a)(u.a.mark((function a(){return u.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:e.retrieveData(),e.initiate();case 2:case"end":return a.stop()}}),a)}))),e.retrieveData=Object(m.a)(u.a.mark((function a(){var t,n,r,o;return u.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return t=[],n=[],a.prev=2,a.next=5,W();case 5:r=a.sent,o=r.data,n=(n=ue.chain(o).filter((function(e){return e.numbersDrawn.length>0})).sortBy("gameNumber").reverse().value()).map((function(e){var a=[];return e.numbersDrawn.map((function(t){var n;return a.push({checked:null===(n=e.ballsMatched)||void 0===n?void 0:n.some((function(e){return e===t})),value:t}),t})),Object(i.a)(Object(i.a)({},e),{},{numbersState:a})})),t=ue.chain(o).filter((function(e){return 0===e.numbersDrawn.length})).sortBy("gameNumber").value(),a.next=15;break;case 12:a.prev=12,a.t0=a.catch(2),console.log(a.t0);case 15:e.setState({gameFinished:n,gameQueued:t,loading:!1});case 16:case"end":return a.stop()}}),a,null,[[2,12]])}))),e.handleDelete=function(){var a=Object(m.a)(u.a.mark((function a(t){return u.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,e.setState({loading:!0}),a.next=4,R(t.gameId);case 4:return a.next=6,e.retrieveData();case 6:e.setState({loading:!1}),a.next=13;break;case 9:a.prev=9,a.t0=a.catch(0),e.setState({loading:!1}),console.log(a.t0);case 13:case"end":return a.stop()}}),a,null,[[0,9]])})));return function(e){return a.apply(this,arguments)}}(),e}return Object(p.a)(t,[{key:"render",value:function(){var e=this.props.classes,a=this.state,t=a.gameFinished,n=a.gameQueued;return!0===this.state.loading?r.a.createElement("div",{className:e.root},this.state.loading&&r.a.createElement(S.a,{size:150,className:e.uiProgess})):r.a.createElement("main",{className:e.root},r.a.createElement(Ne,{games:n,handleDelete:this.handleDelete}),r.a.createElement(Ne,{games:t,handleDelete:this.handleDelete}))}}]),t}(n.Component),Ce=C()(me)(ye),Se=t(255),Oe=t(131),je=t.n(Oe),De=t(132),Pe=t.n(De),Be=function(e){return Object(j.a)({root:{marginBottom:10,marginTop:10},title:{fontSize:18},pos:{marginBottom:12},ball:{backgroundColor:"white",border:"1px solid",borderRadius:50,padding:2,marginRight:2,color:"black",fontWeight:"bold",cursor:"pointer"},ballChecked:{backgroundColor:"green",border:"1px solid",borderRadius:50,padding:2,marginRight:2,color:"white",fontWeight:"bold",cursor:"pointer"},numbers:{marginBottom:10},formInput:{marginBottom:10,marginRight:5},ballsNumbers:{marginTop:20},inputField:{marginTop:10},customError:{color:"red",fontSize:"0.8rem",marginTop:10},uiProgess:{position:"fixed",Index:"1000",height:"31px",width:"31px",left:"50%",top:"35%"},paper:{position:"absolute",width:400,backgroundColor:e.palette.background.paper,border:"2px solid #000",boxShadow:e.shadows[5],padding:e.spacing(2,4,3)},toolbar:e.mixins.toolbar,modalStyle:{top:"50%",left:"50%",transform:"translate(-50%, -50%)"},inputsGameNumber:{display:"flex",flexDirection:"column",marginBottom:10,maxWidth:200}})},Ie=function(e){Object(h.a)(t,e);var a=Object(v.a)(t);function t(e){var n;return Object(d.a)(this,t),(n=a.call(this,e)).componentDidMount=Object(m.a)(u.a.mark((function e(){var a;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,H();case 3:e.next=9;break;case 5:e.prev=5,e.t0=e.catch(0),localStorage.removeItem("AuthToken"),null===(a=n.props.history)||void 0===a||a.push("/login");case 9:case"end":return e.stop()}}),e,null,[[0,5]])}))),n.initiateState=function(){return{loading:!0,initialGameNumber:"",finalGameNumber:"",gameNumberDuplicate:"",gameDescription:"",gameToDuplicate:void 0,ballsNumber:[{value:"01",checked:!1},{value:"02",checked:!1},{value:"03",checked:!1},{value:"04",checked:!1},{value:"05",checked:!1},{value:"06",checked:!1},{value:"07",checked:!1},{value:"08",checked:!1},{value:"09",checked:!1},{value:"10",checked:!1},{value:"11",checked:!1},{value:"12",checked:!1},{value:"13",checked:!1},{value:"14",checked:!1},{value:"15",checked:!1},{value:"16",checked:!1},{value:"17",checked:!1},{value:"18",checked:!1},{value:"19",checked:!1},{value:"20",checked:!1},{value:"21",checked:!1},{value:"22",checked:!1},{value:"23",checked:!1},{value:"24",checked:!1},{value:"25",checked:!1}],errors:[]}},n.handleSubmit=function(){var e=Object(m.a)(u.a.mark((function e(a){var t,r,o,l,c,i,s,m,d;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a.preventDefault(),t=n.state,r=t.initialGameNumber,o=t.finalGameNumber,l=t.ballsNumber,c=t.gameDescription,i=null===l||void 0===l?void 0:l.filter((function(e){return e.checked})),s=Number(r),m=Number(o),!isNaN(s)&&0!==s&&!isNaN(m)&&0!==m){e.next=8;break}return n.setState({errors:["Initial and final game number is required"],loading:!1}),e.abrupt("return");case 8:return d={initialGameNumber:r,finalGameNumber:o,gameDescription:c,numbersPlayed:null===i||void 0===i?void 0:i.map((function(e){return e.value}))},e.prev=9,n.setState({loading:!0}),e.next=13,A(d);case 13:return e.next=15,n.retrieveData();case 15:n.setState(n.initiateState()),e.next=21;break;case 18:e.prev=18,e.t0=e.catch(9),n.setState({loading:!1});case 21:case"end":return e.stop()}}),e,null,[[9,18]])})));return function(a){return e.apply(this,arguments)}}(),n.onClickBall=function(e){var a=!e.checked,t=n.state.ballsNumber,r=null===t||void 0===t?void 0:t.filter((function(e){return e.checked}));r&&15===(null===r||void 0===r?void 0:r.length)&&a?n.setState({errors:["Only 15 numbers"]}):(n.setState({errors:[]}),null===t||void 0===t||t.forEach((function(t){t.value===e.value&&(t.checked=a)})),n.setState({ballsNumber:t}))},n.handleChange=function(e){var a;n.setState((a={},Object(c.a)(a,e.target.name,e.target.value),Object(c.a)(a,"errors",[]),a))},n.componentWillMount=Object(m.a)(u.a.mark((function e(){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n.retrieveData();case 2:case"end":return e.stop()}}),e)}))),n.retrieveData=Object(m.a)(u.a.mark((function e(){var a,t,r,o;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=[],e.prev=1,e.next=4,F();case 4:t=e.sent,r=t.data,o=ue.chain(r).sortBy("gameNumber").value(),a.push.apply(a,o),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(1),console.log(e.t0);case 13:n.setState({retrievedData:a,loading:!1});case 14:case"end":return e.stop()}}),e,null,[[1,10]])}))),n.handleDelete=function(){var e=Object(m.a)(u.a.mark((function e(a){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,n.setState({loading:!0}),e.next=4,R(a.gameId);case 4:return e.next=6,n.retrieveData();case 6:n.setState({loading:!1}),e.next=13;break;case 9:e.prev=9,e.t0=e.catch(0),n.setState({loading:!1}),console.log(e.t0);case 13:case"end":return e.stop()}}),e,null,[[0,9]])})));return function(a){return e.apply(this,arguments)}}(),n.handleDuplicate=function(){var e=Object(m.a)(u.a.mark((function e(a){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n.setState({gameToDuplicate:a}),n.modalState(!0);case 2:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}(),n.duplicateGame=Object(m.a)(u.a.mark((function e(){var a,t,r,o;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n.setState({loading:!0}),e.prev=1,a=n.state,t=a.gameToDuplicate,r=a.gameNumberDuplicate,null!=t){e.next=5;break}return e.abrupt("return");case 5:return o={initialGameNumber:r,finalGameNumber:r,gameDescription:t.gameDescription,numbersPlayed:t.numbersPlayed},e.next=8,A(o);case 8:return e.next=10,n.retrieveData();case 10:n.modalState(!1),n.setState(n.initiateState()),e.next=17;break;case 14:e.prev=14,e.t0=e.catch(1),n.setState({loading:!1});case 17:case"end":return e.stop()}}),e,null,[[1,14]])}))),n.modalState=function(){var e=Object(m.a)(u.a.mark((function e(a){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n.setState({modalOpened:a,gameNumberDuplicate:""});case 1:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}(),n.state=n.initiateState(),n}return Object(p.a)(t,[{key:"render",value:function(){var e=this,a=this.props.classes,t=this.state,n=t.gameNumberDuplicate,o=t.loading,l=t.initialGameNumber,c=t.finalGameNumber,i=t.ballsNumber,s=t.errors,u=t.retrievedData,m=t.modalOpened,d=t.gameDescription;return!0===this.state.loading?r.a.createElement("div",{className:a.root},this.state.loading&&r.a.createElement(S.a,{size:150,className:a.uiProgess})):r.a.createElement("main",null,r.a.createElement("div",{className:a.toolbar}),r.a.createElement(ae.a,{className:a.root},r.a.createElement(te.a,null,r.a.createElement("form",{className:a.formInput,noValidate:!0,autoComplete:"off"},r.a.createElement("div",{className:a.inputsGameNumber},r.a.createElement(J.a,{type:"number",name:"initialGameNumber",id:"initialGameNumber",label:"Initial Game Number",value:l,onChange:this.handleChange}),r.a.createElement(J.a,{type:"number",name:"finalGameNumber",id:"finalGameNumber",label:"Final Game Number",value:c,onChange:this.handleChange}),r.a.createElement(J.a,{name:"gameDescription",id:"gameDescription",label:"Game Description",inputProps:{maxLength:12},value:d,onChange:this.handleChange})),r.a.createElement("div",{className:a.inputField},r.a.createElement(x.a,{variant:"h5",component:"h2",className:a.numbers},null===i||void 0===i?void 0:i.map((function(t,n){if(!(n>8))return r.a.createElement("span",{key:t.value,className:t.checked?a.ballChecked:a.ball,onClick:function(){return e.onClickBall(t)}},t.value)}))),r.a.createElement(x.a,{variant:"h5",component:"h2",className:a.numbers},null===i||void 0===i?void 0:i.map((function(t,n){if(!(n<9||n>17))return r.a.createElement("span",{key:t.value,className:t.checked?a.ballChecked:a.ball,onClick:function(){return e.onClickBall(t)}},t.value)}))),r.a.createElement(x.a,{variant:"h5",component:"h2"},null===i||void 0===i?void 0:i.map((function(t,n){if(!(n<18))return r.a.createElement("span",{key:t.value,className:t.checked?a.ballChecked:a.ball,onClick:function(){return e.onClickBall(t)}},t.value)})))),r.a.createElement("div",{className:a.inputField},r.a.createElement(D.a,{type:"submit",variant:"contained",color:"primary",disabled:o,onClick:this.handleSubmit},"Save")),r.a.createElement("div",{className:a.inputField},r.a.createElement(x.a,{variant:"body2",className:a.customError},s))))),null===u||void 0===u?void 0:u.map((function(a){return r.a.createElement(Ee,{key:a.gameId,game:a,handleDelete:e.handleDelete,plusAction:e.handleDuplicate})})),r.a.createElement(Se.a,{open:m||!1,"aria-labelledby":"simple-modal-title","aria-describedby":"simple-modal-description"},r.a.createElement("div",{className:[a.paper,a.modalStyle].join(" ")},r.a.createElement("div",null,r.a.createElement(J.a,{type:"number",name:"gameNumberDuplicate",id:"gameNumberDuplicate",label:"Game Number",value:n,onChange:this.handleChange})),r.a.createElement(he.a,{color:"primary","aria-label":"upload picture",component:"span",onClick:function(){return e.modalState(!1)}},r.a.createElement(je.a,null)),r.a.createElement(he.a,{color:"primary","aria-label":"upload picture",component:"span",onClick:function(){return e.duplicateGame()}},r.a.createElement(Pe.a,null)))))}}]),t}(n.Component),Te=C()(Be)(Ie),Ge=t(133),We=t(24),Le=t(251),Me=function(e){return Object(j.a)({content:{flexGrow:1,padding:e.spacing(3)},toolbar:e.mixins.toolbar,root:{marginBottom:10},bullet:{display:"inline-block",margin:"0 2px",transform:"scale(0.8)"},title:{fontSize:18},pos:{marginBottom:12},ball:{backgroundColor:"white",border:"1px solid",borderRadius:50,padding:2,marginRight:2,color:"black",fontWeight:"bold",cursor:"pointer"},ballChecked:{backgroundColor:"green",border:"1px solid",borderRadius:50,padding:2,marginRight:2,color:"white",fontWeight:"bold",cursor:"pointer"},numbers:{marginBottom:10},formInput:{marginBottom:10,marginRight:5},ballsNumbers:{marginTop:20},inputField:{marginTop:10},customError:{color:"red",fontSize:"0.8rem",marginTop:10},uiProgess:{position:"fixed",Index:"1000",height:"31px",width:"31px",left:"50%",top:"35%"},inputsGameNumber:{display:"flex",flexDirection:"column",marginBottom:10,maxWidth:200}})},ze=function(e){Object(h.a)(t,e);var a=Object(v.a)(t);function t(e){var n;return Object(d.a)(this,t),(n=a.call(this,e)).handleDateChange=function(e){n.setState({drawDate:e})},n.componentDidMount=Object(m.a)(u.a.mark((function e(){var a;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,H();case 3:e.next=9;break;case 5:e.prev=5,e.t0=e.catch(0),localStorage.removeItem("AuthToken"),null===(a=n.props.history)||void 0===a||a.push("/login");case 9:case"end":return e.stop()}}),e,null,[[0,5]])}))),n.initiateState=function(){return{loading:!0,drawNumber:"",drawDate:new Date,ballsNumber:[{value:"01",checked:!1},{value:"02",checked:!1},{value:"03",checked:!1},{value:"04",checked:!1},{value:"05",checked:!1},{value:"06",checked:!1},{value:"07",checked:!1},{value:"08",checked:!1},{value:"09",checked:!1},{value:"10",checked:!1},{value:"11",checked:!1},{value:"12",checked:!1},{value:"13",checked:!1},{value:"14",checked:!1},{value:"15",checked:!1},{value:"16",checked:!1},{value:"17",checked:!1},{value:"18",checked:!1},{value:"19",checked:!1},{value:"20",checked:!1},{value:"21",checked:!1},{value:"22",checked:!1},{value:"23",checked:!1},{value:"24",checked:!1},{value:"25",checked:!1}],errors:[]}},n.handleSubmit=function(){var e=Object(m.a)(u.a.mark((function e(a){var t,r,o,l,c,i;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a.preventDefault(),t=n.state,r=t.drawNumber,o=t.drawDate,l=t.ballsNumber,!(null==r||Number(r)<=0||null==o)){e.next=5;break}return n.setState({errors:["Inform the Game Number"]}),e.abrupt("return");case 5:return n.setState({loading:!0}),c=null===l||void 0===l?void 0:l.filter((function(e){return e.checked})),i={drawNumber:r,drawDate:o,numbersDrawn:null===c||void 0===c?void 0:c.map((function(e){return e.value}))},e.prev=8,e.next=11,L(i);case 11:return e.next=13,n.retrieveData();case 13:n.setState(n.initiateState()),e.next=19;break;case 16:e.prev=16,e.t0=e.catch(8),n.setState({loading:!1});case 19:case"end":return e.stop()}}),e,null,[[8,16]])})));return function(a){return e.apply(this,arguments)}}(),n.onClickBall=function(e){var a=!e.checked,t=n.state.ballsNumber,r=null===t||void 0===t?void 0:t.filter((function(e){return e.checked}));r&&15===(null===r||void 0===r?void 0:r.length)&&a?n.setState({errors:["Only 15 numbers"]}):(n.setState({errors:[]}),null===t||void 0===t||t.forEach((function(t){t.value===e.value&&(t.checked=a)})),n.setState({ballsNumber:t}))},n.handleChange=function(e){n.setState(Object(c.a)({},e.target.name,e.target.value))},n.componentWillMount=Object(m.a)(u.a.mark((function e(){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n.retrieveData();case 1:case"end":return e.stop()}}),e)}))),n.retrieveData=Object(m.a)(u.a.mark((function e(){var a,t,r,o;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=[],e.prev=1,e.next=4,z();case 4:t=e.sent,r=t.data,o=ue.chain(r).sortBy("drawNumber").value(),a.push.apply(a,o),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(1),console.log(e.t0);case 13:n.setState({retrievedData:a,loading:!1});case 14:case"end":return e.stop()}}),e,null,[[1,10]])}))),n.handleDelete=function(){var e=Object(m.a)(u.a.mark((function e(a){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,n.setState({loading:!0}),e.next=4,M(a.drawId);case 4:return e.next=6,n.retrieveData();case 6:n.setState({loading:!1}),e.next=13;break;case 9:e.prev=9,e.t0=e.catch(0),n.setState({loading:!1}),console.log(e.t0);case 13:case"end":return e.stop()}}),e,null,[[0,9]])})));return function(a){return e.apply(this,arguments)}}(),n.state=n.initiateState(),n}return Object(p.a)(t,[{key:"render",value:function(){var e=this,a=this.props.classes,t=this.state,n=t.loading,o=t.drawNumber,l=t.drawDate,c=t.ballsNumber,i=t.errors,s=t.retrievedData;return!0===this.state.loading?r.a.createElement("div",{className:a.root},this.state.loading&&r.a.createElement(S.a,{size:150,className:a.uiProgess})):r.a.createElement("main",{className:a.content},r.a.createElement("div",{className:a.toolbar}),r.a.createElement(ae.a,{className:a.root},r.a.createElement(te.a,null,r.a.createElement("form",{className:a.formInput,noValidate:!0,autoComplete:"off"},r.a.createElement("div",{className:a.inputsGameNumber},r.a.createElement(J.a,{type:"number",name:"drawNumber",id:"drawNumber",label:"Draw Number",value:o,onChange:this.handleChange})),r.a.createElement("div",null,r.a.createElement(We.a,{utils:Ge.a},r.a.createElement(Le.a,{disableToolbar:!0,variant:"inline",format:"dd/MM/yyyy",margin:"normal",id:"date-picker-inline",label:"Date picker inline",value:l,onChange:function(a){return e.handleDateChange(a)},KeyboardButtonProps:{"aria-label":"change date"}}))),r.a.createElement("div",{className:a.inputField},r.a.createElement(x.a,{variant:"h5",component:"h2",className:a.numbers},null===c||void 0===c?void 0:c.map((function(t,n){if(!(n>8))return r.a.createElement("span",{key:t.value,className:t.checked?a.ballChecked:a.ball,onClick:function(){return e.onClickBall(t)}},t.value)}))),r.a.createElement(x.a,{variant:"h5",component:"h2",className:a.numbers},null===c||void 0===c?void 0:c.map((function(t,n){if(!(n<9||n>17))return r.a.createElement("span",{key:t.value,className:t.checked?a.ballChecked:a.ball,onClick:function(){return e.onClickBall(t)}},t.value)}))),r.a.createElement(x.a,{variant:"h5",component:"h2"},null===c||void 0===c?void 0:c.map((function(t,n){if(!(n<18))return r.a.createElement("span",{key:t.value,className:t.checked?a.ballChecked:a.ball,onClick:function(){return e.onClickBall(t)}},t.value)})))),r.a.createElement("div",{className:a.inputField},r.a.createElement(D.a,{type:"submit",variant:"contained",color:"primary",disabled:n,onClick:this.handleSubmit},"Save")),r.a.createElement("div",{className:a.inputField},r.a.createElement(x.a,{variant:"body2",className:a.customError},i))))),null===s||void 0===s?void 0:s.map((function(a){return r.a.createElement(Ee,{key:a.drawId,game:{gameId:a.drawId,gameNumber:a.drawNumber,numbersPlayed:a.numbersDrawn},handleDelete:e.handleDelete})})))}}]),t}(n.Component),Ae=C()(Me)(ze);l.a.render(r.a.createElement(q.a,null,r.a.createElement(V,null,r.a.createElement(P.c,null,r.a.createElement(P.a,{exact:!0,path:"/",component:Ce}),r.a.createElement(P.a,{exact:!0,path:"/game",component:Te}),r.a.createElement(P.a,{exact:!0,path:"/draw",component:Ae}),r.a.createElement(P.a,{exact:!0,path:"/login",component:_}),r.a.createElement(P.a,{exact:!0,path:"/account",component:se})))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[153,1,2]]]);
//# sourceMappingURL=main.06da0988.chunk.js.map