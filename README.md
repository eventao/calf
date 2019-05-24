# 前端日常记录

## 一百零四、js判断div内容是否超出  

## 一百零三、js判断当前网速  

## 一百零二、clipboard.js 用于浏览器中js复制网页内容
**问题**
在iOS手机中，chrome与safari 都不能复制成功  

**解决**
要复制的元素必须是input或者textarea，并且要放在form中，  
参考 https://stackoverflow.com/questions/34045777/copy-to-clipboard-using-javascript-in-ios    

## 一百零一、You may have an infinite update loop in a component render function
**问题**
vue警告 理论上，可能因为修改到循环对象，诱发无限循环。

**解决**
https://blog.meathill.com/js/vue/fix-vue-warn-you-may-have-an-infinite-update-loop-in-a-component-render-function.html

## 一百、sass-resources-loader
**问题**
vue不能在全局引用sass|scss文件后,再在其他vue文件中使用该文件的@mixin 和 @function

**解决**
采用 sass-resources-loader 

**介绍**
[sass-resources-loader使用](https://www.jianshu.com/p/a8a153c2411e)


## 九十九、css in js
程序可配置性

## 九十八、通过子组件的dom事件冒泡到父组件,可以在父组件中处理子组件的事件逻辑.

## 九十七、There are multiple modules with names that only differ in casing.
**原因**引入模块时文件名大小写拼写错误

**解决** [查看解决](https://segmentfault.com/q/1010000010022922/a-1020000010023303)


## 九十六、ios中,input得到焦点弹出键盘，键盘可能会挡住输入框，
**解决** 当键盘弹出后，将html body 滚动到最底部 ！
(```)
    setTimeout(() => {
      $('html,body').animate({
        scrollTop:500000
      },200);
    },400);
(```)

## 九十五、input type="button" 在Chrome上调试好的样式，iphone上样式却被添加了许多默认样式。
**原因** appearance
**解决**
(```)
  input[type="button"], input[type="submit"], input[type="reset"] {
    -webkit-appearance: none;
    user-select: none;
    white-space: pre;
  }
(```)

## 九十四、优化页面内容到达时间
**解决**
1.进入页面时将数据缓存到浏览器本地,第二次进入页面时,先读取本地缓存数据绑定到界面,
2.再请求服务器端数据,存入缓存并绑定到页面
3.这样用户就感觉不到页面加载,并且保证数据及时更新


## 九十三、safari表单提交,开启html默认验证,提交非法数据时,safari崩溃
**如** <input v-model="person.mobile" required . . .  提交空数据会导致safari崩溃
**解决** 在form标签上添加novalidate 关闭html form 默认验证,然后自定义验证规则


## 九十二、ios10中无法完全禁止Safari浏览器用户缩放页面
**该问题目前并不能完全解决**

[参考文章](https://stackoverflow.com/questions/37808180/disable-viewport-zooming-ios-10-safari)
(```)	
<meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0;" name="viewport" />
	window.onload=function () {
        document.addEventListener('touchstart',function (event) {
            if(event.touches.length>1){
                event.preventDefault();
            }
        })
        var lastTouchEnd=0;
        document.addEventListener('touchend',function (event) {
            var now=(new Date()).getTime();
            if(now-lastTouchEnd<=300){
                event.preventDefault();
            }
            lastTouchEnd=now;
        },false)
	}
(```)




## 九十一、contenteditable=true的div点击时应得到焦点,iphone (6|6s)上却不灵敏,要使劲点或多点几下才能得到焦点

	原因:

	解决:判断当前手机为iphone后, 在该可编辑div上添加一个textarea,当textarea得到焦点后,将焦点设置到可编辑div上.


## 九十、postMessage坑 targetWindow.postMessage(message，targetOrigin，[ transfer ]);
	postMessage方法的第二个参数,需要传目标源targetOrigin,
	如果目标主机名为类似 //api.data.com 的没有指定协议名称,则系统会报错 无效的目标源
		Uncaught DOMException: Failed to execute 'postMessage' on 'Window': Invalid target origin '//api.data.com' in a call to 'postMessage'.

	解决: 将当前页面url的协议名称添加到以上目标源
		获取当前页面url的协议名称 location.protocol

## 八十九、事件穿透
	解决 fastclick.js
	将隐藏层的代码延迟(放入setTimeout中)

## 八十八、Chrome中登录成功点击保存用户名和密码之后,
下次只要进入包含 input type="password" 密码框的页面时,Chrome都会将保存的用户名和密码填充进input
	解决: 在 input type="password" 的元素上添加 autocomplete="new-password"


## 八十七、连续的数字或英文超出元素之后不自动换行
	解决: word-wrap:break-word;

## 八十六、"幽灵点击"事件,按钮的touchend事件发生时跳转页面,当用户滚动页面结束时,也触发了touchend事件页面跳转,这其实并不是用户想要的.
	解决:
	首选解决  使用 hammerjs 监听移动端手势事件
			实际项目中,采用事件托管的思想,封装了一个Tool类

	解决二、监听容器的scroll事件,并设置变量scrolled为true,touchend事件设置scrolled为false.
	按钮的touched事件发生时判断scrolled为false时才跳转页面

## 八十五、Failed to resolve directive: mode
	原因:不能解析mode指令, v-model写成了v-mode
	解决:

## 八十四、如果一个div高度要占满屏幕高度,采用100vh , 实际上在Android Chrome 上100vh会包含地址栏的高度,
	就会出现滚动条.
	解决:
	方法一,设置html body 的宽高为100%, 相应的div的宽高也设为100%
	方法二,获取window.innerHeight来给该div赋高度值 !

## 八十三、pc端Chrome最低只能识别12像素的文字,但在手机上的Chrome可以识别更小的字体
	造成pc端字体设好后,到手机上所有文字都很小了!

	解决:连上数据线,使用chrome浏览器调试工具调试手机,时刻已手机效果为准


## 八十二、transform对行元素无效
	https://www.cnblogs.com/fayin/p/9755590.html

## 八十一、Safari video 不能自动播放,
	解决:

## 八十、Safari html标签 video 播放后自动全屏?
	解决:在video标签上添加playsinline属性

## 七十九、tarnsform之后导致字体模糊,
	原因:当元素进入GPU中渲染时，在Chrome35+中的字体为grayscale渲染，IE11和FF30保持sub-pixel渲染不变。若transform值函数(如translate3d(), scale(), rotate()等)中的参数为非整数，会导致字体模糊。在使用iScroll模拟滚动的项目中会出现字体模糊。
	解决:transform值尽量改为整数或靠近整数
	https://www.cnblogs.com/milo-wjh/p/6364138.html

问题、反爬虫,如何隐藏ajax数据的真实地址 *************
	解决：1、服务器端将数据api url动态路由配置为伪静态,如"api-data.css",
	并返回一段css代码给客户端。同时,将真实的数据写入自定义的http头,
	客户端通过指定的http头获取数据。以此迷惑爬虫。
		2、使用websoket主动推数据

问题、绝对定位居中
	解决：position: absolute;
		top:50%;left:50%;
        transform:translateY(-50%);

问题、拒绝服务攻击的原理与防御
	解決：https://blog.csdn.net/qq_32400847/article/details/63262965
	http://www.docin.com/p-784968579.html

问题、vue运行后Chrome报警告
	Input elements should have autocomplete attributes (suggested: "username"): (More info: https://goo.gl/9p2vKq)
	原因：

	解决：
		给input标签上添加autocomplete = 'username' 属性。

问题、编译vue项目出现以下错误：
	Error: listen EADDRNOTAVAIL 192.168.199.123:8080。
	错误原因：
		本机ip地址发生变化.
	解决：
		1、vue项目中 /config/index.js  将module.exports.dev.host 的值改为 'localhost';
		2、https://blog.csdn.net/github_38851471/article/details/80261805

问题、隐藏未编译的mustache标签
	提升用户体验：v-cloak
	这个指令保持在元素上直到关联实例结束编译。和 CSS 规则如 [v-cloak] { display: none } 一起用时，这个指令可以隐藏未编译的 Mustache 标签直到实例准备完毕。
	防止刷新页面，网速慢的情况下出现{{ message }}等数据格式
	<div v-cloak>
	  {{ message }}
	</div>

问题、event-stream被黑客攻击事件
	由于vue依赖event-stream
	http://www.sohu.com/a/278048888_609397

问题、ie11兼容
	不支持:
		for of 循环
		Object.entries


问题、作用域变量左查询右查询 js


问题、ios橡皮筋效果

	-webkit-overflow-scrolling:auto; 手指移开滚动即刻停止
	-webkit-overflow-scrolling:touch; 手指移开滚动保持惯性,并具有回弹效果
	https://www.cnblogs.com/xiahj/p/8036419.html

问题、如何监听多个异步ajax请求全部完成?
	解决:
	一、Promise.all
	https://www.jianshu.com/p/7e60fc1be1b2
	二、定义一个变量a初始化为0,每个ajax请求完成后都将变量a加一.
	然后监听变量a的变化,当a的值变为ajax请求个数后就表示多个ajax请求完成!
	三、jquery $.when();
	https://blog.csdn.net/fsdad/article/details/71514822


问题、限制输入框只能输入6个双字节字符(比如汉字)或12个单字节字符(比如英文字母)
	解决、
	/*
    * 获取字符串的长度(双字节字符算2,单字节字符算1)
    * */
    String.prototype.dblength = function () {
        let str = this, leg = str.length;
        Object.values(str).forEach(v => {
            let db = v.charCodeAt(0).toString(16).length === 4;
            if (db) leg += 1;
        });
        return leg;
    };
	// 以下为vue实现的关键代码
    nicknameInputing(){
        const real = this.editingNickNameVal.trim();
        const dLength = real.dblength();
        if(dLength > 12){
            Object.values(real).forEach(v => {
                this.nicknameInputObj.totalLen += v.dblength(v);
                if(this.nicknameInputObj.totalLen < 13){
                    this.nicknameInputObj.subValue.push(v);
                }
            });
            this.editingNickNameVal = this.nicknameInputObj.subValue.join('');
        }
    }

问题、File inputs are read only. Use a v-on:change listener instead.
	input file 组件,用v-model绑定值报错!
	解决、不要用v-model绑定input file ,而是用@change事件!

问题、vue文件以大写字母开头,配置vue-router时,引用vue文件,文件名写成小写,运行npm run build,在windows中正常
但在linux中报错,说找不到文件,  要区分大小写
	解决.在配置vue-router的配置文件中,vue文件改为大写字母开头.

问题、原生js如何直接获取上一个兄弟元素
let stageDelegateDiv = document.querySelector('#StageDelegateDiv');
stageDelegateDiv.previousElementSibling

问题、transform:translateZ(0) 为什么能提升性能?
	解答:这个问题是因为使用transform和opacity做CSS动画的时候，会将元素提升为一个复合层；而使用js操作css属性做动画时，必须使用translateZ或will-change才能将元素强行提升至一个复合层。
	https://segmentfault.com/q/1010000007962353


问题、界面按钮点击,ajax请求一个动态链接后.使用window.open()新开浏览器标签页打开该动态链接.
	结果被Chrome浏览器拦截了?

	解决:
	1、在按钮单击事件中 let childWindow = window.open() 打开一个空白新标签页;
	ajax获取动态链接后 childWindow.location = 动态链接,就可以解决了!
    2、在按钮单击事件中 先新打开一个本网站的标签页面，再在新页面中使用iframe将要打开的外网链接进来

问题、vue 运行npm run build 生成整个站点代码后，vue官方说的是需要托管在web服务器中才能访问。
但在运营时，需要把代码拷贝到站点子目录中，由于vue生成后的代码的所有资源引用是从根目录开始 “/” 开头
就造成了资源引用出错的问题；
	解决：
	1、修改config => index.js => build => assetsPublicPath 中的'/'成为'./'
	2、在build => util.js 里找到ExtractTextPlugin.extract增加一行：publicPath: '../../'，主要解决背景图片路径的问题。
	引用https://blog.csdn.net/qq_37281252/article/details/79442355；


问题、控制transition
	css3 transition-timing-function:cubic-bezier; 贝塞尔曲线控制速度

css3 属性pointer-events
http://www.css88.com/book/css/properties/user-interface/pointer-events.htm

问题：a标签地址为apk链接，点击该a标签华为荣耀8|荣耀9自带浏览器，不能下载apk文件。
	解决：1、 在服务武器端将apk文件的MIME类型配置为 application/vnd.android.package-archive
	想尝试服务器端动态跳转 (此方法无效)

问题：css3 calc 函数
	width: calc(100% - 10px)；
http://www.css88.com/book/css/values/functional/calc().htm

问题：在登录的时候使用的是get登录，用户名和密码为admin/abc!@#123,
	拼接出来的地址  /admin/login?username=admin&password=abc!@#123 ，
	于是乎在后台nodoejs获取get参数时将#后的字符忽略了， 导致怎么登录都失败。
	解决:1、改为post提交！

熟练使用fireworks，以及一些photoshop 的切图功能
能精准的还原设计师设计的效果图
	比如，设计师在制作效果图时候，并没有标记某一块区域的颜色值，字体，文字大小时候，
如何精准确定该区域的颜色，字体，文字大小等样式的值？

问题二：
  HTML5中新增了日历控件，如果将控件的type=“datetime-local”，如果是Chrome，控件的日期显示格式是2016/05/30 08:00 ，如果是Safari，日期的显示格式是：2016-05-31T08:00，当我们用JQuery取值赋值的时候，就必须用这种方式才能赋值：假如说这个日历控件的id是timeDate，代码如下：

	$("#timeDate').val("2018-10-16T08:30");
	但是，用$("#timeDate').val("2018/10/16 08:30");就会报错。
	可是Chrome的显示方式就是这样的啊！！！尼玛的还有天理吗？


问题、var date =new Date("2018-10-16 08:00");
在ios的Safari上date.getFullYear() 得到的是NaN();
解决  var date =new Date("2018/10/16 08:00");
将短横线改为斜杠就行了。

问题、
Chrome 69.0.3497.100（正式版本） （64 位） 2018年10月15日时的最新版
使用最新的es6函数 String.padStart 在chrome上没有问题，
但为了兼容不支持String.padStart方法的浏览器，于是在String.prototype.padStart上定义了该函数
String.prototype.padStart = function (maxLength, fillString = ' ')
上线后，用户却不断提交  undefined1  undefined2   undefined3   undefined4  等数据。
怎么查都查不到问题，猜想觉得应该是黑客攻击乱填的数据。

后来的一次测试过程中，测试人员采用了
UC浏览器6.2.4094.1 2018年10月15日的最新版
也发现了以上问题， 原来es6 的padStart 函数的第二个参数支持数字，  而我写的 padStart 函数不支持数字，传了数字就会出现以上异常数据。
然后我就去修复了这个bug。及时向上级报告并紧急上线了。


问题、Blocked a frame with origin "http://api.devbycalf.com" from accessing a cross-origin frame.
	iframe嵌入页面时，报错。

问题、git pull时遇到error: cannot lock ref ‘xxx’: ref xxx is at （一个commitID） but expected的解决办法

	解决 https://blog.csdn.net/qq_15437667/article/details/52479792

问题、font-size: 0;解决inline元素间的空白间隙
	https://blog.csdn.net/lihchweb/article/details/74654154

问题、e.keyCode === 13 已经废弃，要判断回车键使用
	e.key === 'Enter' || e.code === 'NumpadEnter'


问题、表格布局，某一行的某一列的数据特别多，多到撑出电脑屏幕外了，
	按理说只需要将那一列内容的容器上加上overflow-y:auto;height:设为固定，使其能滚动起来就好了。
	但产品经理在使用的时候，发现每行的那一列的内容多少不一样，造成右边的滚动条有的很长，有的很短不方便鼠标点中。于是乎就有了一个需求，
	要求不管内容多少，滚动条要一样长。方便点击滚动条。

	解决、


问题、封装多个控件，有六个以上控件会用到用户信息，
但用户信息包含实时数据，本地不能缓存，只能从服务器请求。就会造成一打开网页同时发起十几个用户信息请求
	解决、将请求放入 new Promise(resolve){} 中，
		只有第一个请求进入Promise时才发起ajax请求数据，
		在第一个请求数据完成之前，所有其他请求的promise resolve都存入数组中。
		在第一个请求数据完成之后，遍历执行上一步数组中所有请求的promise resolve，并将数据作为参数传递出去。
	伪代码、
	  userResolves:[],
	  userInfoGetting:false,
	  //获取个人信息
	  getUserInfo() {
	    let that = this;
	    return new Promise(resolve => {      //将请求放入 new Promise(resolve){} 中，
	      	that.userResolves.push(resolve); //在第一个请求数据完成之前，所有的请求都存入变量中。

          	if(!that.userInfoGetting){  //只在第一个请求进入时发起ajax请求（加锁防止请求过程中，其他请求的发起）
		          that.userInfoGetting = true;

		          Util.ajaxRequest('/user/info','get').then(res => {
		            that.userInfoGetting = false;//第一个请求完成时,解锁。

		            if (res && res.code === 0) {
		              that.userResolves.forEach(resol => resol(res.data));  //在第一个请求数据完成之后，变量中的请求全部回发数据。
		            }

		          });

	        }
	    });
	  },

问题、shadow-root 待研究


问题、浏览器兼容问题 chrome 与 360
	transform:scale(0.001) 时，chrome中肉眼不可见， 360浏览器中可见到一点。
	解决 设置transform:scale(0.0001)；

问题、jquery如何获取最后或第一个子元素
	https://zhidao.baidu.com/question/2271358649409896628.html

问题、document.selection 结合 createRange
	https://www.cnblogs.com/yxyht/archive/2013/01/23/2872605.html

问题、npm i 已存在package.json和package-lock.json 报错Unexpected token < in JSON at position 3
	解决、删除package-lock.json  再运行 npm i

问题、上传完文件后，如何清空input type="file" 元素的值（以便于可以再次上传同一文件）
	 var file = document.getElementById("fileData");
	 // for IE, Opera, Safari, Chrome
	 if (file.outerHTML) {
		 file.outerHTML = file.outerHTML;
	 } else { // FF(包括3.5)
		 file.value = "";
	 }


问题、上传图片(get提交base64) 报错414，请求链接太长
	Request-URI Too Large
	解决：get改为post

问题、获取图片原始尺寸html5新增img dom对象的属性
	naturalWidth / naturalHeight

问题、input框type=file设置cursor:pointer无效
	设置font-size:0;
	ie就font-size 设置个大点的字体
	chrome下边可以font-size为0
	https://segmentfault.com/q/1010000000599039

问题、文件上传(允许格式设置)
	<input type="file" />
	https://www.cnblogs.com/jiangxiaochang/p/6703730.html
	http://www.w3school.com.cn/tags/att_input_accept.asp
	<input type="file" name="pic" id="pic" accept="image/gif, image/jpeg" />
	如果不限制图像的格式，可以写为：accept="image/*"。

问题、contenteditable="true"的元素，获得焦点后光标处于元素开头
	解决：
		方法一、使用库js库 rangy ;
		let $editor = $(this.$refs.editor);
          let html = $editor.html();
          if (html.length) {
            let range = rangy.createRange();
            let $last = $editor.children().last();
            range.setStartAfter($last[0]);
            range.collapse(false);
            rangy.getSelection().setSingleRange(range);
          }
          $editor.focus();

		方案二、https://segmentfault.com/a/1190000005869372

问题、获取元素最终样式;
	window.getComputedStyle()
	读取元素最终样式，包括了内联样式、嵌入样式和外部样式。

问题、超长纯英文字母超出元素边界，强制超出部分换行
	word-break:break-all。

问题、一个ajax请求json数据 1.59M，一个测试小哥的电脑登录进去，刚一开始ajax请求就中断了。
数据请求是null，没有抱任何错误，不知道是什么原因，其他人都会发起请求一秒钟返回数据没有问题就他一个人有问题。
怀疑是不是他浏览器设置了请求大小限制，
	chrome,  firefox  ,以及其他国产浏览器都没找到哪儿可以设置的。
	卸载chrome重新安装，问题依然存在。
	正在焦虑万分时，一个老司机说如果浏览器阻断请求，应该会报错。
	既然没有报错，会不会是网络原因，电脑设置的原因。
	到了最后，一个服务器端开发过来换了一个账号登录一切正常。
	原来是后台对该账号做了限制。


问题、安全的权限验证机制。生成的token很短时间内token过期，
	方案1 登录成功的凭证token使用websoket 等技术推送到客户端
		缺点：用户页面没关闭就会一直保持登录状态；
	每次过期前，其他请求时由服务器端响应新的tokenresponse head 发回到客户端，由客户端更新token


问题、xhr获取response header 为null
	https://segmentfault.com/a/1190000009125333
	前端只能获取默认的头部，
Cache-Control、Content-Language、Content-Type、Expires
Last-Modified、Pragma
	要想获取到其他的(比如Authorization)需要在服务器端设置
	Access-Control-Expose-Headers : 'Authorization' 规定允许前端获取的头部


问题、elementui 表单验证，输入项小于最大值，大于最小值
	最大最小值是data函数返回对象上动态绑定的属性(由ajax获取)于是就需要自定义验证函数，
	但由于自定义验证函数在Vue对象的data函数中，所以自定义验证函数不能访问到data返回对象的最大最小值。
	this也不会指向data对象。

	解决，将ajax获取到的最大最小值存放在dom上，使用dom操作来获取，

问题、Ajax Reponse 200 ok, but shows failed to load response data
	前端获取同一个接口过于频繁就会出现这个问题，
	更具体原因应该是php服务器端没有返回正确的json数据

问题、vue只有npm run dev 和npm run build 怎样扩展出npm run test ;
	要区分开发环境   测试环境  生产环境  线上环境
	https://blog.csdn.net/web_youth/article/details/80052304

问题、vue生产环境与开发环境区分填坑
	开发环境与生产环境需要配置不同的服务器地址，
	在配置dev.env.js与prod.env.js时，  配置的全局变量    一定要   在单引号里用双引号包裹，如
		module.exports = merge(prodEnv, {
		  NODE_ENV: '"development"',
		  API_ROOT:'"/api"',
		  SOKET_ROOT:'"http://vue.by-998.com:6001"',
		  IMAGE_ROOT:'"http://image.dd788799.com"',
		})

问题、visibility: 由hidden变为visible之后，其hover伪类效果第一次可能不会触发


问题、覆盖第三方组件库样式如：elementUI 不成功
	  原因：style标签上的scope
	  解决：https://www.cnblogs.com/XHappyness/p/7686267.html
待解决疑问：为什么一定要app.css(全局css)才能有效，在vue文件中新增sytle标签不加scope为什么也不行呢？

问题、css文本处理
	https://blog.csdn.net/hjf_bluesky/article/details/48980177


问题、mouseover  mouseleavle  无效
	原因：在一个div上绑定鼠标事件，然后去界面上验证，
		发现界面不响应鼠标事件。居然是两个相似div(class列表相同)，事件绑错div了。
	解决：事件绑定到该绑定的div上

问题、vue-router路由切换(点击router-link超链接)或者初始化报错，
	Cannot read property '$createElement' of undefined
	解决、https://segmentfault.com/q/1010000011447867/a-1020000011507773
	创建组件时，components 变为 component  不要最后的 s

问题、elementui el-form-item  表单项组件   **************
	没有加上当前scope的属性， 当前的scope内的scss语法对其不生效

	问题原因：
		待探索
	解决：
		当前vue文件中写一个不带scope的style标签
		直接操作 .el-form-item  的样式


问题、    **********
嵌套数组对象列表绑定，改变底层数组属性时，界面不能及时改变！
	解决1：将底层数组绑定的元素，封装为组件，将其引用到父页面中。
	界面的变化就可以通过子组件的逻辑来实现。
	解决2：使用jquery或原生js直接操作dom

问题、跨越的方式
	跨域是ajax的限制
	解决：一、避免ajax
			1 跳转(a标签或location)过去(将数据和回跳链接传过去),再由服务器端处理后再跳转回跳链接回来.
			2 表单提交将数据和回跳链接提交到服务器,再由服务器端处理后再跳转回跳链接回来.
			3 iframe postMessage

问题、跨域    **********
	配置 config --> index.js 的 proxyTable
https://www.cnblogs.com/wangyongcun/p/7665687.html
	正式上线时生成的静态文件，需要服务器跨域方案

问题、图片改名字，css背景图改为相应的名字后，界面无法显示图片，

问题、多行文本溢出省略号
	http://www.css88.com/archives/5206

问题、开发环境覆盖iview样式有效，打包后无效，
	解决、要覆盖iview的样式可加上 !important

问题、通过地址栏变化，设置页面中相应的菜单项选中效果
	解决：监听路由变化
	watch:{
		'$route'(cur,old){
			this.isActive = cur.path;
		}
	}

问题、限制input type=number 的输入长度，注意type=number时，maxlength无效
	解决、<input type="number" oninput="this.value = this.value.slice(0,6)" title />

问题、在使用新特性声明函数时,如
{
	name:'new test',
	something(){
		console.log(this.name);
	}
}
在调试过程中， 断点运行到console.log处时，  this 为undefined， 给调试带来诸多不便;
	解决、方法一：使用console.log将this或this的属性值打印出来;
		  方法二：在函数开头将this存入一个变量，如that。后面用到this的地方，全用that代替。

问题、代码写多了以后，chrome浏览器调试工具不能打断点，或不能打到想要的代码行。
	解决、方法一：在想要调试的代码行前加debugger（不推荐）
		  方法二：在Chrome调试工具的sources左下角有格式化图标{} ，点击可以格式化代码。
	  	  https://blog.csdn.net/wenxuansoft/article/details/42743689
CZaq
问题、webpack
	由于要跨域访问websoket，服务器限定域名，
	所以要把本地localhost:8080配置成指定的域名，
	然后webpack就报 Invalid Host header 错误

	解决、webpack.dev.conf.js中添加配置 disableHostCheck:true, 记得重启项目


问题、Chrome 自动填充用户名密码后输入框背景变黄色
	产生原因：
		Chrome内部有一个硬编码的CSS定义：
		input:-webkit-autofill {
			background-color: #FAFFBD !important;
			background-image:none !important;
		}
		“！important”关键字使得无法更改自动填充背景
		官方解释: https://bugs.chromium.org/p/chromium/issues/detail?id=46543

	解决、
	input:-webkit-autofill,
	textarea:-webkit-autofill,
	select:-webkit-autofill {
	  -webkit-box-shadow: 0 0 0 1000px white inset;
	}
	造成的问题:
		由于写的是input { box-shadow:0 0 0 1000px white inset; } 结果,把其他按钮一起隐藏掉了. 找了半天按钮为什么不显示.
		后来才发现是上面的样式造成的!真是把自己都坑到了!

二十、问题、window.onresize  vue 中无法改变元素样式

十九、问题、钩子函数 updated 中  调用方法造成浏览器界面卡住无反应，

十八、问题、vue watch 监听属性变化时，当属性为复杂对象时，能否监听属性的属性？
	可以监听：
	示例：
	(```)
  data:{
		showChoiceTool:{
          show:false,
          value:'普通'
        }
	}
	mounted() {
      this.$watch('showChoiceTool.value', function (newVal, oldVal) {
        console.log(newVal);
      });
	}
  (```)

十七、问题、js引入图片
	(```)
  let icon = params.menu.pic;
	try{
	  icon = require(`../assets/lottery-details/${params.name}.png`);
	}catch(e){
	  icon = require(`../assets/lottery-details/cqssc.png`);
	}
  (```)

十六、问题、全站都用jsonp，但登录验证失败或者过期，走的是后台系统(并没有返回jsonp结果)，前端无法进入jsonp回调报错不能提示用户重新登录;


十五、问题、华为荣耀8 自带浏览器打不开vue网页，未解决
	浏览器版本太低，加polyfill
	https://cdn.bootcss.com/babel-polyfill/6.23.0/polyfill.min.js

十四、问题、手机浏览器地址栏将内容挤出屏幕   **********************
	解决，加载完成页面后隐藏地址栏
	https://blog.csdn.net/hbcui1984/article/details/8350107  (无效)
	向上滚动地址栏的高度的一半

十三、问题、vue监听元素滚动事件
	better-scroll
	https://github.com/ustbhuangyi/better-scroll


十二、问题、vue-router push  pop go 失效(页面不跳转，内容不切换)
	原因：beforeRouteEnter、beforeRouteUpdate、beforeRouteLeave、明显被定义后，
	一定要在方法内调用next() 函数
	解决：否则就会出现以上问题。

十一、问题、页面显示问题，超出元素内容显示为省略号，但复制时可以复制全部内容;
	解决：

十、问题、父组件样式控制子组件(sass)
	1、使用 /deep/
		例如
		.wrapper{
			& /deep/ .way-row{

			}
		}


九、问题、文本操作 createTextRange(只对body input textarea 有效)

八、问题、文本复制
https://blog.csdn.net/qq1332479771/article/details/78007905


七、问题、git提交代码老是自动丢失。
	原因：团队中有人使用gitbush提交，
	有人使用webstorm的版本控制器提交，
	有人使用git命令行提交造成 警告：
	The file will have its original line endings in your working directory.
		warning: LF will be replaced by CRLF
	解决、git commit之前使用 git add . (. 表示添加当目录所有文件);

六、问题、git commit 报 "Changes not staged for commit:"是怎么回事?
	解决、git commit之前使用 git add . (. 表示添加当目录所有文件);


五、问题、对象数组种的属性更新后，界面为及时更新
	this.wanRowData = Object.assign({}, this.wanRowData);


四、问题、computed(计算属性)只有getter，无setter，所以页面绑定了计算属性后，其实就是相当于单向绑定了。


三、问题、DNS预获取 dns-prefetch 提升页面载入速度
	<meta http-equiv="x-dns-prefetch-control" content="on">
	https://www.cnblogs.com/lhm166/articles/6073787.html

二、问题、meta referrer
	<meta name="referrer" content="always">
	http://www.freebuf.com/news/57497.html

一、问题、html 中ios 的图标问题 apple-touch-icon-precomposed
	https://www.baidu.com/link?url=jeKb5WssoCy6SI_VuwzTYBMojIyx539_qdFEB5NxxqCRgGU-ZGNfsjVtgFpCM9kp&wd=&eqid=e7742faf0000c710000000065b2740b8
