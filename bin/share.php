<?php
$score = intval($_REQUEST['score']);

$level = 2;
if ($score <= 250){
  $level = 5;
}else if ($score <= 310){
  $level = 4;
}else if ($score <= 360){
  $level = 3;
}

$name = ($_REQUEST['name']);
$fromFiend = ((isset($_REQUEST['friend']))?true:false);
if ($fromFiend){
  if (isset($_REQUEST['friendlevel'])){
    $level = intval($_REQUEST['friendlevel']);
  }
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
	<link href="app.css?v6" rel="stylesheet">
	<script type="text/javascript">
        var appType = "offline";
        var offlineScore = <?php echo $score; ?>;
        var username = "<?php echo $name; ?>";
        var fromfriend = <?php echo ($fromFiend)?'true':'false'; ?>;
        var curLevel = <?php echo $level; ?>;
        var musicOn=false;
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
	<script src="lib.js?v6"></script>
	<script src="app.js?v8"></script>
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