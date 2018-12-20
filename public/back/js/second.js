



$(function(){

// 发送ajax请求，通过模板引擎渲染：
var currentPage = 1;     //当前页
var pageSize = 5;       //每页多少

render();


function render(){
    $.ajax({
        url:'/category/querySecondCategoryPaging',
        type:'GET',
        dataType:'json',
        data:{
            page:currentPage,
            pageSize:pageSize,
        },
        success:function(info){
            // console.log(info);

            var htmlstr = template('secondTpl', info)
            $('tbody').html(htmlstr)
            // console.log(info.page);
            // console.log(info.total);
            
            // 分页初始化：
            $('#paginator').bootstrapPaginator({
                // 版本号：
                bootstrapMajorVersion:3,
                // 当前页：
                currentPage:info.page,
                // 总页数：
                totalPages:Math.ceil(info.total/info.size),
                
                // 添加点击事件：
                onPageClicked:function(a, b, c, page){
                    // 更新当前页：
                    currentPage = page;
                    // 重新渲染：
                    render();
                }
            })
        }
    })

}


// 添加按钮，注册点击事件：
$('#addBtn').click(function(){
    $('#addModal').modal('show')


    // 显示模态框，就立刻发送ajax请求，请求一级分类的全部数据，渲染下拉列表
    // 通过 page:1   pageSiz:100   获取数据，模拟获取全部数据的接口
    $.ajax({
        url:'/category/queryTopCategoryPaging',
        type:'GET',
        dataType:'json',
        data:{
            page:1,
            pageSize:100
        },
        success:function(info){
            console.log(info)
            var htmlstr = template('dropdownTpl', info)
            $('.dropdown-menu').html(htmlstr)
        }
    })
}) 


// 给下拉列表的 a 注册点击事件，让下拉列表可选(通过事件委托注册)
$('.dropdown-menu').on('click', 'a', function(){
    // console.log('嘟嘟')
    // 获取a的文本，
    var txt = $(this).text()

    // 设置给按钮：
    $("#dropdownText").text(txt)

    // 获取a存的id  一级分类id
    var id = $(this).data('id')

    // 赋值给隐藏域(input:hidden)
    $('[name="categoryId"]').val(id);

    // 更新隐藏域的校验状态，校验为成 功：
    $('#form').data('bootstrapValidator').updateStatus('categoryId', 'VALID')
})


// 调用 fileupload 方法完成文件上传初始化
$('#fileuploade').fileupload({
    dataType:"json",
    //e：事件对象
    //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
    done:function (e, data) {
      console.log(data);
      var result = data.result;    //后台返回的对象
      var picUrl = result.picAddr; //图片路径

    //   设置给 img src
    $('#imgBox img').attr('src', picUrl)

    // 设置图片地址给隐藏域，用于提交：
    $('[name="brandLogo"]').val(picUrl);

    // 更新隐藏域的校验状态，为成功：
    $('#form').data('bootstrapValidator').updateStatus('brandLogo', 'VALID')
    }
})

// 思路：选择完图片完成预览时，发送了一个异步文件上传请求，真正预览时，文件已经上传到服务器
// 使用插件步骤：
// 1，引包   注意依赖问题
// 2，指定   name后台接收的name值  data-url 指定后台接口地址
// 3，使用 fileupload 初始化，配置 dataType 和 done 方法即可



// 进行表单校验插件初始化：
$('#form').bootstrapValidator({
    excluded: [],
    // 配置图标：
    feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',            //校验成功
        invalid: 'glyphicon glyphicon-remove',      //校验失败
        validating: 'glyphicon glyphicon-refresh'   //校验中
      },
    fields:{
        categoryId:{
            validators:{
                notEmpty:{
                    message:'请选择一级分类'
                }
            }
        },
        brandName:{
            validators:{
                notEmpty:{
                    message:'请输入二级分类名称'
                }
            }
        },
        brandLogo:{
            validators:{
                notEmpty:{
                    message:'请选择上传的图片'
                }
            }
        }
    }
})


// 阻止默认的提交，通过ajax提交(注册表单校验成功事件)
$('#form').on('success.form.bv', function(e){

    e.preventDefault();   //阻止默认的提交

    // 通过ajax提交
    $.ajax({
        url:'/category/addSecondCategory',
        type:'POST',
        dataType:'json',
        data:$('#form').serialize(),
        success:function(info){
            console.log(info)
            if(info.success){
                // 关闭模态框：
                $('#addModal').modal('hide')
                // 重新渲染：
                currentPage=1;
                render();

                // 重置表单内容和状态：
                $('#form').data('bootstrapValidator').resetForm(true);

                // 由于下拉列表和图片不是表单元素，需要手动重置
                $('#dropdownText').text('请选择一级分类');
                $('#imgBox img').attr('src', './images/none.png')
            }
        }
    })
})

})