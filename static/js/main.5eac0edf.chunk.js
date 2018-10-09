(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{107:function(e){e.exports=[{constant:!0,inputs:[],name:"number",outputs:[{name:"",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[],name:"price",outputs:[{name:"",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{inputs:[],payable:!1,stateMutability:"nonpayable",type:"constructor"},{anonymous:!1,inputs:[{indexed:!1,name:"_number",type:"uint256"}],name:"newNumber",type:"event"},{constant:!1,inputs:[{name:"_number",type:"uint256"}],name:"setNumber",outputs:[],payable:!0,stateMutability:"payable",type:"function"},{constant:!1,inputs:[{name:"_address",type:"address"}],name:"transfer",outputs:[{name:"",type:"bool"}],payable:!1,stateMutability:"nonpayable",type:"function"}]},120:function(e,t,a){e.exports=a(256)},247:function(e,t,a){},256:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),s=a(101),c=a.n(s),i=a(102),l=a(103),o=a(118),m=a(104),u=a(119),b=a(16),d=a(105),h=a(106),y=a.n(h),p=a(107),v=a(108),f=a(117),w=a(259),E=a(258);a(247);function N(){var e=Object(d.a)(["\n    display: block;\n    margin: 0 auto;\n    border-color: red;\n"]);return N=function(){return e},e}var g=Object(f.a)(N()),S=r.a.createElement("div",{style:{marginTop:"25px"},className:"container"},r.a.createElement("div",{className:"row justify-content-center"},r.a.createElement("div",{className:"col-md-8"},r.a.createElement("h1",null,"Please install MetaMask or log in ir order to use this website"),r.a.createElement("a",{href:"https://metamask.io/",target:"blank"},"Click here to install")))),k=r.a.createElement("div",{style:{marginTop:"25px"},className:"container"},r.a.createElement("div",{className:"row justify-content-center"},r.a.createElement("div",{className:"col-md-8"},r.a.createElement("h1",null,"Please login on ethereum mainnet")))),C=function(e){function t(){var e;return Object(i.a)(this,t),(e=Object(o.a)(this,Object(m.a)(t).call(this))).state={isConnected:!1,correctNetwork:!1,currentNumber:"",currentPrice:"",newNumber:"",loading:!1,show:!1},"undefined"!==typeof window.web3&&(e.web3=new y.a(window.web3.currentProvider)),e.web3.version.getNetwork(function(t,a){return"1"===a?e.setState({correctNetwork:!0}):""}),e.contract="",e.onChange=e.onChange.bind(Object(b.a)(Object(b.a)(e))),e.onSubmit=e.onSubmit.bind(Object(b.a)(Object(b.a)(e))),e.handleDismiss=e.handleDismiss.bind(Object(b.a)(Object(b.a)(e))),e.handleShow=e.handleShow.bind(Object(b.a)(Object(b.a)(e))),e}return Object(u.a)(t,e),Object(l.a)(t,[{key:"componentWillMount",value:function(){var e=this;this.web3&&this.web3.isConnected()&&this.web3.eth.accounts.length>0&&(this.setState({isConnected:!0}),this.contract=this.web3.eth.contract(p).at("0xb86CE7CE17E82eF7cab5ed8a86B736A494fE3935"),this.web3.eth.defaultAccount=this.web3.eth.accounts[0],this.getCurrentNumber(),this.getCurrentPrice(),this.contract.newNumber().watch(function(t,a){t||(e.setState({currentNumber:a.args._number.toNumber()}),e.getCurrentPrice()),document.getElementById("overlay").style.display="none",e.setState({loading:!1})}))}},{key:"getCurrentNumber",value:function(){var e=this;this.contract.number(function(t,a){t&&e.setState({currentNumber:"Unavailable"}),e.setState({currentNumber:a.toNumber()})})}},{key:"getCurrentPrice",value:function(){var e=this;this.contract.price(function(t,a){t&&e.setState({currentPrice:"Unavailable"}),e.setState({currentPrice:e.web3.fromWei(a.toNumber(),"ether")})})}},{key:"onChange",value:function(e){this.setState({newNumber:e.target.value})}},{key:"onSubmit",value:function(e){var t=this;e.preventDefault(),document.getElementById("overlay").style.display="block",this.setState({loading:!0});var a=this.web3.toWei(this.state.currentPrice,"ether");this.contract.setNumber(this.state.newNumber,{from:this.web3.eth.defaultAccount,value:a,gas:3e5},function(e,a){e&&t.state.loading&&(t.setState({loading:!1}),document.getElementById("overlay").style.display="none",t.handleShow())}),this.setState({newNumber:""})}},{key:"handleShow",value:function(){this.setState({show:!0})}},{key:"handleDismiss",value:function(){this.setState({show:!1})}},{key:"render",value:function(){return this.state.isConnected?this.state.correctNetwork?r.a.createElement("header",null,r.a.createElement("div",{className:"sun"}),r.a.createElement("div",{className:"cloud c1"}),r.a.createElement("div",{className:"cloud c2"}),r.a.createElement("div",{className:"cloud c3"}),r.a.createElement("div",{className:"cloud c4"}),r.a.createElement("div",{className:"cloud c5"}),r.a.createElement("div",{className:"day"}),r.a.createElement("div",{className:"moon"}),r.a.createElement("div",{className:"horizon"}),r.a.createElement("div",{className:"walk"}),r.a.createElement("h1",null,r.a.createElement("div",{className:"block"},r.a.createElement("div",{className:"row justify-content-center"},r.a.createElement("div",{className:"col-md-4"},r.a.createElement("div",{id:"overlay"},r.a.createElement("div",{id:"text"},r.a.createElement("span",{style:{fontSize:"16px",fontFamily:"Cursive"}},"Transactions on blockchain might take a while Please wait..."),r.a.createElement(v.DotLoader,{className:g,loading:this.state.loading,color:"#fff"}))))),r.a.createElement("div",{className:"row justify-content-center"},r.a.createElement("div",{className:"col-md-4"},this.state.show?r.a.createElement(w.a,{bsStyle:"danger",onDismiss:this.handleDismiss},r.a.createElement("h4",null,"Oh snap! You got an error!"),r.a.createElement("p",null,"Change this and that and try again."),r.a.createElement("p",null,r.a.createElement(E.a,{className:"btn btn-info btn-block mt-4",onClick:this.handleDismiss},"Hide Alert"))):"")),r.a.createElement("div",{className:"row justify-content-center"},r.a.createElement("div",{className:"col-md-4"},r.a.createElement("form",{onSubmit:this.onSubmit},r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"number"}),r.a.createElement("input",{value:this.state.newNumber,onChange:this.onChange,type:"number",min:"0",className:"form-control",id:"number",placeholder:"Type your number"}),r.a.createElement("small",{id:"number",style:{fontSize:"11px"},className:"form-text text-muted"},"Your number is now safe.")),r.a.createElement("button",{type:"submit",className:"btn btn-info btn-block"},"Save!")),r.a.createElement("div",{style:{fontSize:"16px",fontFamily:"cursive"}},"Current Number: \xa0  ",this.state.currentNumber),r.a.createElement("div",{style:{fontSize:"10px",fontFamily:"cursive",marginTop:"5px"}},"Current Price: \xa0 ",this.state.currentPrice," ETH")))),r.a.createElement("div",{className:"row justify-content-center"},r.a.createElement("span",{style:{fontSize:"14px",marginTop:"25px",fontFamily:"cursive"}},"Save your favorite number on ethereum blockchain!")))):k:S}}]),t}(n.Component);c.a.render(r.a.createElement(C,null),document.getElementById("root"))}},[[120,2,1]]]);
//# sourceMappingURL=main.5eac0edf.chunk.js.map