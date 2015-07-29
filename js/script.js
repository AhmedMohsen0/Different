
//function to change background color by id 
function changeBackground(id,color) 
{
   document.getElementById(id).style.background = color;
}
//generating random hexa color number
var randomColor = '#'+(Math.random()*0xFFFFFF<<0).toString(16);

changeBackground('background',randomColor);

var numberOfRow = 2;
function add(n)
{
	numberOfRow = n;
	$('tr').remove();
	for(var i = 0; i < n; i++)
	{
		$('table').append("<tr></tr>");
	}
	for(var i = 0; i < n; i++)
	{
		$('tr').append("<td></td>");
	}
	$('td').css('padding',parseInt( ( ( ( 520-( (2*(n+1))*2 ) )/ (2*n) )  )  +'px') );
}

function LightenDarkenColor(col, amt) {
  
    var usePound = false;
  
    if (col[0] == "#") {
        col = col.slice(1);
        usePound = true;
    }
 
    var num = parseInt(col,16);
 
    var r = (num >> 16) + amt;
 
    if (r > 255) r = 255;
    else if  (r < 0) r = 0;
 
    var b = ((num >> 8) & 0x00FF) + amt;
 
    if (b > 255) b = 255;
    else if  (b < 0) b = 0;
 
    var g = (num & 0x0000FF) + amt;
 
    if (g > 255) g = 255;
    else if (g < 0) g = 0;
 
    return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);
  
}
function changeCells()
{
	$('td').removeClass("different");
	var randomColor = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
	if(randomColor.length < 7)
		randomColor += '0';
	console.log(randomColor);
	$('td').css('background', randomColor);

	var diffCell = parseInt(Math.random()*(numberOfRow*numberOfRow));
	console.log(diffCell);

	var diffColor = LightenDarkenColor(randomColor, 10);
	console.log(diffColor);
	$('td').eq(diffCell).css('background', diffColor);

	$('td').eq(diffCell).addClass("different");

}


add(8);
changeCells();

$(document).ready(function(){
	$('.container').css('display', 'none');
	$('button').hover(function(){
		$(this).css('background', 'white');
		$(this).css('color', randomColor);
	},
	function(){
		$(this).css('background', 'none');
		$(this).css('color', 'white');
	}
	);

	$('button').click(function(){
		$(this).css('display', 'none');
		$('#hint').css('display', 'none');
		$('.container').css('display', 'block');
	});

	$('td').click(function(){
		if ($(this).hasClass("different")) {	
			alert("YES");
			changeCells();
		};
	});
});
