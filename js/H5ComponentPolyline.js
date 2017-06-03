/* 柱图组件对象 */
var H5ComponentPolyline=function(name,cfg){
	var component=new H5ComponentBase(name,cfg);
	
	//绘制网格线-背景层
	var w=cfg.width;
	var h=cfg.height;
	//加入一个画布（网格线背景）
	var cns=document.createElement('canvas');
	var ctx=cns.getContext('2d');
	cns.width=ctx.width=w;
	cns.height=ctx.height=h;
	component.append(cns);
	//水平网格线100份->10份
	var step=10;
	ctx.beginPath();//开始画画
	ctx.lineWidth=1;// 画笔粗细为1px
	ctx.strokeStyle="#AAA";//画笔颜色
	// component.append(cns);
	window.ctx=ctx;
	//水平网格线
	for(var i=0;i<step+1;i++){
		var y = (h/step) * i;
		ctx.moveTo(0,y);
		ctx.lineTo(w,y);
	}
	//垂直网格线(根据项目的个数去分)
	step=cfg.data.length+1;
	var text_w=(w/step)>>0;//省略小数
	for(var i=0;i<step+1;i++){
		var x=(w/step)*i;
		ctx.moveTo(x,0);
		ctx.lineTo(x,h);
		if(cfg.data[i]){
			var text=$('<div class="text">');
			text.text(cfg.data[i][0]);
			text.css('width',text_w).css('left',x/2);


			component.append(text);
		}

	}
	ctx.stroke();// 收笔

	//绘制折线数据-数据层
	var cns=document.createElement('canvas');
	var ctx=cns.getContext('2d');
	cns.width=ctx.width=w;
	cns.height=ctx.height=h;
	component.append(cns);

	// 绘制折线以及对应的数据和阴影
	// @param {floot} per 0到1之间的数据，会根据这个值绘制最终数据对应的中间状态
	// @return {DOM} component元素

var draw=function(per){
	//清空当前画布
	ctx.clearRect(0,0,w,h);

	ctx.beginPath();
	ctx.lineWidth=3;
	ctx.strokeStyle="#ff8878";

	var x=0;
	var y=0;
	// ctx.moveTo(10,10);
	//第一二个参数为位置，第三个参数为半径，第四第五参数为起始和最终的角度
	// ctx.arc(10,10,5,0,2*Math.PI);

	step=cfg.data.length+1;

	var row_w=(w/(cfg.data.length+1));
	//画点
	for(i in cfg.data){
		var item=cfg.data[i];
		x=row_w*i+row_w;
		y=h*(1-item[1]*per);//画点加入per参数
		ctx.moveTo(x,y);
		ctx.arc(x,y,5,0,2*Math.PI);
	}
	//连线
	//移动画笔到第一个数据的点位置
	ctx.moveTo(row_w,h*(1-cfg.data[0][1]*per));
	for(i in cfg.data){
		var item=cfg.data[i];
		x=row_w*i+row_w;
		y=h*(1-item[1]*per);
		ctx.lineTo(x,y);
	}
	ctx.stroke();
	ctx.lineWidth=1;
	//绘制阴影
	ctx.lineTo(x,h);
	ctx.lineTo(row_w,h);
	ctx.fillStyle='rgba(255,136,118,0.3)';
	ctx.fill();


	//写数据（点上方）
	for(i in cfg.data){
		var item=cfg.data[i];
		x=row_w*i+row_w;
		y=h*(1-item[1]*per);
		if(item[2]){
			ctx.fillStyle=item[2]?item[2]:'#ff8878';
		}
		ctx.font="20px Arial";
		ctx.fillText(((item[1]*100)>>0)+'%',x-10,y-10);
	}
	ctx.stroke();

}
	component.append(cns);
	// draw(1);

	//  折线图伸展动画
	component.on('onLoad',function(){
		var s=0;
		for(i=0;i<100;i++){
			setTimeout(function(){//这是闭包用法
				s+=0.01;
				draw(s);
			},i*10)
		}
	})

		//  折线图伸展动画
	component.on('onLeave',function(){
		var s=1;
		for(i=0;i<100;i++){
			setTimeout(function(){
				s-=0.01;
				draw(s);
			},i*10+1000)
		}
	})


	return component;
}



