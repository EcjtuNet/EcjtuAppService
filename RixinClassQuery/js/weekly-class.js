/* RixinClassQuery
 * @author            Phantrax
 * @version           1.0.0
 * @last-time         2015.8.20
 */


$(document).ready(function(){
    var date = new Date(),
        weekday;
    date.getDay() === 0 ? weekday = 7: weekday = date.getDay();
    // console.log(date, weekday);
    var id = 20132110010101;
    

    $(".month").text(date.getMonth());
    $(".day").text(date.getDate());

    $.ajax({
        url: 'http://api.ecjtu.net/api.php',
        type: 'GET',
        dataType: 'jsonp',
        data: {classID: id},
    })
    .success(function (obj) {
        for (var i = 1; i <= 7; i++) {
            $(".weekday").eq(i-1).children('.weekday-class').each(function(j) {
                if (!obj['content'][i][j]) return false;
                var classStr = obj['content'][i][j];
                // console.log(classStr);
                var ClassStrSliceObj = classStrSlice(classStr);
                if (obj['content'][i][j] === " ") {
                    $(this).text("");
                } else {
                    $(this).text(ClassStrSliceObj.Name + "@" + ClassStrSliceObj.Room);
                }
            });
        };
        $(".weekday-class").each(function(i) {
            $(this).css('background', randomColor());
        });
    })  
})

function classStrSlice (str) {
    var ClassStrSliceObj = {
        Name: "",
        Teacher: "",
        Room: "",
        Period: "",
        Time: "",
    }
    var count = 0;
    for (var i = 0; i < str.length; i++) {
        // console.log(str.charAt(i))
        if (str.charAt(i) == " " || str.charAt(i) == "\n") {
            count++;
            continue;
        }
        switch (count) {
            case 1:
                ClassStrSliceObj.Name += str.charAt(i);
                break;
            case 2:
                ClassStrSliceObj.Teacher += str.charAt(i);
                break;
            case 3:
                ClassStrSliceObj.Room += str.charAt(i);
                break;
            case 4:
                ClassStrSliceObj.Period += str.charAt(i);
                break;
            case 5:
                ClassStrSliceObj.Time += str.charAt(i);
        }
    };
    return ClassStrSliceObj;
}

function randomColor () {
    var palette = [["#D32F2F","#F44336","#FFCDD2"],["#C2185B","#E91E63","#F8BBD0"],["#7B1FA2","#9C27B0","#E1BEE7"],["#512DA8","#673AB7","#D1C4E9"],["#303F9F","#3F51B5","#C5CAE9"],["#1976D2","#2196F3","#BBDEFB"],["#0288D1","#03A9F4","#B3E5FC"],["#0097A7","#00BCD4","#B2EBF2"],["#00796B","#009688","#B2DFDB"],["#388E3C","#4CAF50","#C8E6C9"],["#689F38","#8BC34A","#DCEDC8"],["#AFB42B","#CDDC39","#F0F4C3"],["#FBC02D","#FFEB3B","#FFF9C4"],["#FFA000","#FFC107","#FFECB3"],["#F57C00","#FF9800","#FFE0B2"],["#E64A19","#FF5722","#FFCCBC"]];
    console.log(palette.length);
    var color = palette[Math.floor(Math.random()*1000)%palette.length],
        lightPrimaryColor = color[2];
    return lightPrimaryColor;
}
