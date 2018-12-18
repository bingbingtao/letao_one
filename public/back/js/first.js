



$(function(){

    var current = 1;  //当前页面
    var pageSize = 5; //页面总条数

    render();
    // 一进入页面我们就发送ajax请求，完成渲染
function render(){
    $.ajax({
        url:'/category/queryTopCategoryPaging',
        type:'GET',
        dataType:'json',
        data:{
            page:current,
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





})