 var ws=require("nodejs-websocket");
 console.log("开始建立连接...");
 var str1=null,str2=null, clientReady=false,serverReady=false;
 var server=ws.createServer(function(conn){
     conn.on('text',function(str){
         console.log(str);
          /**
           * 用户小雨第一次连接
           */
        if(str==="小雨"){
              str1=conn;
              clientReady=true;
              conn.sendText("欢迎"+str); 
        }
        /**
         * 用户小乔第一次连接
         */
        if(str==="小乔"){
             str2=conn;
             serverReady=true;
            conn.sendText("欢迎"+str);
        }
        /**
         * 当有第二个用户连接时。
         */
        if(clientReady&&serverReady){
            console.log(str);
            str2.sendText(str);
            str1.sendText(str);
        }
            
     })
     conn.on("close",function(code,reason){
         console.log("关闭连接");
     })
     conn.on("error",function(code,reason){
         console.log("异常关闭")
     });
 }).listen(8082);
 console.log("websocket连接完毕")