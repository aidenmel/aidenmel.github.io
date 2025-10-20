// This is a small program. There are only two sections. This first section is what runs
// as soon as the page loads.
$(document).ready(function () {
  render($("#display"), image);
  $("#apply").on("click", applyAndRender);
  $("#reset").on("click", resetAndRender);
});

/////////////////////////////////////////////////////////
//////// event handler functions are below here /////////
/////////////////////////////////////////////////////////

// this function resets the image to its original value; do not change this function
function resetAndRender() {
  reset();
  render($("#display"), image);
}

// this function applies the filters to the image and is where you should call
// all of your apply functions
function applyAndRender() {
  // Multiple TODOs: Call your apply function(s) here
  applyFilter(decreaseBlue);
  

  // do not change the below line of code
  render($("#display"), image);
}

/////////////////////////////////////////////////////////
// "apply" and "filter" functions should go below here //
/////////////////////////////////////////////////////////

// TODO 1, 2, 3 & 5: Create the applyFilter function here
function applyFilter(filterFunction){
  for (let row = 0; row < image.length; row++){

    for (let item = 0; item < image[row].length; item++){
      var pixel = image[row][item];
      var pixelArray = rgbStringToArray(pixel);

      // This is where I'll modify the color values later
      applyFilterNoBackground(pixelArray, filterFunction)

      // Update colors
      var updatedPixel = rgbArrayToString(pixelArray);
      image[row][item] = updatedPixel;
    }

  }
}

// TODO 9 Create the applyFilterNoBackground function
function applyFilterNoBackground(pixelArray, filterFunction){
  var backgroundColor = rgbStringToArray(image[0][0]);
  console.log(pixelArray, backgroundColor, (pixelArray === backgroundColor))
  if (pixelArray !== backgroundColor){

    filterFunction(pixelArray);
  }  
}

// TODO 6: Create the keepInBounds function
function keepInBounds(num){
  return num < 0 ? num = 0 : num > 255 ? num = 255 : num 
}

// TODO 4: Create reddify filter function
function reddify(pixelArray){
  pixelArray[RED] = 200;
}

// TODO 7 & 8: Create more filter functions
function decreaseBlue(pixelArray){
  pixelArray[BLUE] = keepInBounds(pixelArray[2] - 50);
}

function increaseGreenByBlue(pixelArray){
  pixelArray[GREEN] = pixelArray[BLUE];
  keepInBounds(pixelArray[GREEN]);
}

// CHALLENGE code goes below here
$("#reset").on('click', reset)