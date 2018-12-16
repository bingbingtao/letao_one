


$(function(){
    // 绘制竖线图：
   // 基于准备好的dom，初始化echarts实例
   var echarts_left = echarts.init(document.querySelector('.echarts_left'));

   // 指定图表的配置项和数据
   var option1 = {
        //    大标题：
       title: {
        //    标题文本：
           text: '2018年注协数量'
       },
        //    提示框组件：
       tooltip: {},
       legend: {
           data:['人数']
       },
       xAxis: {
           data: ["1月","2月","3月","4月","5月","6月"]
       },
       yAxis: {},
       series: [{
           name: '人数',
           type: 'bar',
           data: [500, 700, 600, 1200, 1800, 900]
       }]
   };

   // 使用刚指定的配置项和数据显示图表。
   echarts_left.setOption(option1);


   // 基于准备好的dom，初始化echarts实例
   var echarts_right = echarts.init(document.querySelector('.echarts_right'));

   // 指定图表的配置项和数据
   var option2 = {
    title : {
        text: '热门品牌销售',
        subtext: '2017年6月',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: ['耐克','阿迪','新百伦','德尔惠','特步']
    },
    series : [
        {
            name: '品牌',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
                {value:335, name:'耐克'},
                {value:310, name:'阿迪'},
                {value:234, name:'新百伦'},
                {value:135, name:'德尔惠'},
                {value:1548, name:'特步'}
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
   };

   // 使用刚指定的配置项和数据显示图表。
   echarts_right.setOption(option2);

})