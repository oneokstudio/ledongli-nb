<?php
include "config.php";

if (isset($_REQUEST["name"]) && isset($_REQUEST["level"]) && isset($_REQUEST["music"]) && isset($_REQUEST["prevscore"])) {
	$name = $_REQUEST["name"];
	$level = $_REQUEST["level"];
	$prevscore = $_REQUEST["prevscore"];
	$music = ($_REQUEST["music"] == "on")?true:false;
}else{
	$data = $wechat->getOauthAccessToken();
	if ($data){
		$openid = $data['openid'];
		$user = $wechat->getOauthUserinfo($data['access_token'], $openid);
		$name = isset($user["nickname"]) ? ($user["nickname"]) : "-";
		$level = 1;
		$music = true;
		$prevscore = 0;
	}else{
		header("Location: ".$wechat->getOauthRedirect(MY_URL.'game.php', 'fromGame'.((isset($_REQUEST['restart']))?'Restart':''), 'snsapi_userinfo'));
		die();
	}
}

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

	</script>
</body>
</html>