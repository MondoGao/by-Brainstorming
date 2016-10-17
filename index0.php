<?php
    require_once "dep/jssdk.php";
    $jssdk = new JSSDK("wxb3ba9f7de176d6ae", "2e1c65afb6f9ed942b70c4a4143b4f11");
    $signPackage = $jssdk->GetSignPackage();
?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no">
        <title>头脑风暴</title>
        <link rel="stylesheet" href="css/index.css">
    </head>
    <body data-index="0">
        <section class="scroller">
            <header>
                <h3>选择元素</h3>
                <p>单击卡片即抽卡，最多5张，可重复</p>
            </header>
            <div class="card-container card-back">
                <!-- 前向箭头 -->
                <div class="card-wrap">
                    <div class="card card-thing" data-index="0">
                        <header>
                            物品
                        </header>
                        <!-- 背景圈圈 -->
                        <figure>
                            <img src="img/icon/thing.svg" alt="" />
                            <div class="icon-shadow"></div>
                        </figure>
                    </div>
                    <div class="card card-people" data-index="1">
                        <header>
                            人物
                        </header>
                        <!-- 背景圈圈 -->
                        <figure>
                            <img src="img/icon/people.svg" alt="" />
                            <div class="icon-shadow"></div>
                        </figure>
                    </div>
                    <div class="card card-time" data-index="2">
                        <header>
                            时间
                        </header>
                        <!-- 背景圈圈 -->
                        <figure>
                            <img src="img/icon/time.svg" alt="" />
                            <div class="icon-shadow"></div>
                        </figure>
                    </div>
                    <div class="card card-place" data-index="3">
                        <header>
                            地点
                        </header>
                        <!-- 背景圈圈 -->
                        <figure>
                            <img src="img/icon/place.svg" alt="" />
                            <div class="icon-shadow"></div>
                        </figure>
                    </div>
                    <div class="card card-event" data-index="4">
                        <header>
                            事件
                        </header>
                        <!-- 背景圈圈 -->
                        <figure>
                            <img src="img/icon/event.svg" alt="" />
                            <div class="icon-shadow"></div>
                        </figure>
                    </div>
                </div>
                <!-- 后向箭头 -->
                <div class="controller-area previous"></div>
                <div class="controller-area next"></div>
            </div>
            <ul class="card-list">
                <li class="empty"></li>
                <li class="empty"></li>
                <li class="empty"></li>
                <li class="empty"></li>
                <li class="empty"></li>
            </ul>
            <a href="#" id="btn-start" class="btn btn-large">开始脑暴</a>

        </section>
        <section>
            <header>
                <h3>查看卡片</h3>
                <p>主题： <span id="subject"></span></p>
            </header>
            <div class="card-container card-front">
                <!-- 前向箭头 -->
                <div id="card-result" class="card-wrap">

                </div>
                <template id="card">
                    <div class="card">
                        <img src="#" alt="" />
                        <header>
                            <small></small>
                            <span></span>
                        </header>
                        <p><span></span><span></span><span></span><br /><span></span><span></span><span></span></p>
                    </div>
                </template>
                <!-- 后向箭头 -->
                <div class="controller-area previous"></div>
                <div class="controller-area next"></div>
            </div>
            <a href="#" id="btn-discuss" class="btn btn-large">与朋友一起讨论</a>
            <a href="#" id="btn-again" class="btn btn-large">再抽一次</a>

        </section>
        <div id="black-layout" class="hide"></div>
        <div id="dialog-layout" class="hide">
            <header>
                设定脑暴主题
            </header>
            <input type="text" name="subject" value="" placeholder="最多输入10个字，不填则不限主题" />
            <a href="#" id="dialog-cancel" class="btn btn-small">取消</a>
            <a href="#" id="dialog-submit" class="btn btn-small">确定</a>
        </div>
        <div id="share-layout" class="hide">
            <img src="img/icon/share.svg" alt="" />
            <img src="img/icon/sharearrow.svg" alt="" />
            <p>
                单击右上角分享给朋友哦～
            </p>
        </div>
        <script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
        <script>
          wx.config({
            debug: false,
            appId: '<?php echo $signPackage["appId"];?>',
            timestamp: <?php echo $signPackage["timestamp"];?>,
            nonceStr: '<?php echo $signPackage["nonceStr"];?>',
            signature: '<?php echo $signPackage["signature"];?>',
            jsApiList: [ "checkJsApi",
                "onMenuShareTimeline",
                "onMenuShareAppMessage",
                "onMenuShareQQ",
                "onMenuShareWeibo",
                "onMenuShareQZone"]
          });
          wx.ready(function() {
              wx.checkJsApi({
                    jsApiList: ['chooseImage'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
                    success: function(res) {
                        // 以键值对的形式返回，可用的api值true，不可用为false
                        // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
                    }
                });
              wx.onMenuShareTimeline({
                  title: '头脑风暴', // 分享标题
                  link: 'www.magcin.cn/bybs', // 分享链接
                  imgUrl: 'www.magcin.cn/bybs/img/icon/event.svg', // 分享图标
                  success: function () {
                      // 用户确认分享后执行的回调函数
                  },
                  cancel: function () {
                      // 用户取消分享后执行的回调函数
                  }
              });
        });
        </script>
        <script src="js/index.js" charset="utf-8"></script>
    </body>
</html>
