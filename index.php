<?php
define("TOKEN", "weixin");
$wechatObj = new wechatCallbackapiTest();

// echo '<script src="jquery.min.js"></script>';
// echo '<script>
//         $.ajax({
//             url: "https://api.weixin.qq.com/cgi-bin/component/api_component_token",
//             dataType: "JSONP",
//             type: "POST",
//             data:{
//                 "component_appid":"wxf3a7f7555c808dfe" ,
//                 "component_appsecret": "619d434744bb592503abbbdd9d4ff1f9", 
//                 "component_verify_ticket": "ticket_value" 
//             },
//             success:function(res){
//                 console.log(res);
//             }
//         })
//     </script>';
// hxLUiGGSmGV2YML-BD9FS4k1OmhDY2NzJEtzBEdBMW3D9Cz1wttJqQnIWtU0wOQJe5xG0kF3EThYGKlA-J_gD-GcEWaegSDSHqboqb_I4ZtlTpxD3shW7fXz8NdwPjvnAQDjADAMCP
if (isset($_GET['echostr'])) {
    $wechatObj->valid();
}else{
    $wechatObj->responseMsg();
}

class wechatCallbackapiTest
{
    public function valid()
    {
        $echoStr = $_GET["echostr"];
        if($this->checkSignature()){
            header('content-type:text');
            echo $echoStr;
            exit;
        }
    }

    private function checkSignature()
    {
        $signature = $_GET["signature"];
        $timestamp = $_GET["timestamp"];
        $nonce = $_GET["nonce"];

        $token = TOKEN;
        $tmpArr = array($token, $timestamp, $nonce);
        sort($tmpArr, SORT_STRING);
        $tmpStr = implode( $tmpArr );
        $tmpStr = sha1( $tmpStr );

        if( $tmpStr == $signature ){
            return true;
        }else{
            return false;
        }
    }

    public function responseMsg()
    {
        $postStr = $GLOBALS["HTTP_RAW_POST_DATA"];

        if (!empty($postStr)){
            $postObj = simplexml_load_string($postStr, 'SimpleXMLElement', LIBXML_NOCDATA);
            $fromUsername = $postObj->FromUserName;
            $toUsername = $postObj->ToUserName;
            $keyword = trim($postObj->Content);
            $time = time();
            $textTpl = "<xml>
                        <ToUserName><![CDATA[%s]]></ToUserName>
                        <FromUserName><![CDATA[%s]]></FromUserName>
                        <CreateTime>%s</CreateTime>
                        <MsgType><![CDATA[%s]]></MsgType>
                        <Content><![CDATA[%s]]></Content>
                        <FuncFlag>0</FuncFlag>
                        </xml>";
            if($keyword == "?" || $keyword == "？")
            {
                $msgType = "text";
                $contentStr = date("Y-m-d H:i:s",time());
                $resultStr = sprintf($textTpl, $fromUsername, $toUsername, $time, $msgType, $contentStr);
                echo $resultStr;
            }
        }else{
            echo "";
            exit;
        }
    }
}
?>
