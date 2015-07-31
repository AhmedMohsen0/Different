// GLOBAL VARIABLE
time = 60;
timer = '';
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

function LightenDarkenColor(col, amt) 
{  
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

var rColor;
function changeCells(opacity)
{
	$('td').removeClass("different");
	var randomColor = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
	if(randomColor.length < 7)
		randomColor += '0';
	rColor = randomColor;
	// console.log(randomColor);
	$('td').css('background', randomColor);

	var diffCell = parseInt(Math.random()*(numberOfRow*numberOfRow));
	console.log("different cell: " + diffCell);

	var diffColor = LightenDarkenColor(randomColor, opacity);
	// console.log(diffColor);
	$('td').eq(diffCell).css('background', diffColor);

	$('td').eq(diffCell).addClass("different");
}

var opacity = 50;
add(numberOfRow);
changeCells(opacity);

var score = 0;
var levels = [0, 0, 1, 2, 4, 7, 12, 16, 22, 27, 33];
var opacityLevel = [0, 0, 0, 5, 10, 15, 25, 30, 35, 40, 40];
var i = 2;

$(document).ready(function(){
	// add(numberOfRow);
	$('.container').css('display', 'none');
	$('#result').hide();
	$('#again').css('display', 'none');
	$('#score').html('<p>' + score + '</p>');
	
	$('button').hover(function(){
		$(this).css('background', 'white');
		$(this).css('color', randomColor);
	},
	function(){
		$(this).css('background', 'none');
		$(this).css('color', 'white');
	}
	);

	$('#start').click(function(){
		$(this).css('display', 'none');
		$('#hint').css('display', 'none');
		$('.container').css('display', 'block');

		timer = setInterval(function()
		{
			
			$('#time').html('<p>'+time+'</p>');
			if(time == 0)
			{
				// alert('game over');
				$('.container').fadeOut();
				$('#result').show();
				$('#result').html('Your score' + '<p>' + score + '</p>');
				$('#again').css('display', 'block');
			}
			else{time--;}
		}, 1000);
	});

	jQuery(document).on('click','td',function(){
		if ( $(this).hasClass("different") ) 
		{	
			score += 1;
			// numberOfRow += 1;
			if(score >= levels[i])
				i += 1;
			if(i >= levels.length)
				i = levels.length - 1;
			console.log("i : " + i);
			console.log("score : " +score);
			console.log("opacity : " + (opacity - opacityLevel[i]));
			// alert("YES");
			add(i);	
			changeCells(opacity - opacityLevel[i]);	
			$('#score').html('<p>' + score + '</p>');
		};
	});

	//play again
	jQuery(document).on('click', '#again', function(){
		score = 0;
		time = 60;
		i = 2;
		opacity = 50;

		$('#result').hide();
		$('#again').css('display', 'none');
		randomColor = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
		changeBackground('background', randomColor);
		add(i);
		changeCells(opacity - opacityLevel[i]);
		$('.container').css('display', 'block');
		$('#score').html('<p>' + 0 + '</p>');
	});
});
