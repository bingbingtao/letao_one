

// 一进入登录页面， 发送ajax请求，获取当前用户登录的状态
// 1，如果当前用户登录了，就让用户继续访问
// 2，如果当前用户没登录，将用户拦截在登录页面
$.ajax({
    url:'/employee/checkRootLogin',
    type:'GET',
    dataType:'json',
    success:function(info){
        // console.log(info)
        if(info.error === 400){
            location.href = 'login.html';
        }
        if(info.success){
            // 登录成功
            console.log('当前用户已登录')
        }
    }
})