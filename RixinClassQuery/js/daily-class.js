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
        $('p.class-name').each(function(i) {
            var classStr = obj['content'][weekday][i];
            var ClassStrSliceObj = classStrSlice(classStr);
            if (obj['content'][weekday][i] === " ") {
                $(this).text(" ").addClass('no-class');
            } else {
                $(this).text(ClassStrSliceObj.Name);
                $(this).siblings('ul').children('.class-room').text(ClassStrSliceObj.Room);
                $(this).siblings('ul').children('.class-time').text(ClassStrSliceObj.Time);
                $(this).siblings('ul').children('.class-period').text(ClassStrSliceObj.Period);
                $(this).siblings('ul').children('.class-teacher').text(ClassStrSliceObj.Teacher);
            }
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
