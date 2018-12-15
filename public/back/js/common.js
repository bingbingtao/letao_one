



// 测试进度条：
// NProgress.start()  //开启进度条

// // 加延迟：
// setTimeout(function(){
//     NProgress.done()  //关闭进度条
// }, 2000);


// 需求    在第一个ajax发送的时候，开启进度条
//         在全部的ajax回来的时候，关闭进度条

// ajax全局事件：
// .ajaxComplplete()    当每个ajax完成时，调用  (不管成功还是失败)
// .ajaxSuccess()       当ajax返回成功时调用
// .ajaxError()         当ajax返回失败是调用
// .ajaxSend()          当ajax发送时调用

// .ajaxStart()         当第一个ajax发送时调用
// .ajaxStop()          当全部ajax请求完成时调用


$(document).ajaxStart(function(){
    // 第一个ajax发送时，开启进度条
    NProgress.start();
});


$(document).ajaxStop(function(){
    // 模拟网络延迟：
    setTimeout(function(){
        //当全部ajax请求完成时，关闭进度条
    NProgress.done();
    }, 500)
})