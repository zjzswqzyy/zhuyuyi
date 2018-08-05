/**
 * Created by Admin on 2018/8/3.
 */
$(function () {
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
    $(window).scroll(function () {
        Adert($(this).scrollTop());
    });
    // 显示隐藏
    var isSmallScreen = $(window).width() <= 768;
    var length = $(".article").length;
    $(".article").eq(0).css({"display":"block"}).siblings().css({"display":"none"});
    if(isSmallScreen){
        $(".article").css({"display":"block"});
    }
    $(".blank-box a").on('click', function () {
        //console.log($(this).index())
        $(".article").eq($(this).index()).stop().show(500).siblings().stop().hide(500);
    });
    // 微信二维码动画
    $(".mobile-link").on('mouseenter', function () {
        $('.mobile-link > img').stop().slideDown('slow');
    }).on('mouseleave', function () {
        $('.mobile-link > img').stop().slideUp('fast');
    });

    function Adert(speed){
        $(".blank-box").stop().animate({"top":speed + 80},300);
    }
});






