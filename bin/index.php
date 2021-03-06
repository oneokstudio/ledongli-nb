<?php
if (isset($_REQUEST["name"]) && isset($_REQUEST["level"]) && isset($_REQUEST["music"]) && isset($_REQUEST["prevscore"])) {
	$name = $_REQUEST["name"];
	$level = $_REQUEST["level"];
	$prevscore = $_REQUEST["prevscore"];
	$music = ($_REQUEST["music"] == "on")?true:false;
}else{
	$name = "TA";
	$level = 1;
	$music = true;
	$prevscore = 0;
}
//
//include "WX.php";
//require_once "jssdk.php";
//$jssdk = new JSSDK(WX_APP_ID, WX_APP_SECRET);
//$signPackage = $jssdk->GetSignPackage();

?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
    <meta http-equiv="Pragma" content="no-cache" />
    <meta http-equiv="Expires" content="0" />

	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1, maximum-scale=1">
	<meta name="msapplication-tap-highlight" content="no" />
	<title>最任性的加速测试</title>
	<link href="app.css?v1" rel="stylesheet">
	<script type="text/javascript">
        var appType = "game";
        var offlineScore = 0;
        var username = "<?php echo $name; ?>";
        var fromfriend = false;
        var curLevel = <?php echo $level; ?>;
        var prevscore = <?php echo $prevscore; ?>;
        var musicOn=<?php echo ($music)?'true':'false'; ?>
    </script>
</head>
<body>
	<div id="loader">
		<img src="img/loader.gif">
		<div id="percent">0</div>
	</div>
	<canvas id="game"></canvas>

	<!--	抽奖成功-->
	<div class="full-screen fs-success">
		<div class="shoe-info">
			<div class="left-part"></div>
			<div class="right-part"></div>
		</div>
		<form class="user-info">
			<p class="tip">请留下您的联系方式，我们会有专人尽快与您联系。库存有限，尺码以实际收到为准。</p>
            <input id="name" type="text" placeholder="姓名"/>
            <input id="mobile" type="text" placeholder="电话" style="width: 55%;margin-right: 0;"/>

			<div class="btn btn-submit"></div>
		</form>
	</div>
	<!--	抽奖失败-->
    <div class="full-screen fs-fail">
        <div class="shoe-info">
            <div class="left-part"></div>
            <div class="right-part">
                <div class="fail-right"></div>
                <div class="btn-replay"></div>
            </div>
        </div>
    </div>
    <script src="lib/jweixin-1.0.0.js"></script>
    <script src="lib/wxShare.js"></script>
	<script src="lib.js?v1"></script>
	<script src="app.js?v6"></script>
	<script>
	  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

	  ga('create', 'UA-64494000-2', 'auto');
	  ga('send', 'pageview');

	  $('.btn-submit').click(function(){
		  var name = $.trim($('#name').val());
		  var mobile = $.trim($('#mobile').val());

		  if (mobile == '' || name == '') {
			  alert('请保证信息填写完整哦~');
		  } else if (!checkNumber(mobile) || mobile.length != 11) {
			  alert('手机号码格式不对哦~');
		  } else {
			  $.ajax({
				  type: "post",
				  dataType: "json",
				  data:{
					  'name': name,
					  'phone': mobile
				  },
				  url: 'user_info.php',
				  success: function(res){
					  if(res.code == 200){
						  if (confirm('上传信息成功~是否再跑一次？')) {
                location.reload();
              };
					  } else {
						  alert(res.msg);
					  }

				  },
          error: function(jqXHR, exception) {
            if (jqXHR.status === 0) {
                alert('连接失败，请稍后重试~');
            } else if (jqXHR.status == 401) {
                alert('连接服务器需要权限~');
            } else if (jqXHR.status == 404) {
                alert('请求 url 无法找到。[404]');
            } else if (jqXHR.status >= 500 && jqXHR.status < 600) {
                alert('十分抱歉，服务器内部发生错误。' + jqXHR.status);
            } else if (exception === 'parsererror') {
                alert('JSON 解析失败！请尝试切换网络。');
            } else if (exception === 'timeout') {
                alert('连接超时，请稍后重试~');
            } else {
                alert('发现未知错误。(' + jqXHR.responseText + ', ' + exception + ')');
            }
          }
			  });
		  }
	  });
	  $('.btn-replay').click(function () {
		  location.reload();
	  });


	  function checkNumber(s)
	  {
		  if(s!=null){
			  var r,re;
			  re = /\d*/i; //\d表示数字,*表示匹配多个数字
			  r = s.match(re);
			  return (r==s)?true:false;
		  }
		  return false;
	  }

      //分享
      var platform = '';
      var shareData;
      var ua = navigator.userAgent.toLowerCase();
      if (/micromessenger/i.test(ua)) {
          platform = 'wx';
      } else if (/(iphone|ipod|ipad)/i.test(ua)) {
          platform = 'ios';
      } else if (/(android)/i.test(ua)) {
          platform = 'android';
      }
      function connectWebViewJavascriptBridge (callback) {
          if (window.WebViewJavascriptBridge) {
              callback(WebViewJavascriptBridge)
          } else {
              document.addEventListener('WebViewJavascriptBridgeReady', function() {
                  callback(WebViewJavascriptBridge)
              }, false)
          }
      }
      function setShare (conf) {
          if (platform == 'wx') {
              WXSHARE.init(conf);
          } else if(platform == 'android') {
              conf = JSON.stringify(conf);
              return window.web && web.setWebViewShare(conf);
          } else if (platform == 'ios') {
              conf = JSON.stringify(conf);
              connectWebViewJavascriptBridge(function (bridge) {
                  bridge.callHandler('setWebViewShare', conf, function() {});
              });
          }
      }

      setShare({
        'image_url':'http://115.159.67.149/ledongli-nb/bin/img/shareicon.jpg',
        'link_url': location.href,
        'title':'最任性的疾跑PK游戏',
        'content':'NB无负提速，疾跑PK游戏',
        'shared_to':'1'
      })

	</script>
</body>
</html>