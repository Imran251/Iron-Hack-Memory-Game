$(document).ready(function(){
$(".game-over").hide();
$(".start-game").hide();

var checkArray = []; // checking if both clicked fields are the same picture
var idCheck = []; // helper array for storing clicked fields IDs so i can remove "flipped" class if they are different
var counter = 30;
var endGame = 0; // for detecting if all fields are done
var fields = document.querySelectorAll(".back");

var natureSound = new Audio("84322__splashdust__flipcard");
var spark = new Audio("84322__splashdust__flipcard");
var win = new Audio("84322__splashdust__flipcard");


var images = [
  "images/Test1.png",
  "images/Test2.png",
  "images/Test3.png",
  "images/Test4.png",
  "images/Test5.png",
  "images/Test6.png",
  "images/Test7.png",
  "images/Test8.png",
  "images/Test9.png",
  "images/Test10.png",
  "images/Test11.png",
  "images/Test12.png",
  "images/Test1.png",
  "images/Test2.png",
  "images/Test3.png",
  "images/Test4.png",
  "images/Test5.png",
  "images/Test6.png",
  "images/Test7.png",
  "images/Test8.png",
  "images/Test9.png",
  "images/Test10.png",
  "images/Test11.png",
  "images/Test12.png"
];


function clicked() { // clicked function so i can unbind click event
	if ($(this).find(".inner-wrap").hasClass("flipped")) {
		return;
	}
	$(this).find(".inner-wrap").toggleClass("flipped");
	checkArray.push($(this).find("img").attr("src"));
	idCheck.push($(this).attr("id"));
	check();
}
$(".field").on("click", clicked);


function restart() {
	$(".back").find("img").remove(); //remove all current images from the field
	$(".field .inner-wrap").removeClass("flipped"); // remove flipped class so they can flip back again at the starting position
	checkArray = []; // empty check array
	idCheck = []; // empty IDs check array
	counter = 30; // reset counter
	endGame = 0; // reset ending variable
	startGame();
}

//Ends game by calling the restart function.
function endTheGame(){
  win.play();
  $('.game-over').show();
  restart();
}

$(".play-again").click(function () {
  $(".game-over").hide();
});


function shuffleArray(array) { // shuffle array with images
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

$(".start").click(function () {
  $(".start").hide();
});

$(".start-game").show();
function startGame() {
  natureSound.play();
  var arr = shuffleArray(images); // stores the array of shuffled images
  for (var i = 0; i < fields.length; i++) { // appending those images to the div with class "back"
	 var img = document.createElement("img");
		img.src = arr[i];
		fields[i].appendChild(img);
	}
}


function check() {
	if (checkArray.length === 2) { // if fields are clicked 2 times we are doing check
		$(".field").off("click", clicked); // disabling click event to prevent shift
		setTimeout(function(){
			if (checkArray[0] !== checkArray[1]) { // if there is  no match
				$("#" + idCheck[0]).find(".inner-wrap").removeClass("flipped"); // flip the field back
				$("#" + idCheck[1]).find(".inner-wrap").removeClass("flipped"); // second one flip back as well
				counter--;
        if (counter === 0){
          endTheGame();
        }
        checkArray = []; //empty checking array for the next 2 clicks
				idCheck = []; // same with this one
				$(".field").on("click", clicked); // bind the click back again
        } else {
        spark.play();
				counter--;
				endGame += 2; // if there is a match "endGame" is raised by 2 as 2 fields are uncovered
				idCheck = [];// empty array for the next try
        checkArray = [];//this one as well
        if(endGame === 24){
        endTheGame(); // check if game has ended
        }
        $(".field").on("click", clicked); // bind click again
			}
			document.querySelector(".counter").innerHTML = counter;
		}, 850);
	}
}

startGame();

});
