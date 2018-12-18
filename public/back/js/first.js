



$(function(){

    var currentPage = 1;  //当前页面
    var pageSize = 5; //页面总条数

    render();
    //1， 一进入页面我们就发送ajax请求，完成渲染
function render(){
    $.ajax({
        url:'/category/queryTopCategoryPaging',
        type:'GET',
        dataType:'json',
        data:{
            page:currentPage,
            pageSize:pageSize,
        },
        success:function(info){
            console.log(info)
            var htmlstr = template("firstTpl", info)
            $('tbody').html(htmlstr);
    
    
            // 根据返回数据，完成初始化：
            $('#paginator').bootstrapPaginator({
                // 版本号：
                bootstrapMajorVersion:3,
                // 当前页：
                currentPage:info.page,
                // 总页数：
                totalPages:Math.ceil(info.total / info.size),
                // 添加点击事件：
                onPageClicked:function(a, b, c, page){
                    console.log(page)
                    // 更新当前页：
                    currentPage = page;
                    // 重新渲染页面：
                    render();
                }
            })
        }
    })
}


//2， 给添加按钮，注册点击事件，显示模态框：
$('#addBtn').click(function(){
    $('#addModal').modal('show')
})


//3， 调用表单校验插件，完成检验：
$('#form').bootstrapValidator({
    // 图标配置：
    feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
      },

    // 校验字段：  先给input设置name
    fields:{
        categoryName:{
        // 校验规则：    
            validators:{
                // 不能为空：
                notEmpty:{
                    message:'请输入一级分类名称'
                },
            }
        }
    }
})


//4,阻止默认提交，通过ajax提交
$("#form").on('success.form.bv', function (e) {
    // 默认阻止：
    e.preventDefault();

    // 使用ajax提交逻辑
    $.ajax({
        url:'/category/addTopCategory',
        type:'POST',
        dataType:'json',
        data:$('#form').serialize(),
        success:function(info){
            console.log(info)
            if(info.success){
                // 关闭模态框：
                $('#addModal').modal('hide')
                // 重新渲染：
                currentPage = 1;
                render();

                // 重置表单：
                $('#form').data('bootstrapValidator').resetForm(true);
            }
        }
    })
});

})