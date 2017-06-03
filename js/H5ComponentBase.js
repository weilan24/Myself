/* 基本图文组件对象 */
var H5ComponentBase=function(name,cfg){
	var cfg=cfg||{};
	var id=('h5_c_'+Math.random()).replace('.','_');
	var cls=' h5_component_'+cfg.type;//组件类型
	var component=$('<div class="h5_component '+cls+' h5_component_name_'+name+'" id="'+id+'">');
	cfg.text && component.text(cfg.text);//把cfg中的text写进去
	cfg.width && component.width(cfg.width/2);
	cfg.height && component.height(cfg.height/2);
	cfg.css && component.css(cfg.css);
	cfg.bg && component.css('backgroundImage','url('+cfg.bg+')')


	if(cfg.center===true){
		component.css({
			marginLeft:(cfg.width/4 * -1) + 'px',
			left:'50%'
		})
	}
	//很多自定义参数
	if(typeof cfg.onclick==='function'){
		component.on('click',cfg.onclick);
	}


	//当前组件对象触发一些动画
    component.on('onLoad',function(){
    	setTimeout(function(){
    	//载入的时候增加h5_component_base_load样式，并且删除h5_component_base_leave事件
    	component.addClass(cls+'_load').removeClass(cls+'_leave');
    	cfg.animateIn && component.animate(cfg.animateIn);
    	},cfg.delay || 0)
        return false;
    })
	component.on('onLeave',function(){
		setTimeout(function(){
		//载入的时候增加h5_component_base_leave样式，并且删除h5_component_base_load事件
		component.addClass(cls+'_leave').removeClass(cls+'_load');
    	cfg.animateOut && component.animate(cfg.animateOut);    
		},cfg.delay || 0)
        //DOM事件循环传播--无限循环
        return false;// 事件结束之后不向上传播
    })



	return component;//component是一个dom元素，直接返回
}
