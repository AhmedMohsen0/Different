
//function to change background color by id 
function changeBackground(id,color) 
{
   document.getElementById(id).style.background = color;
}
//generating random hexa color number
var randomColor = '#'+(Math.random()*0xFFFFFF<<0).toString(16);

changeBackground('background',randomColor);