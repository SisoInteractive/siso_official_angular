// Created by sam mok (Siso brand interactive team.) 2015

var index = {
    window_width:0,// this is window width
    window_height:0,
    initNumber:0,//控制网站加载几次
    heardVideo:document.getElementById("header-video"),
    app: function(){
        index.operate_dom();
    },

    operate_dom:function(){
        index.window_width = $(window).width();  //get window width
        index.window_height = $(window).height(); //get window height
        // click toggle-btn
        index.header = $('.header');
        //toggle
        function addActive( route , locationHash ){
            if( locationHash.indexOf( route ) < 0 ) {
                $('.loading-bod').addClass('active');
                setTimeout(function(){
                    $('.main-views,.header').addClass('active');
                    $('.loading-bod').removeClass('active');
                },800);
            }else{
                $('.main-views,.header').addClass('active');
            }
            index.heardVideo.pause();//关闭导航视频播放
        }

        $('.toggle-home').hammer().bind('tap',function(){
            var locationHash = location.hash;
            var route = 'home'
            addActive( route , locationHash )
        });

        $('.toggle-company').hammer().bind('tap',function() {
            var locationHash = location.hash;
            var route = 'company';
            addActive( route , locationHash );
        });

        $('.toggle-mostRecent').hammer().bind('tap',function() {
            var locationHash = location.hash;
            var route = 'mostRecent';
            addActive( route , locationHash );
        });

        $('.toggle-news').hammer().bind('tap',function() {
            var locationHash = location.hash;
            var route = 'news';
            addActive( route , locationHash );
        });

        $('.toggle-careers').hammer().bind('tap',function() {
            var locationHash = location.hash;
            var route = 'careers';
            addActive( route , locationHash );
        });

        $('.toggle-about').hammer().bind('tap',function() {
            var locationHash = location.hash;
            var route = 'about';
            addActive( route , locationHash );
        });

        $('.toggle-services').hammer().bind('tap',function() {
            var locationHash = location.hash;
            var route = 'server';
            addActive( route , locationHash );
        });

        $('.toggle-btn').hammer().bind('tap',function() {
            var locationHash = location.hash;
            if( locationHash.indexOf('caseDetail') < 0 ){
                $('.main-views,.header').addClass('active');
                $('.loading-bod').removeClass('active');
            }else{
                $('.detail-project-views').addClass('active')
            }
            index.heardVideo.pause();
        });

        /*
        * window resize
        * mostRecent_item() --> Control mostRecent-body --> li height
        * */
        $(window).resize(function(){
            index.window_width = $(window).width();
            index.window_height = $(window).height();
        })



        /*
         *   transform toggle for detail-wrapper function
         */

        index.toggle_detail_wrapper = {
            detail_wrapper:'',
            index:1,
            active_Switch:true,
            next:function(){
                this.detail_wrapper = $('#detail-wrapper');
                var that = this;
                if(this.active_Switch){
                    var transformXVal = index.getTransForm(".detail-wrapper");
                    var transformXVal_Next = - ( this.index * 100 );
                    if(  transformXVal == 0 ){
                        transformXVal_Next = -100;
                        this.detail_wrapper.css("webkitTransform","translate3d("+ transformXVal_Next +"%,0,0)");
                    }else{
                        this.detail_wrapper.css("webkitTransform","translate3d("+ transformXVal_Next + "%,0,0)");
                    }
                    this.index++;
                    this.active_Switch = false;
                }
                setTimeout(function(){
                    that.active_Switch = true;
                },1000);
            },
            up:function(){
                var that = this;
                this.detail_wrapper = $('#detail-wrapper');
                if(this.active_Switch){
                    var transformXVal = ( this.index * 100 );
                    if(  transformXVal != 0 ){
                        var transformXVal_up =  (this.index - 2) * -100;
                        this.detail_wrapper.css("webkitTransform","translate3d("+ transformXVal_up + "%,0,0)");
                    }
                    if(this.index == 1){
                        this.index ==1
                    }else{
                        this.index--;
                        this.active_Switch = false;
                    }

                }
                setTimeout(function(){
                    that.active_Switch = true;
                },1000);
            },
            setIndex:function(activeIndex){
                this.detail_wrapper = $('#detail-wrapper');
                if(activeIndex){
                    this.index = activeIndex;
                    var transformXVal = -( (this.index - 1) * 100 );
                    this.detail_wrapper.css("webkitTransform","translate3d("+ transformXVal + "%,0,0)");
                }
            }

        }

        /*
         *   get Transform css value
         */
        function getTransform(Class){
                var wrapper = $(Class);
                if(wrapper) {
                    var transformVal = wrapper.css('-webkit-transform');
                    var numReg = /-?[0-9]+/g;
                    var valAry = transformVal.match(numReg);//返回数字值的数组
                    var transformXVal = valAry[valAry.length - 2], transformYVal = valAry[valAry.length - 1];//返回transformX、transformY的值
                    return transformXVal;
                }
        }
        index.getTransForm = getTransform;


        /**
         * @instance os
         * @memberof lib.env
         * @property {String} name - 操作系统名称，比如Android/AndroidPad/iPhone/iPod/iPad/Windows Phone/unknown等
         */
        if( lib.env.os.name ){
            if( lib.env.os.name == "iPhone" || lib.env.os.name == "Android" || lib.env.os.name == "Windows Phone" ){
                $("div .not-in-mobile").remove();
            }
        }

    }

};

$(function (){
    // init index 
    index.app();
});