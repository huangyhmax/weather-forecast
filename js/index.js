var time=new Date();
// console.log(time);
var hour=time.getHours();
var amorpm='';
if(hour>12){
    amorpm="PM";
}else if(hour<12){
    amorpm="AM"
}
var times=hour+':'+time.getMinutes()+' '+amorpm;
console.log(times);
$('.middledata>.time').text(times);
// console.log(times)

$.get('http://weixin.jirengu.com/weather').done(function(ret){
    if(ret.status="OK"){
        // $('.weatherapi').text(JSON.stringify(ret));
        $('.middledata>.city').text(ret.weather[0].city_name)
        $('.middledata>.date').text(ret.weather[0].future[0].date+' '+ret.weather[0].future[0].day)
        $('.template>.temp-data').text(ret.weather[0].now.temperature+'℃')
        $('.template>.day_weather').text(ret.weather[0].now.text+' / '+'pm25值: '+ret.weather[0].now.air_quality.city.pm25+' / '+'空气质量: '+ret.weather[0].now.air_quality.city.quality)
        // console.log('haha'+ret.weather[0].now.air_quality.city.quality)

        function weatherimg(code){
            var iconname=' ';
            if(code>=0 && code<=3 || code===38){
                return iconname="#icon-sunny";
            }else if(code>=4 && code<=9){
                return iconname="#icon-cloud";
            }else if(code>=10 && code<=19){
                return iconname="#icon-rain";
            }else if(code>=20 && code<=25 || code===37){
                return iconname="#icon-snow";
            }else if(code>=26 && code<=29){
                return iconname="#icon-sandStorm";
            }else if(code>=30 && code<=31){
                return iconname="#icon-wumai";
            }else if(code>=32 && code<=36){
                return iconname="#icon-wind";
            }else if(code===99){
                return iconname="#icon-hello";
            }else{
                return iconname="#icon-hello";;
            }
        }
        $('.template>.weathericon>use').attr("xlink:href",weatherimg(ret.weather[0].now.code))
        function translate(week){
            var  liweek='';
            if(week==="周一"){
                return liweek="Mon"
            }else if(week==="周二"){
                return liweek="Tue"
            }else if(week==="周三"){
                return liweek="Wed"
            }else if(week==="周四"){
                return liweek="Thu"
            }else if(week==="周五"){
                return liweek="Fri"
            }else if(week==="周六"){
                return liweek="Sat"
            }else if(week==="周日"){
                return liweek="Sun"
            }
        }
        
        for(let i=0;i<7;i++){
            // console.log(ret.weather[0].future[i].date)
            var html='';
            html +='<div class="week">'+translate(ret.weather[0].future[i].day)+'</div>';
            html +='<svg class="icon weather" aria-hidden="true"><use xlink:href='+weatherimg(ret.weather[0].future[i].code1)+'></use></svg>';
            html +='<div class="temp">'+ret.weather[0].future[i].low+'℃'+'-'+ret.weather[0].future[i].high+'℃'+'</div>';
            // console.log("拼接"+html)
            $('.weatherdata>ul>li').eq(i).attr("weekday",ret.weather[0].future[i].day);
            $('.weatherdata>ul>li').eq(i).append(html);
        }
        // <div class="week">Mon</div>
        // <svg class="icon weather" aria-hidden="true">
        //     <use xlink:href="#icon-tianqi"></use>
        // </svg>
        // <div class="temp">35℃</div>
        $('.weatherdata>ul>li').each(function(){
            var today=ret.weather[0].future[0].day;
            if($(this).attr('weekday')===today){
                // console.log($(this).attr('weekday'))
                $(this).addClass('today')
            }
            // console.log($(this).eq(0).attr("weekday"))
        })
    }else{
        alert("暂时接收不到天气预报API接口数据！")
    }
}).fail(function(){
    alert("天气预报API所在服务器异常！")
})



//获取到的数据拆解：
/*
{
    "status":"OK",
    "weather":[
        {
            "city_name":"广州",
            "city_id":"CHGD000000",
            "last_update":"2017-08-04T10:50:00+08:00",

            "now":{"text":"多云",
            "code":"4",
            "temperature":"31",
            "feels_like":"31",
            "wind_direction":"东",
            "wind_speed":"9.72",
            "wind_scale":"2",
            "humidity":"78",
            "visibility":"17.90",
            "pressure":"996",
            "pressure_rising":"未知",
            "air_quality":
            {"city":
            {"aqi":"35","pm25":"22","pm10":"35","so2":"18","no2":"39","co":"0.860","o3":"19",
            "last_update":"2017-08-04T09:00:00+08:00",
            "quality":"优"},
            "stations":null},
            "alarms":[]},

            "today":
            {"sunrise":"05:59 AM","sunset":"07:09 PM",
            "suggestion":{"dressing":{"brief":"热","details":"天气热，建议着短裙、短裤、短薄外套、T恤等夏季服装。"},
            "uv":{"brief":"弱","details":"紫外线强度较弱，建议出门前涂擦SPF在12-15之间、PA+的防晒护肤品。"},
            "car_washing":{"brief":"不宜","details":"不宜洗车，未来24小时内有雨，如果在此期间洗车，雨水和路上的泥水可能会再次弄脏您的爱车。"},"travel":{"brief":"一般","details":"天气稍热，有微风，但较强降雨的天气将给您的出行带来很多的不便，若坚持旅行建议带上雨具。"},
            "flu":{"brief":"少发","details":"各项气象条件适宜，发生感冒机率较低。但请避免长期处于空调房间中，以防感冒。"},
            "sport":{"brief":"较不宜","details":"有较强降水，建议您选择在室内进行健身休闲运动。"}}},

            "future":[{
                "date":"2017-08-04","high":"31","low":"25","day":"周五","text":"中雨/雷阵雨","code1":"14","code2":"11","cop":"",
                "wind":"风力2级"},
                {"date":"2017-08-05","high":"32","low":"26","day":"周六","text":"雷阵雨/多云","code1":"11","code2":"4","cop":"",
                "wind":"风力2级"},
                {"date":"2017-08-06","high":"36","low":"26","day":"周日","text":"雷阵雨/多云","code1":"11","code2":"4","cop":"",
                "wind":"风力2级"},
                {"date":"2017-08-07","high":"36","low":"28","day":"周一","text":"多云/多云","code1":"4","code2":"4","cop":"",
                "wind":"风力2级"},
                {"date":"2017-08-08","high":"36","low":"28","day":"周二","text":"多云/雷阵雨","code1":"4","code2":"11","cop":"",
                "wind":"风力2级"},
                {"date":"2017-08-09","high":"35","low":"28","day":"周三","text":"雷阵雨/雷阵雨","code1":"11","code2":"11","cop":"",
                "wind":"风力2级"},
                {"date":"2017-08-10","high":"35","low":"28","day":"周四","text":"雷阵雨/雷阵雨","code1":"11","code2":"11","cop":"",
                "wind":"风力2级"},
                {"date":"2017-08-11","high":"32","low":"28","day":"周五","text":"阴/小雨","code1":"9","code2":"13","cop":"",
                "wind":"风力3级"},
                {"date":"2017-08-12","high":"33","low":"28","day":"周六","text":"小雨/小雨","code1":"13","code2":"13","cop":"",
                "wind":"风力2级"},
                {"date":"2017-08-13","high":"32","low":"28","day":"周日","text":"小雨/小雨","code1":"13","code2":"13","cop":"",
                "wind":"风力2级"}]
        }
    ]
}
*/