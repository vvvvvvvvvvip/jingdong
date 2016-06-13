$(function(){
    var bo=$(".box")[0];//获取所需元素
        var floor=$(".floor");
        var lis=$(".lis");
        var cw=document.documentElement.clientWidth;//获得浏览器窗口的高度和宽度
        var ch=document.documentElement.clientHeight;
        console.log(ch)

        var bh=bo.offsetHeight;//获得bo的实际高度
        console.log(bh)

        var sign=true;
        var shuju=["服饰","美妆","手机","家电","数码","运动","家居","母婴","食品","图书","服务"];
        bo.style.top=(ch-bh)/2+"px";//给固定定位的top赋值
        console.log(bo.style.top)
        for(var i=0;i<lis.length;i++){
            lis[i].index=i;
            lis[i].onclick=function(){//点击楼层时
                var floor=$(".floor");
                sign=false;
                var top=floor[this.index].offsetTop;//获取该楼层到浏览器的高度
                console.log(top)
                animate(document.body,{scrollTop:top},300,function(){
                    sign=true;
                });//将这个高度给滚动条
                animate(document.documentElement,{scrollTop:top},300,function(){
                    sign=true;
                });//将这个高度给滚动条
                for(var i=0;i<lis.length;i++){
                    lis[i].innerHTML=i+1+"F";
                    lis[i].style.color="#666";
                }
                lis[this.index].style.color="#C81623";
                lis[this.index].style.background="#fff";
                lis[this.index].innerHTML=shuju[this.index];

            }
        }
        for(var i=0;i<lis.length;i++){
            lis[i].index=i;
            lis[i].onmouseover=function(){
                lis[this.index].style.background="#C81623";
                lis[this.index].style.color="#fff";
                lis[this.index].innerHTML=shuju[this.index];
            }
            lis[i].onmouseout=function(){
                var floor=$(".floor");
                var top=floor[this.index].offsetTop;
                if(top==document.body.scrollTop||(top-document.body.scrollTop<=320&&top-document.body.scrollTop>=0)){
                    lis[this.index].style.background="#fff";
                    lis[this.index].style.color="#C81623";
                }else if(document.body.scrollTop-top<=350&&document.body.scrollTop-top>=0){
                    lis[this.index].style.background="#fff";
                    lis[this.index].style.color="#C81623";
                }else{
                    lis[this.index].style.background="#fff";
                    lis[this.index].style.color="#666";
                    lis[this.index].innerHTML=this.index+1+"F";
                } 
            }
        }
        var flagr=true;
        var flagr1=true;
        window.onscroll=function(){//滚动事件
            if(!sign){
                return;
            }
            var floor=$(".floor");
            var shuju=["服饰","美妆","手机","家电","数码","运动","家居","母婴","食品","图书","服务"];
            var obj=document.documentElement.scrollTop? document.documentElement:document.body;
            for(var i=0;i<floor.length;i++){
                if(obj.scrollTop>=floor[i].offsetTop-ch+100){//滚动条值大于等于窗口值加楼层到body的值时 该楼层出现
                    for(var j=0;j<lis.length;j++){
                        lis[j].innerHTML=j+1+"F";
                        lis[j].style.color="#666";
                    }
                    lis[i].innerHTML=shuju[i];
                    lis[i].style.color="#C81623";
                    // var imgs=$("img",floor[i]);
                    // for(var j=0;j<imgs.length;j++){
                    //     var aa=imgs[j].getAttribute("aa");
                    //     imgs[j].src=aa;
                    // }
                }
            }
            if(obj.scrollTop>=floor[0].offsetTop-ch+100){//第一楼开始出现
                console.log(floor[0])
                if(flagr){
                    flagr=false;//关掉动画
                    animate(bo,{opacity:1},500,function(){//执行动画 楼层显现
                        flagr1=true;//消失的开关开启
                    });
                }  
            }else{
                if(flagr1){//没有到达一楼时
                    flagr1=false;//消失的动画关闭
                    animate(bo,{opacity:0},500,function(){//执行动画 楼层消失
                        flagr=true;//显现的开关开启
                    });
                }  
            }
        }


//右侧
var r=$(".rt");
var z=$(".zchu");
for(var i=0;i<r.length;i++){
    r[i].index=i;
    r[i].onmouseover=function(){
        if( r[this.index].classList.contains('zchub')){
            animate(z[this.index],{left:-35},500);
            z[this.index].style.display="block";
            r[this.index].style.backgroundColor="#C81623"; 
        }else{
            animate(z[this.index],{left:-60},500);
            z[this.index].style.display="block";
            r[this.index].style.backgroundColor="#C81623";
        }      
    }
    r[i].onmouseout=function(){
        z[this.index].style.display="none";
        r[this.index].style.backgroundColor="#7a6e6e";
        animate(z[this.index],{left:0},500);
    }
}
    // =============================
    var boss=$(".banner-middle")[0];
    var img=$(".b-img")[0];
    var imgs=getChilds(img);
    var circles=$(".circle");
    var left=$(".left")[0];
    var right=$(".right")[0];
    var n=0;
    var flag=true;
    var t=setInterval(move,2000);
    function move(type){
        if(!flag){
            return;
        }
        flag=false;
        if(type=="l"){
            n--;
            if(n<0){
                n=imgs.length-1;
            }
        }else{
            n++;
            if(n>=imgs.length){
                n=0;
            }
        }
        for(var i=0;i<imgs.length;i++){
            animate(imgs[i],{opacity:0},400);
            circles[i].style.background="#3E3E3E";
        }
        circles[n].style.background="#B61B1F";
        animate(imgs[n],{opacity:1},400,function(){
            flag=true;
        });
    }
    for(var i=0;i<imgs.length;i++){
        circles[i].index=i;
        circles[i].onmouseover=function(){
            if(this.index>n){
                    for(var i=0;i<circles.length;i++){
                        animate(imgs[i],{opacity:0},400);
                        circles[i].style.background="#3E3E3E";
                }
                circles[this.index].style.background="#B61B1F";
                animate(imgs[this.index],{opacity:1},400);
                n=this.index;
                }else if(this.index<n){
                    for(var i=0;i<circles.length;i++){
                        animate(imgs[i],{opacity:0},400);
                        circles[i].style.background="#3E3E3E";
                }
                circles[this.index].style.background="#B61B1F";
                animate(imgs[this.index],{opacity:1},400);
                n=this.index;
                }
        }
    }
    boss.onmouseover=function(){
        clearInterval(t);
        left.style.display="block";
        right.style.display="block";
    }
    boss.onmouseout=function(){
        t=setInterval(move,2000);
        left.style.display="none";
        right.style.display="none";
    }
    left.onclick=function(){
        move("l");
    }
    right.onclick=function(){
        move();
    }

// 二次轮播
var box=$(".trb-box")[0]
var pics=$(".img-tu")
var left1=$(".left1")[0]
var right1=$(".right1")[0]
var n1=0
var flag=true
function move1(){
    if(!flag){
    	return
    }		
    flag=false
    n1++
    if(n1>=(pics.length/4)){
      n1=0 
  } 
  animate(box,{left:-n1*1000},300,function(){
     flag=true;
 })

}
function move2(){
   if(!flag){
       return
   }		
   flag=false
   n1--
   if(n1<0){
       n1=(pics.length/4)-1
   }
   animate(box,{left:-n1*1000},300,function(){
    flag=true
}) 
}

left1.onclick=function(){
   move1()
}
right1.onclick=function(){
   move2()
}
// ===============================
var xxkc=$(".xxkchange");
    for(var i=0;i<xxkc.length;i++){
        xxk(xxkc[i]);
    }
    function xxk(obj){
        var xa=$(".change",obj);
        var a=$(".ca",obj);
        var xx=$(".xxk",obj);
        console.log(xx.length)
        var d=$(".d",obj);
        for(var i=0;i<xa.length;i++){
            xa[i].index=i;
            xa[i].onmouseover=function(){
                for(var i=0;i<xa.length;i++){
                    xx[i].style.display="none";
                    d[i].style.display="none";
                    a[i].style.color="#333";
                }
                xx[this.index].style.display="block";
                d[this.index].style.display="block";
                a[this.index].style.color="#C81623";
            }
        }
    }
// =======================================

    //一楼轮播
    var oftu=$(".oftu");
    var ocircles=$(".one-fcircle");
    var left2=$(".left2")[0]
    var right2=$(".right2")[0]
    var n2=0;
    var box2=$(".one-turn")[0]
    var t1=setInterval(move3,1000);//定义时间函数
    function move3(type){
        if(type=="l"){
            n2--
            if(n2<0){
                n2=oftu.length-1
            }
        }else{
            n2++
            if(n2>=oftu.length){
                n2=0
            }
        }    
        //图片轮播
        for(var i=0;i<oftu.length;i++){
            oftu[i].style.display="none";//每个图片消失
            ocircles[i].style.background="#3e3e3e";//每个图片对应圈圈出现底色
        }
            oftu[n2].style.display="block";//当前图片显现
            ocircles[n2].style.background="#B61B1F";//图片对应圈圈出现上层色
        }
        box2.onmouseover=function(){
            clearInterval(t1)
        }
        box2.onmouseout=function(){
            t1=setInterval(move3,1000)
        }
       //圈圈选项卡
       for(var i=0;i<ocircles.length;i++){
        ocircles[i].index=i;
        ocircles[i].onclick=function(){
            for(var i=0;i<oftu.length;i++){
            oftu[i].style.display="none";//每个图片消失
            ocircles[i].style.background="#3e3e3e";//每个图片对应圈圈出现底色
        }
            oftu[this.index].style.display="block";//当前图片显现
            ocircles[this.index].style.background="#B61B1F"//图片对应圈圈出现上层色
            n2=this.index;
        }
    }
    //左右拐
    right2.onclick=function(){
        move3("r")
    }
    left2.onclick=function(){
        move3("l")
    }



//二楼轮播
var twimgs=$(".s1-middle");
var twcircles=$(".two-fcircle");
var left3=$(".left3")[0]
var right3=$(".right3")[0]
var n4=0;
var boss1=$(".sid")[0]
    var t4=setInterval(move7,1000);//定义时间函数
    function move7(type){
        if(type=="l"){
            n4--
            if(n4<0){
                n4=twimgs.length-1
            }
        }else{
            n4++
            if(n4>=twimgs.length){
                n4=0
            }
        }    
        //图片轮播
        for(var i=0;i<twimgs.length;i++){
            twimgs[i].style.display="none";//每个图片消失
            twcircles[i].style.background="#3e3e3e";//每个图片对应圈圈出现底色
        }
            twimgs[n4].style.display="block";//当前图片显现
            twcircles[n4].style.background="#B61B1F";//图片对应圈圈出现上层色
        }
        boss1.onmouseover=function(){
            clearInterval(t4)
        }
        boss1.onmouseout=function(){
            t4=setInterval(move7,1000)
        }
       //圈圈选项卡
       for(var i=0;i<twcircles.length;i++){
        twcircles[i].index=i;
        twcircles[i].onclick=function(){
            for(var i=0;i<twimgs.length;i++){
            twimgs[i].style.display="none";//每个图片消失
            twcircles[i].style.background="#3e3e3e";//每个图片对应圈圈出现底色
        }
            twimgs[this.index].style.display="block";//当前图片显现
            twcircles[this.index].style.background="#B61B1F"//图片对应圈圈出现上层色
            n4=this.index;
        }
    }
    //左右拐
    right3.onclick=function(){
        move7("r")
    }
    left3.onclick=function(){
        move7("l")
    }



    //三 四 五楼轮播
    var obj=$('.three-turn')
    for(var i=0;i<obj.length;i++){
        lunbo(obj[i])
    }
    function lunbo(obj){
        var thimgs=$(".hftu",obj);
        var thcircles=$(".three-fcircle",obj);
        var left4=$(".left4",obj)[0]
        var right4=$(".right4",obj)[0]
        var n5=0;
        var boss2=$(".three-turn-box",obj)[0]
        var t5=setInterval(move8,1000);
        function move8(type){
            if(type=="l"){
                n5--
                if(n5<0){
                    n5=thimgs.length-1
                }
            }else{
                n5++
                if(n5>=thimgs.length){
                    n5=0
                }
            }    
        //图片轮播
        for(var i=0;i<thimgs.length;i++){
            thimgs[i].style.display="none";
            thcircles[i].style.background="#3e3e3e";
        }
        thimgs[n5].style.display="block";
        thcircles[n5].style.background="#B61B1F";
    }
    boss2.onmouseover=function(){
        clearInterval(t5)
    }
    boss2.onmouseout=function(){
        t5=setInterval(move8,1000)
    }
       //圈圈选项卡
       for(var i=0;i<thcircles.length;i++){
        thcircles[i].index=i;
        thcircles[i].onclick=function(){
            for(var i=0;i<thimgs.length;i++){
                thimgs[i].style.display="none";
                thcircles[i].style.background="#3e3e3e";
            }
            thimgs[this.index].style.display="block";
            thcircles[this.index].style.background="#B61B1F"
            n5=this.index;
        }
    }
    //左右拐
    right4.onclick=function(){
        move8("r")
    }
    left4.onclick=function(){
        move8("l")
    }
}

//六,七,八,九楼轮播
var obj1=$('.sid6')
for(var i=0;i<obj1.length;i++){
    lunbo1(obj1[i])
}
function lunbo1(obj){
    var swimgs=$(".s6-middle",obj);
    var swcircles=$(".two-fcircle5",obj);
    var left5=$(".left5",obj)[0]
    var right5=$(".right5",obj)[0]
    var n6=0;
    var boss3=$(".si-box6",obj)[0]
    var t6=setInterval(move9,1000);//定义时间函数
    function move9(type){
        if(type=="l"){
            n6--
            if(n6<0){
                n6=swimgs.length-1
            }
        }else{
            n6++
            if(n6>=swimgs.length){
                n6=0
            }
        }    
        //图片轮播
        for(var i=0;i<swimgs.length;i++){
            swimgs[i].style.display="none";//每个图片消失
            swcircles[i].style.background="#3e3e3e";//每个图片对应圈圈出现底色
        }
            swimgs[n6].style.display="block";//当前图片显现
            swcircles[n6].style.background="#B61B1F";//图片对应圈圈出现上层色
        }
        boss3.onmouseover=function(){
            clearInterval(t6)
        }
        boss3.onmouseout=function(){
            t6=setInterval(move9,1000)
        }
       //圈圈选项卡
       for(var i=0;i<swcircles.length;i++){
        swcircles[i].index=i;
        swcircles[i].onclick=function(){
            for(var i=0;i<swimgs.length;i++){
            swimgs[i].style.display="none";//每个图片消失
            swcircles[i].style.background="#3e3e3e";//每个图片对应圈圈出现底色
        }
            swimgs[this.index].style.display="block";//当前图片显现
            swcircles[this.index].style.background="#B61B1F"//图片对应圈圈出现上层色
            n6=this.index;
        }
    }
    //左右拐
    right5.onclick=function(){
        move9("r")
    }
    left5.onclick=function(){
        move9("l")
    }
    
}



// 十楼轮播
var thimgs1=$(".nftu");
var thcircles1=$(".ten-fcircle");
var left7=$(".left7")[0]
var right7=$(".right7")[0]
var n7=0;
var boss4=$(".ten-turn-box")[0]
var t7=setInterval(dong2,1000);
function dong2(type){
    if(type=="l"){
        n7--
        if(n7<0){
            n7=thimgs1.length-1
        }
    }else{
        n7++
        if(n7>=thimgs1.length){
            n7=0
        }
    }    
        //图片轮播
        for(var i=0;i<thimgs1.length;i++){
            thimgs1[i].style.display="none";
            thcircles1[i].style.background="#3e3e3e";
        }
        thimgs1[n7].style.display="block";
        thcircles1[n7].style.background="#B61B1F";
    }
    boss4.onmouseover=function(){
        clearInterval(t7)
    }
    boss4.onmouseout=function(){
        t7=setInterval(dong2,1000)
    }
       //圈圈选项卡
       for(var i=0;i<thcircles1.length;i++){
        thcircles1[i].index=i;
        thcircles1[i].onclick=function(){
            for(var i=0;i<thimgs1.length;i++){
                thimgs1[i].style.display="none";
                thcircles1[i].style.background="#3e3e3e";
            }
            thimgs1[this.index].style.display="block";
            thcircles1[this.index].style.background="#B61B1F"
            n7=this.index;
        }
    }
    //左右拐
    right7.onclick=function(){
        dong2("r")
    }
    left7.onclick=function(){
        dong2("l")
    }




// 十一楼轮播

var obj2=$('.eleven-turn')
for(var i=0;i<obj2.length;i++){
    lunbo2(obj2[i])
}
function lunbo2(obj){
    var thimgs2=$(".lftu",obj);
    var thcircles2=$(".eleven-fcircle",obj);
    var left8=$(".left8",obj)[0]
    var right8=$(".right8",obj)[0]
    var n8=0;
    var boss5=$(".eleven-turn-box",obj)[0]
    var t8=setInterval(dong3,1000);
    function dong3(type){
        if(type=="l"){
            n8--
            if(n8<0){
                n8=thimgs2.length-1
            }
        }else{
            n8++
            if(n8>=thimgs2.length){
                n8=0
            }
        }    
        //图片轮播
        for(var i=0;i<thimgs2.length;i++){
            thimgs2[i].style.display="none";
            thcircles2[i].style.background="#3e3e3e";
        }
        thimgs2[n8].style.display="block";
        thcircles2[n8].style.background="#B61B1F";
    }
    boss5.onmouseover=function(){
        clearInterval(t8)
    }
    boss5.onmouseout=function(){
        t8=setInterval(dong3,1000)
    }
       //圈圈选项卡
       for(var i=0;i<thcircles2.length;i++){
        thcircles2[i].index=i;
        thcircles2[i].onclick=function(){
            for(var i=0;i<thimgs2.length;i++){
                thimgs2[i].style.display="none";
                thcircles2[i].style.background="#3e3e3e";
            }
            thimgs2[this.index].style.display="block";
            thcircles2[this.index].style.background="#B61B1F"
            n7=this.index;
        }
    }
    //左右拐
    right8.onclick=function(){
        dong3("r")
    }
    left8.onclick=function(){
        dong3("l")
    }

}



// 送至北京处
var hidden=$(".item")[0]
var on=$(".top-left")[0]
var kong=$(".kong")[0]
on.onmouseover=function(){
    hidden.style.display="block"
    kong.style.display="block"
}
on.onmouseout=function(){
    hidden.style.display="none"
    kong.style.display="none"
}


//手机京东
var hidden1=$(".tr-t")[0]
var on1=$(".hover")[0]
var kong1=$(".kong1")[0]
var s1 = $('.s1')[0]
on1.onmouseover=function(){
    hidden1.style.display="block"
    kong1.style.display="block"
    s1.style.top='2px'
}
on1.onmouseout=function(){
    hidden1.style.display="none"
    kong1.style.display="none"
    s1.style.top='-7px'
}


//我的京东
var hide=$(".dd-jd")[0]
var over2=$(".hover3")[0]
var kong4=$(".kong4")[0]
var s = $('.s')[0]
over2.onmouseover=function(){
    hide.style.display="block"
    kong4.style.display="block"
    s.style.top='2px'
}
over2.onmouseout=function(){
    hide.style.display="none"
    kong4.style.display="none"
    s.style.top='-7px'
}


//关注京东
var hidden2=$(".tr-g")[0]
var on2=$(".hover2")[0]
var kong2=$(".kong2")[0]
var s2 = $('.s2')[0]
on2.onmouseover=function(){
    hidden2.style.display="block"
    kong2.style.display="block"
    s2.style.top='2px'
}
on2.onmouseout=function(){
    hidden2.style.display="none"
    kong2.style.display="none"
    s2.style.top='-7px'
}


//网站导航
var hidden3=$(".wadh")[0]
var on3=$(".hover1")[0]
var kong3=$(".kong3")[0]
var s4 = $('.s4')[0]
on3.onmouseover=function(){
    hidden3.style.display="block"
    kong3.style.display="block"
    s4.style.top='2px'
}
on3.onmouseout=function(){
    hidden3.style.display="none"
    kong3.style.display="none"
    s4.style.top='-7px'
}

//客户服务
var hide2=$(".tr-w")[0]
var over1=$(".hover4")[0]
var kong5=$(".kong5")[0]
var s3 = $('.s3')[0]
over1.onmouseover=function(){
    hide2.style.display="block"
    kong5.style.display="block"
    s3.style.top='2px'
}
over1.onmouseout=function(){
    hide2.style.display="none"
    kong5.style.display="none"
    s3.style.top='-7px'
}


// 我的购物车
var hide3=$(".hover-buy")[0]
var over2=$(".settle")[0]
var kong6=$(".kong0")[0]
over2.onmouseover=function(){
    hide3.style.display="block"
    kong6.style.display="block"
}
over2.onmouseout=function(){
    hide3.style.display="none"
    kong6.style.display="none"
}




//banner-left
var hidden4=$(".dropdown-layer")[0]
var hidden5=$(".dropdown-layer1")[0]
var hidden6=$(".dropdown-layer3")[0]
var hidden7=$(".dropdown-layer4")[0]
var hidden8=$(".dropdown-layer5")[0]
var hidden9=$(".dropdown-layer6")[0]
var hidden10=$(".dropdown-layer7")[0]
var hidden11=$(".dropdown-layer8")[0]
var hidden12=$(".dropdown-layer9")[0]
var hidden13=$(".dropdown-layer10")[0]
var hidden14=$(".dropdown-layer11")[0]
var hidden15=$(".dropdown-layer12")[0]
var hidden16=$(".dropdown-layer13")[0]
var hidden17=$(".dropdown-layer14")[0]
var hidden18=$(".dropdown-layer15")[0]
var on4=$(".bl-fore1")[0]
var on5=$(".bl-fore2")[0]
var on6=$(".bl-fore3")[0]
var on7=$(".bl-fore4")[0]
var on8=$(".bl-fore5")[0]
var on9=$(".bl-fore6")[0]
var on10=$(".bl-fore7")[0]
var on11=$(".bl-fore8")[0]
var on12=$(".bl-fore9")[0]
var on13=$(".bl-fore10")[0]
var on14=$(".bl-fore11")[0]
var on15=$(".bl-fore12")[0]
var on16=$(".bl-fore13")[0]
var on17=$(".bl-fore14")[0]
var on18=$(".bl-fore15")[0]
on4.onmouseover=function(){
    hidden4.style.display="block"
}
on4.onmouseout=function(){
 hidden4.style.display="none"
}
on5.onmouseover=function(){
    hidden5.style.display="block"
}
on5.onmouseout=function(){
 hidden5.style.display="none"
}
on6.onmouseover=function(){
    hidden6.style.display="block"
}
on6.onmouseout=function(){
 hidden6.style.display="none"
}
on7.onmouseover=function(){
    hidden7.style.display="block"
}
on7.onmouseout=function(){
 hidden7.style.display="none"
}
on8.onmouseover=function(){
    hidden8.style.display="block"
}
on8.onmouseout=function(){
 hidden8.style.display="none"
}
on9.onmouseover=function(){
    hidden9.style.display="block"
}
on9.onmouseout=function(){
 hidden9.style.display="none"
}
on10.onmouseover=function(){
    hidden10.style.display="block"
}
on10.onmouseout=function(){
 hidden10.style.display="none"
}
on11.onmouseover=function(){
    hidden11.style.display="block"
}
on11.onmouseout=function(){
 hidden11.style.display="none"
}
on12.onmouseover=function(){
    hidden12.style.display="block"
}
on12.onmouseout=function(){
 hidden12.style.display="none"
}
on13.onmouseover=function(){
    hidden13.style.display="block"
}
on13.onmouseout=function(){
 hidden13.style.display="none"
}
on14.onmouseover=function(){
    hidden14.style.display="block"
}
on14.onmouseout=function(){
 hidden14.style.display="none"
}
on15.onmouseover=function(){
    hidden15.style.display="block"
}
on15.onmouseout=function(){
 hidden15.style.display="none"
}
on16.onmouseover=function(){
    hidden16.style.display="block"
}
on16.onmouseout=function(){
 hidden16.style.display="none"
}
on17.onmouseover=function(){
    hidden17.style.display="block"
}
on17.onmouseout=function(){
 hidden17.style.display="none"
}
on18.onmouseover=function(){
    hidden18.style.display="block"
}
on18.onmouseout=function(){
 hidden18.style.display="none"
}




var sbox=$(".a-box")
var bbox=$(".selecte-item")
var text=$(".cloth-text")
for(var i=0;i<bbox.length;i++){
    bbox[i].index=i
    bbox[i].onmouseover=function(e){
        for(var i=0;i<bbox.length;i++){
            sbox[i].style.display="none"
        }
        if(e.target!==this.index){
            for(var i=0;i<bbox.length;i++){
                text[i].style.color="#666"
                text[i].style.borderColor="#fff"
                text[i].style.background="none"
            }     
        }
        sbox[this.index].style.display="block"
        text[this.index].style.color="#C81623"
        text[this.index].style.borderColor="#C81623"
        text[this.index].style.background="#fff"
    }
}

//天天特价轮播
    var ddr=$(".day-r")[0];
    var sd=$(".day-right1");
    var sdt=setInterval(moves,2000);
    var j=0;
    function moves(){
        j++;
        if(j>=sd.length-1){
            j=0;
        }
        animate(ddr,{top:-j*120},500);
    }



})


