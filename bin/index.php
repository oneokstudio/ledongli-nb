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

include "WX.php";
require_once "jssdk.php";
$jssdk = new JSSDK(WX_APP_ID, WX_APP_SECRET);
$signPackage = $jssdk->GetSignPackage();

?>


<!DOCTYPE html>
<html lang="en">
<head>
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

	<div class="modal-bg"></div>
	<!--	抽奖成功-->
	<div class="modal">
		<div class="btn-close"></div>
		<h2 class="title">恭喜你！</h2>
		<p class="tip">赢得 New Balance Vazee 跑鞋一双，请留下您的联系方式，我们会有专人尽快与您联系</p>
		<form>
			<div class="form-group">
				<input id="name" type="text" placeholder="请输入姓名"/>
			</div>
			<div class="form-group last">
				<input id="mobile" type="text" placeholder="请输入手机"/>
			</div>

			<div class="btn btn-submit">提交</div>
			<div class="btn btn-back" style="margin-top: 20px;">返回</div>
		</form>
	</div>
	<!--	抽奖失败-->
	<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
    <script>
        wx.config({
          debug: false,
          appId: '<?php echo $signPackage["appId"];?>',
          timestamp: <?php echo $signPackage["timestamp"];?>,
          nonceStr: '<?php echo $signPackage["nonceStr"];?>',
          signature: '<?php echo $signPackage["signature"];?>',
          jsApiList: [
          'onMenuShareTimeline',
          'onMenuShareAppMessage',
          ]
      });
    </script>
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
					  'mobile': mobile
				  },
				  url: Server.attend,
				  success: function(res){
					  if(res.code == 200){
					  }
				  },
				  error: function (res) {
				  }
			  });
		  }
	  });
	  $('.btn-back').click(function () {
		  $('.modal-bg').hide();
		  $('.modal').hide();
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
	</script>
</body>
</html>