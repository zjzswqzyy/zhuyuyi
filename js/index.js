/**
 * Created by Admin on 2018/7/31.   感觉代码冗余，后续再慢慢修改
 */
$(function () {
    var j = 0;  // 控制异步加载的全局属性
    var k = 0;  // 控制媒体播放的全局属性
    // 导航条ul li事件 // music piano
    $('.head > li').on('click', function () {
        $(this).addClass('active').siblings().removeClass('active');
    }).on('mouseenter', function () {
        k++;
        //that = $(this)
        if(k <= 1) {
            $(".navbar-collapse").append('<audio src="video/1.mp3"></audio>')
                .append('<audio src="video/2.mp3"></audio>')
                .append('<audio src="video/3.mp3"></audio>')
                .append('<audio src="video/4.mp3"></audio>')
                .append('<audio src="video/5.mp3"></audio>')
                .append('<audio src="video/6.mp3"></audio>')
                .append('<audio src="video/7.mp3"></audio>');
            k++;
        }
        if(k > 1){
            $("audio").get($(this).index()).load();
            $("audio").get($(this).index()).play();
        }
    });
    // 判断屏幕时大还是小
    var isBigScreen = $(window).width() > 1030;
    var isMiddleScreen = $(window).width() < 1030 && $(window).width() > 768;
    var isSmallScreen = $(window).width() < 768;
    if(isBigScreen){
        Scroll(1,250,480);
        // PC端 右侧nav
        var timer = null;
        $(".blank-box").on('mouseenter',function(){
            clearTimeout(timer);
            var that = $(this);
            timer = setTimeout(function () {
                that.find("a").each(function (index,ele) {
                    setTimeout(function () {
                        $(ele).stop().animate({right:0},200)
                    },50*index);
                })
            },20)
        }).on('mouseleave', function () {
            if(timer){
                clearTimeout(timer);
            }
            $(this).find("a").each(function (index,ele) {
                setTimeout(function () {
                    $(ele).stop().animate({right:-110},200)
                },50*index);
            })
        });
    }else if(isMiddleScreen){
        Scroll(1,150,-600);
    }else if(isSmallScreen){
        Scroll(1.3,260,590);
    }

    // 微信二维码动画
    $(".mobile-link").on('mouseenter', function () {
        $('.mobile-link > img').stop().slideDown('slow');
    }).on('mouseleave', function () {
        $('.mobile-link > img').stop().slideUp('fast');
    });
    //为返回顶部元素添加点击触摸事件
    $('.toTop').click(function(){
        //将当前窗口的内容区滚动高度改为0，即顶部
        $("html,body").animate({scrollTop:0},"fast");
    });
    // 天体运动。。。代码冗余，暂时没想到好的解决办法。。。
    var angle =[];
    for(var i = 1; i <= 11; i++){
         angle[i] = 0;
    }
    var t = null;
    if(isBigScreen){
        t = setInterval(function () {
            angle[1]+=5;angle[2]+=4.5;angle[3]+=4;angle[4]+=3.5;angle[5]+=3;
            angle[6]+=2.5;angle[7]+=2;angle[8]+=1.5;angle[9]+=1;angle[10]+=0.5;
            angle[11]+=8;
            $(".mercury").css({"transform":"rotate("+ angle[1] +"deg)"});
            $(".venus").css({"transform":"rotate("+ angle[2] +"deg)"});
            $(".earth").css({"transform":"rotate("+ angle[3] +"deg)"});
            $(".moon").css({"transform":"rotate("+ angle[11] +"deg)"});
            $(".mars").css({"transform":"rotate("+ angle[4] +"deg)"});
            $(".asteroids_meteorids").css({"transform":"rotate("+ angle[5] +"deg)"});
            $(".jupiter").css({"transform":"rotate("+ angle[6] +"deg)"});
            $(".saturn").css({"transform":"rotate("+ angle[7] +"deg)"});
            $(".uranus").css({"transform":"rotate("+ angle[8] +"deg)"});
            $(".neptune").css({"transform":"rotate("+ angle[9] +"deg)"});
            $(".pluto").css({"transform":"rotate("+ angle[10] +"deg)"});
        },20);
    }else {
        t = null;
    }


    //
    function Scroll(a0,a1,a2){
        // 滚动条事件
        var speed = 0;
        var p = 0;
        var t = 0;
        $(window).scroll(function (e) {
            p = $(this).scrollTop();
            speed = p / 5;
            if(t <= p) {
                $('.homePage-1-bgPic').css("background-position","50% "+ -speed +"px");
                $('.homePage-3-bgPic').css("background-position","50% "+ (-speed * a0 + a1) +"px");
                $('.homePage-5-bgPic').css("background-position","50% "+ (-speed * a0 + a2) +"px");

            }else {
                $('.homePage-1-bgPic').css("background-position","50% "+ -speed +"px");
                $('.homePage-3-bgPic').css("background-position","50% "+ (-speed * a0 + a1) +"px");
                $('.homePage-5-bgPic').css("background-position","50% "+ (-speed * a0 + a2) +"px");
            }
            t = p;// 更新上一次scrollTop值
            // 返回顶部
            if(p > 100){
                $(".toTop").fadeIn(500);
            }else {
                $(".toTop").fadeOut(500);
            }
            // 异步加载
            if(isBigScreen){
                myAjax();
                Adert(p);
            }
        });
    }
    function myAjax(){
        if($(window).scrollTop() > 100){
            if(j < 1) {
                $.ajax({
                    type: "get",
                    success: function () {
                        j++;
                        //console.log(j);
                        $("section > .container-fluid").append('<div class="homePage-5"></div>');
                        $(".homePage-5").append('<div class="homePage-5-bgPic" style="background-position:50% 0px"></div>');
                        $("body").append('<footer class="hidden-xs hidden-sm text-center"></footer>');
                        $("footer").append('<span class="glyphicon glyphicon-heart-empty"></span>')
                                    .append('<span class="glyphicon glyphicon-send"></span>')
                                    .append('<span class="glyphicon glyphicon-tower"></span>')
                                    .append('<span class="glyphicon glyphicon-apple"></span>')
                                    .append('<span class="glyphicon glyphicon-ice-lolly-tasted"></span>')
                                    .append('<span class="glyphicon glyphicon-bishop"></span>')
                                    .append('<span class="glyphicon glyphicon-magnet"></span>')
                                    .append('<span class="glyphicon glyphicon-hdd"></span>')
                                    .append('<span class="glyphicon glyphicon-folder-open"></span>')
                                    .append('<span class="glyphicon glyphicon-tree-deciduous"></span>');
                    },
                    error: function () {
                    }
                })
            }else {
                return;
            }
        }
    }
    function Adert(speed){
        $(".blank-box").stop().animate({"top":speed + 80},300)
    }
});