/** RixinChat
 * @author            Phantr4x
 * @version           1.0.0
 * @last-time         2015.11.28
 */


$(document).ready(function() {
	$('div.input-bar').prev('div').css('margin-bottom', '48px');
	// autoTextarea($('.input-area'));
	var mtrlzOptions = [
		{selector: ".wrapper", offset: 0, callback: Materialize.showStaggeredList(".wrapper")}
	];
	Materialize.scrollFire(mtrlzOptions);
	textareaAutoResize($('.input-area'));
})

function autoTextarea (el) {
	el = el || $('textarea');
	// console.log(el)
	el.bind('input propertychange', function(event) {
		event.preventDefault();
		$(this).parent('.input-area-box').height(this.scrollHeight);
		// console.log($(this).height())
		// console.log(this.scrollHeight)
	});
}

var textareaAutoResize = function (element, maxHeight) {
    element = element || $("textarea");
    element.bind('input propertychange', function(event) {
        event.preventDefault();
        var inputContent = $(this).val();
        $(this).siblings('.input-area-pre').text(inputContent);
        $(this).parent('.input-area-box').animate({'height': $('.input-area-pre')[0].scrollHeight}, 300)
    });
}