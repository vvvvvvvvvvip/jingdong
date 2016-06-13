function getInner(obj,value){//创建获取对象文本内容和函数
		if(obj.textContent){//存在文本内容
			if(value==undefined){//没有传入的文本值
				return obj.textContent//返回文本内容
			}else{
				return obj.textContent=value//否则赋值给文本内容
			}
		}else{//不存在文本内容
			if(value==undefined){
				return obj.innerText//返回文字内容
			}else{
				return obj.innerText=value//赋值给文字内容
			}
		}
	}

function getStyle(obj,style){
	if(obj.currentStyle){
		return obj.currentStyle[style]
	}else{
		return  getComputedStyle(obj,null)[style]
	}
}	


function addEvent(obj,Eventtype,handle){
	if(obj.addEventListener){
       return obj.addEventListener(Eventtype,handle,false)
	}else if(obj.attachEvent){
	   return obj.attachEvent("on"+event,handle)
	}
}
function deleteEvent(obj,Eventtype,handle){
	if(obj.removeEventListener){
       return obj.removeEventListener(Eventtype,handle,false)
	}else if(obj.detachEvent){
	   return obj.detachEvent("on"+event,handle)
	}
}



function mouseWheel(obj,funUp,funDown){
      if(obj.attachEvent){
      	obj.attachEvent("onmousewheel",scroll)
      }else{
      	obj.addEventListener("DOMMouseScroll",scroll,false)
      	obj.addEventListener("mousewheel",scroll,false)
      }
      function scroll(e){
      	var ev=e||window.event
      	var d=ev.wheelDeta||ev.detail;
      	// if(obj.attachEvent){
      	// 	ev.returnValue=false
      	// }else{
      	// 	// preventDefault()
      	// }
      	if(d==-120||d==3){
      		if(funDown){
      			funDown();
      		}
      	}else if(d==120||d==-3){
      		if(funUp){
      			funUp();
      		}
      	}
      }
}


function getClass(classname,obj){
	var obj=obj||document
	if(obj.getElementsByClassName){
		return obj.getElementsByClassName(classname)
	}else{
		var arr=[]
		var alls=obj.getElementsByClassName('*')
		for(var i=0;i<alls.length;i++){
			if(checclass(all[i].className,classname)){
				arr.push(alls[i])
			}
		}
		return arr
	}
}



//#one  .one   div
//分析 $("") $("") $("div")
//在某个范围内取到所需元素 某个div某个对象的子元素
function $(search,obj){//创建$函数查找类名，id名，div
      var obj=obj||document;
      if(typeof(search)=="string"){
      if(search.charAt(0)=="#"){//如果search指定字符第一位是"#"
        return document.getElementById(search.substr(1))
      }//返回获取相应的id名
      if(search.charAt(0)=="."){//如果search指定字符第一位是"."
      	return getClass(search.substr(1),obj)
      //返回获取相应的类名
      }else{
      	return obj.getElementsByTagName(search)
      }//否则直接返回search标签名
     }else if(typeof(search)=="function"){
     	window.onload=function(){
     		search()
     	}
     }    
}


//获取子节点
//单纯获取元素节点
//获取元素节点加文本节点
function getChilds(obj,type) {
	var type=type||"a";
	var all=obj.childNodes; //获取对象的所有子节点
	var arr=[]; //定义一个空数组
	for(var i=0;i<all.length;i++){
		if(type=="a"){
			if (all[i].nodeType==1){
				arr.push(all[i]); //将all[i]放在arr数组里
			}
		}else if(type=="b"){//replace(新节点，被修改的节点)
			if (all[i].nodeType==1||(all[i].nodeType == 3 && all[i].nodeValue.replace(/^\s*|\s*$/g, ""))) {
				// if (all[i].nodeType==3) {
				// 	all[i].nodeValue=all[i].nodeValue.replace(/^\s*|\s*$/g, "")
				// };
				arr.push(all[i]);
			}
		}
	}
	return arr;
}

function getFirst(obj) {
	return getChilds(obj)[0];
}

function getLast(obj) {
	var nub = getChilds(obj);
	return nub[nub.length - 1];
}

function getNext(obj, type) {
	var next = obj.nextSibling;
	var type = type || "a";
	if (next == null) {
		return false;
	}//传a找元素节点   
	if (type == "a") {
		while (next.nodeType == 3 || next.nodeType == 8) {
			next = next.nextSibling;
			if (next == null) {
				return false;
			}
		}
	} else if (type == "b") {//有文本

		while ((next.nodeType == 3 && !next.nodeValue.replace(/^\s*|\s*$/g, "")) || next.nodeType == 8) {
			next = next.nextSibling;
			if (next == null) {
				return false;
			}
		}
	}
	return next;
}

function getPrevious(obj) {
	var next = obj.previous;
	var type = type || "a";
	if (next == null) {
		return false;
	}
	if (type == "a") {
		while (next.nodeType == 3 || next.nodeType == 8) {
			next = next.previous;
			if (next == null) {
				return false;
			}
		}
	} else if (type == "b") {

		while ((next.nodeType == 3 && !next.nodeValue.replace(/^\s*|\s*$/g, "")) || next.nodeType == 8) {
			next = next.previous;
			if (next == null) {
				return false;
			}
		}
	}
	return next;
}

function insertBefore(obj, before) {
	var parent = before.parentNode;
	parent.insertBefore(obj, before)
}

function insertAfter(obj, after) {
	var next = getNext(after);
	var parent = after.parentNode;
	if (next) {//有下一个节点  插
		insertBefore(obj, next)
	} else {//没有兄弟节点插到父元素里
		parent.appendChild(obj)
	}
}