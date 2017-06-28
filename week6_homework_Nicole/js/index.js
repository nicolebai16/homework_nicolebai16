//Declare & Assign Variables
var dieA = 1;
var dieB = 1;

var target = 7;
var numberOfRolls = 0;
var wins = 0;
var losses = 0;
var balance = 100;
var total = 0

//Handle Events
$('#roll-dice').on('click', function(){

    // Invoke the getRandomNumber function to get a random number
    dieA = getRandomNumber();
    dieB = getRandomNumber();

    // Use the number to set the class of the die which in you can see in the style.css file
    $('#dieA').attr('class', 'dice-' + dieA);
    $('#dieB').attr('class', 'dice-' + dieB);

    // Increment the total number of rolls by 1
    numberOfRolls++;

    //Sum of Rolls (haven't finished yet..)
    var total += dieA + dieB

    // Invoke the checkIfRollIsWinner function to see if 
    var isWinner = checkIfRollIsWinner(dieA, dieB);
    if(isWinner)
    {
        wins++;
    } else {
        losses++;
    }
    console.log(wins, losses);
});


//Check your balance Function
$('#checkBalance').on('click', function(){
    var total = parseInt(dieA + dieB)
    console.log(total);
    if(total===7)
    {
        yourBalance = balance + 10;
        $('#yourBalance').html(yourBalance);
        balance = yourBalance;
    } else {
        yourBalance = balance - 10;
        $('#yourBalance').html(yourBalance); 
        balance = yourBalance;
    }
});

//Sum of Rolls Function
/** Method #1 (didn't work)
function ()
{
    var sumOfRolls = parseInt(dieA + dieB);
    sumOfRolls++;
    console.log(sumOfRolls);
}
**/

/** Method #2 (didn't work)
$('#yourBalance').ready(function(){
    $(".dice-1").blur(function() {
        console.log(total)
    //loop and add up every value from $(".dice-1").val()
    })
});
**/

/** Method #3 **/
/**var sum = dieA + dieB;
function sumOfRolls(){
    console.log(sum);
}
sumOfRolls();
**/


/** !!!!!REFERENCE!!!!!----------------------------------------------
var total = $("#Total").val();
var table = Array();
$("table.quantity tr td:nth-child(1)").each(function (i, v) {
    table[i] = $(this).text();
});

console.log(table);
$('#Quantity').on("input", function () {
    var quantity = this.value;
    var count = 0;

    if (quantity >= 30) {
        $.each(table, function (i, value) {
            if (quantity >= parseInt(value)) {
                count = value;
            };
        });
        console.log(count);
    }
});
$('#select-model').on('change', function(){
    var price = $('option:selected', this).data('price');
    if (total == '') {
        total = 1;
    }
    $("#Total").val(price * total);
});
**/

//Declare Functions
function getRandomNumber()
{
    return Math.floor((Math.random() * 6) + 1);
}

function checkIfRollIsWinner(dieA, dieB)
{
    // See if the total of dieA and dieB equals the target
    if(dieA + dieB === target)
    {
        return true;
    } else {
        return false;
    }





}
