$(function(){
	//阻止切屏中的滚屏动作
	$(document).on('touchmove',function(ev){
		ev.preventDefault();
	});
	
	var $main = $('.main');
	var $ali = $('#list').children('li');
	
	var desW = 1000;
	var desH = 1136;	
	
	//计算可视区的高度
	
	var viewH = $(window).height();
	var viewW = $(window).width();
	$main.css('height',viewH);
	$ali.css('height',viewH);	
	
	//计算等比例放大之后的宽度
	
	var nowWidth = desW / desH * viewH;
	
	//移动背景图片居中
	$ali.css('background-position',(viewW-nowWidth)/2+'px 0px');

	//loading();
	//划屏效果
	slideList();
	//背景音乐
	showMusic();	
	
	//划屏效果实现
	/*
	 1.初始化全局变量 记录y值  记录当前和下一页的下标
	 2.触碰开始事件：赋值初始y值    记录当前下标
	 3.移动中：通过获取touch.pageY来与初始y比较，判断移动的方向是上翻还是下翻，赋值下一页下标，平移下一屏
	 	当前屏平移，改变下一屏的层级
	 4.触碰结束：让下一屏成为当前显示的屏，设置到初始位置
	 5.效果重置：z-index变为5
	 * 
	 * */
	
	function slideList(){
		//初始化
		var downY = 0;//记录开始触碰时的y值
		var nowIndex = 0;//当前显示的屏下标
		var nextIndex = 0;//下一次将要显示的屏下标
		
		//触碰开始
		$ali.on('touchstart',function(ev){
			
			var touch = ev.originalEvent.changedTouches[0];
			//记录y值
			downY = touch.pageY;
			//记录当前下标
			nowIndex =$(this).index();//0
			
			//隐藏其他的元素
					//$(this).siblings().hide();
			
			$ali.on('touchmove',function(ev){
				
				var touch = ev.originalEvent.changedTouches[0];
				//判断移动的方向是上翻还是下翻
				if(touch.pageY<downY){//上翻
					//赋值下一屏显示内容下标
					nextIndex = (nowIndex==$ali.length-1)?0:nowIndex+1;	
					//下一张动作
					$ali.eq(nextIndex).css('transform','translate(0,'+(viewH+touch.pageY-downY)+'px)');
					
				}else if(touch.pageY>downY){//下翻
					//赋值下一屏显示内容下标
					nextIndex = (nowIndex==0)?$ali.length-1:nowIndex-1;	
					//下一张动作
					$ali.eq(nextIndex).css('transform','translate(0,'+(-viewH+touch.pageY-downY)+'px)');
				}
				
				//当前的屏移动
				$(this).css('transform','translate(0,'+(touch.pageY-downY)*0.25+'px) scale(0.9)');
				//下一屏设置层级高于其他li，设置显示状态
				$ali.eq(nextIndex).show().css('z-index',6);
			});
			
			//触碰结束
				$ali.on('touchend',function(ev){
					$ali.eq(nextIndex).css('transition','0.2s');
					$(this).css('transition','0.2s');
					//出现transition过渡叠加的问题
							//$ali.eq(nextIndex).css('z-index',5);
					$ali.eq(nextIndex).css('transform','translate(0,0)');		
				});	
		})
		
		//效果重置----transition过渡完成事件
		$ali.on('webkitTransitionEnd transitionend',function(){
			$ali.css('transition','0');
			$ali.eq(nextIndex).css('z-index',5).siblings().hide();
			
			//当前屏执行出场动画
			// if(animations[nowIndex]){	
			// 	animations[nowIndex].outAnimate();
			// }
			
			// // //下一屏执行入场动画
			// if(animations[nextIndex]){
				
			// 	animations[nextIndex].inAnimate();
			// }
			
		})	
	}
	

	//控制音乐的起停
	function showMusic(){
		var oMusic = $('.music');
		var oA = $('audio');
		var oMImg = $('.music > img')
		
		var obtn = false;
		
		oMusic.on('click',function(){
			
			if(!obtn){
				//播放
				oA.get(0).play();
				oMImg.addClass('active');//旋转动画
			}else{
				oA.get(0).pause();
				oMImg.removeClass('active');//旋转动画
			}	
			obtn = !obtn;
		})
		//主动触发
		oMusic.trigger('click');	
	}

	//场景动画
	
	var animations = [];
	// var animations = [
	// 	{
	// 		//入场动画
	// 		inAnimate:function(){
	// 			var alis = $ali.eq(0).children();
	// 			// alis.addClass('wow');
	// 			alis.attr('data-wow-duration','2s')
	// 			alis.attr('data-wow-delay','1s')
	// 		},
	// 		//出场动画
	// 		outAnimate:function(){
	// 			// var alis = $ali.eq(0).children();
	// 			// alis.eq(0).removeClass();
	// 			// alis.filter(':odd').addClass('slideInLeft');
	// 			// alis.filter(':even').addClass('slideInRight');

	// 		}
			
	// 	},
	// 	{
	// 		//入场动画
	// 		inAnimate:function(){
				
	// 			var alis = $ali.eq(1).find('li');
	// 			alis.css('transition','2s');
	// 			alis.attr('class','');
	// 			alis.css('transform','rotate(720deg)');
	// 		},
	// 		//出场动画
	// 		outAnimate:function(){
	// 			var alis = $ali.eq(1).find('li');
	// 			alis.css('transition','');
	// 			alis.attr('class','origi');
	// 			alis.css('transform','rotate(0)');
				
	// 		}	
	// 	},
	// 	// {
	// 	// 	// //入场动画
	// 	// 	// inAnimate:function(){
				
	// 	// 	// 	var alis = $ali.eq(2).find('.li3Child');
	// 	// 	// 	alis.css('transition','3s');
				
	// 	// 	// 	alis.css('transform','rotateY(0deg)');
	// 	// 	// },
	// 	// 	// //出场动画
	// 	// 	// outAnimate:function(){
	// 	// 	// 	var alis = $ali.eq(2).find('.li3Child');
	// 	// 	// 	alis.css('transition','');
				
	// 	// 	// 	alis.css('transform','rotateY(720deg)');
				
	// 	// 	// }
			
	// 	// },
	// 	// {
	// 	// 	// //入场动画
	// 	// 	// inAnimate:function(){
				
	// 	// 	// 	var alis = $ali.eq(3).find('li');
	// 	// 	// 	alis.css('transition','4s');
				
	// 	// 	// 	alis.attr('class','');
	// 	// 	// },
	// 	// 	// //出场动画
	// 	// 	// outAnimate:function(){
	// 	// 	// 	var alis = $ali.eq(3).find('li');
	// 	// 	// 	alis.css('transition','');
	// 	// 	// 	alis.attr('class','active');
				
				
	// 	// 	// }
			
	// 	// }					
	// ];
	
	//入场动画时间
	function animationShow(){
		var alis = $ali.children();
		alis.attr('data-wow-duration','2s');
		//第一屏的git图延时显示
		var oFiveGit = $ali.eq(0).children().eq(4);
		setTimeout(function(){oFiveGit.show()},2000) 
	}

	animationShow();

	//首页加载
	function loading(){
				var oLoading = $('.loading');
				var imgArr = ['d58c73e63a9cadce237925de3d650c8d.jpg',
					'b2aae62da16991b5924d82b50ca3ab9c.png',
					'a0820c834c07a68b94ab1356d3593f41.jpg',
					'0795c72dd691c63d63dce25f2170f4cd.gif',
					'70f0c683cdede7d810e29bd7cf756b19.png',
					'4ac3479cf06d85a1bda2ff87a6ec080a.png',
					'sellotape.png',
					'clamp.png'];
				var iNum =0;
				//图片加载
				for(var i = 0;i<imgArr.length;i++){
					
					var oimg = new Image();
					oimg.src = '../img/'+imgArr[i];
					
					oimg.onload = function(){
						iNum++;
						if(iNum==imgArr.length){
							oLoading.animate({opacity:0},2000,function(){
								oLoading.remove();
							})
						}
						
					};
					
						oimg.onerror = function(){
							oLoading.animate({opacity:0},2000,function(){
									oLoading.remove();
								})
						}
					
					}
					
				}

	//遍历数组，让所有屏调用出场动画
	
	// for(var i = 0;i<animations.length;i++){
	// 	console.log(i);
	// 	animations[i].outAnimate();
	// }
	// animations[0].inAnimate();
		
})