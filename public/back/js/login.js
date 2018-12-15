

$(function(){
    
    // 一，进行表单校验：
    // 1. 用户名不能为空:     用户名长度为2-6位
    // 2. 用户密码不能为空:   用户密码长度为6-12位 
    // alert(1)

    $('#form').bootstrapValidator({

        // 配置图标：
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',            //校验成功
            invalid: 'glyphicon glyphicon-remove',      //校验失败
            validating: 'glyphicon glyphicon-refresh'   //校验中
          },



        // 配置校验字段： 需要先给input框配置 name
        fields:{
            username:{
                // 配置检验规则：
                validators:{
                    // 配置一个非空：
                    notEmpty:{
                        message:'用户名不能为空'
                    },
                    // 长度校验：
                    stringLength:{
                        min:2,
                        max:6,
                        message:'用户名长度必须是2-6位'
                    },
                    // callback 专门用来定制回调的提示内容：
                    callback:{
                        message:'用户名不存在'
                    }
                }
            },
            password:{
                validators: {
                    notEmpty: {
                        message: '密码不能为空'
                    },
                    stringLength: {
                        min: 6,
                        max: 12,
                        message: '密码长度必须是6-12位'
                    },
                    callback:{
                        message:'密码错误'
                    }
                }
            },
        }
    });


    // 二, 注册表单验证成功事件：
    //     注册表单校验成功事件，在校验成功时，会触发在事件阻止默认的提交(会跳转)，
    //     通过ajax进行提交(异步)

    $('#form').on('success.form.bv', function(e){
        // 阻止默认的提交：
        e.preventDefault();

        // 通过ajax提交：
        // console.log('通过ajax提交')
        $.ajax({
            url:'/employee/employeeLogin',
            type:'POST',
            data:$('#form').serialize(),
            dataType:'json',
            success:function(info){
                // console.log(info);
                if(info.success){
                    // 成功跳转到首页：
                    location.href = 'index.html';
                }
                if(info.error ===1000){
                    // alert('用户名不存在')
                    // // 调用实例的更新校验方法 updateStatus 将校验状态更新失败
                    // 参数1：字段名称(username)
                    // 参数2：校验状态：NOT_VALIDATED(未检验), VALIDATING(校验中), INVALID(校验失败) or VALID(校验成功)
                    $('#form').data('bootstrapValidator').updateStatus('username', 'INVALID', 'callback');
                }
                if(info.error === 1001){
                    // alert('密码错误')
                    $('#form').data('bootstrapValidator').updateStatus('password', 'INVALID', 'callback');
                }
            }
        })
    })


    // 三, 表单重置：
    // $('#form').data('bootstrapValidator') : 创建插件实例
    // resetForm()        没有传参或者传false,只会重置校验状态
    // resetForm(true)    内容和校验状态都重置

    // 由于 reset 按钮，本身就可以重置内容，所以上面两个都可以。

    $('[type="reset"]').click(function(){
        // 重置检验状态：
        $('#form').data('bootstrapValidator').resetForm();
    })





})