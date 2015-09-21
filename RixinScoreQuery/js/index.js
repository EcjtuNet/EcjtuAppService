/* RixinScoreQuery
 * @author            Phantrax
 * @version           1.0.0
 * @last-time         2015.8.16
 */


$(document).ready(function(){

    var TermList = [
        ["2012-2013学年 第一学期", 2012.1],
        ["2012-2013学年 第二学期", 2012.2],
        ["2013-2014学年 第一学期", 2013.1],
        ["2013-2014学年 第二学期", 2013.2],
        ["2014-2015学年 第一学期", 2014.1],
        ["2014-2015学年 第二学期", 2014.2],
        ["2015-2016学年 第一学期", 2015.1],
        ["2015-2016学年 第二学期", 2015.2],
    ]

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
        // var score = $(".student-id-input").val(),
        var score = window.interface.getStudentId(); // 获取学号
        var term = $(".select_showbox").text(); // 获取学期
            // console.log(term);
        var temp;
        for (var i = 0; i < TermList.length; i++) {
            if (TermList[i][0] == term) {
                temp = TermList[i][1];
                // console.log(temp);
            };
        };
        // console.log(term);
        // console.log(tyepof score, score);
        var URLRixin = "http://api.ecjtu.net/score.php", // 日新API
            URLEcjtu = "http://jwc.ecjtu.jx.cn/mis_o/cj.php?sid="; // 学校API
        $.ajax({
            url: URLRixin,
            type: 'GET',
            dataType: 'jsonp',
            data: {s: score},
            success: function (json) {
                // 初始化展示列表
                var count = 0;
                $("ul.show").empty()
                    .append("<li class='show-left table-head top-border right-border bottom-border'>课程名称</li><li class='show-right table-head top-border bottom-border'>分数</li>");

                // 获取数据并添加元素
                $.each(json, function(i, scoreInfo){

                    // console.log(scoreInfo.Term);
                    if(scoreInfo.Term == temp ) {
                        // console.log(scoreInfo.Name);
                        $("input.name-input").val(scoreInfo.Name)
                        $("ul.show").append("<li class='show-left table-cell course'>" + scoreInfo.Course + "</li><li class='show-right table-cell course-score'>" + scoreInfo.Score + "</li>");
                        count ++;
                    }
                });

                if (count == 0) {
                    $("ul.show").empty()
                        .append("<p class='empty'> 没有查到成绩咕OuO~ </p>");
                };

                // 不及格成绩标记
                $("ul.show").children('li.course-score').each(function() {
                    if ($(this).text() < 60 || $(this).text() == "不及格" || $(this).text() == "不合格") {
                        // console.log("X");
                        $(this).css('background', '#f96')
                            .prev().css('background', '#f96');
                    };
                });
            }
        })

    });
})
