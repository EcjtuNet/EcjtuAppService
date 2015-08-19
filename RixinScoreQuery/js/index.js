/* RixinScoreQuery
 * @author            Phantrax
 * @version           1.0.0
 * @last-time         2015.8.16
 */


$(document).ready(function(){

    // 初始化查询按钮位置
    var initialBtn = setInterval(function () {
        var button = $("#get-score"),
            container = $(".container");
        // console.log(container.width(), button.width());
        var leftRem = (container.width() - button.width())/200 + "rem";
        // console.log(leftRem);
        button.css('left', leftRem);
    }, 16);

    $("#get-score").click(function() {
        var score = $(".student-id-input").val();
        // console.log(tyepof score, score);
        var URLRixin = "http://api.ecjtu.net/score.php",
            URLEcjtu = "http://jwc.ecjtu.jx.cn/mis_o/cj.php?sid=";        
        $.ajax({
            url: URLRixin,
            type: 'GET',
            dataType: 'jsonp',
            data: {s: score},
            success: function (json) {
                // 初始化展示列表
                $("ul.show").empty()
                    .append("<li class='show-left table-head top-border right-border bottom-border'>课程名称</li><li class='show-right table-head top-border bottom-border'>分数</li>");

                // 获取数据并添加元素
                $.each(json, function(i, scoreInfo){
                    // console.log(scoreInfo.Term);
                    if(scoreInfo.Term != 2014.1 ) return true;
                    $("ul.show").append("<li class='show-left table-cell course'>" + scoreInfo.Course + "</li><li class='show-right table-cell course-score'>" + scoreInfo.Score + "</li>");
                    // console.log(scoreInfo);
                });

                // 不及格成绩标记
                $("ul.show").children('li.course-score').each(function() {
                    if ($(this).text() < 60 || $(this).text() == "不及格" || $(this).text() == "不合格") {
                        console.log("X");
                        $(this).css('background', '#f96')
                            .prev().css('background', '#f96');
                    };
                });
            }
        })

    });
})

