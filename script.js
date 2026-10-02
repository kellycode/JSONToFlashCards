

var cards = [];
var headers = [];
var currentCard = 0;
var selectedCard = -1;

window.displayDescription = false


$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: "refrigerant_table.json",
        dataType: "json",
        success: function(data) {processData(data);}
     });
});

$(document).on("keydown click", function (e) {
    if (e.key === 'ArrowLeft') {
        console.log("Left arrow pressed");
        if(selectedCard > 0) {
            selectedCard -= 1;
        }
        displayCard(selectedCard);
        showDescription();
        e.preventDefault();
        return;
    }

    if (e.key === 'ArrowRight') {
        console.log("Right arrow pressed");
        if(selectedCard < cards.length - 1) {
            selectedCard += 1;
        }
        displayCard(selectedCard);
        showDescription();
        e.preventDefault();
        return;
    }

    if(window.displayDescription){
        newCard()
    }else{
        showDescription()
    }
    
    window.displayDescription = !window.displayDescription

    console.log("you clicked once")
});

function processData(jsonData) {
    headers = Object.keys(jsonData[0])
    for (const row of jsonData) {
        cards.push(headers.map(h => String(row[h] ?? '').replace(/\r?\n/g, '<br/>')));
    }
     console.log(cards)   
}


function showDescription(){
    $(answer).css('max-height',  '300px')
}


function newCard(){
    $(answer).css('max-height',  '0px')
    $("#card").fadeToggle(100,function(){
        setTimeout(function(){
            displayCard(getNextCard())
        },100);
        $("#card").fadeToggle(100);
    });
    
}

function displayCard(index) {
    $("#question").html(cards[index][getType("Refrigerant")]+ '?')

    let r_name = cards[index][getType("Common Name / Application")];
    let r_type = cards[index][getType("Type")];
    let r_safety = cards[index][getType("ASHRAE Safety Class")];
    let r_gwp = cards[index][getType("GWP")];
    let r_odp = cards[index][getType("ODP")];

    let r_answer = r_name + " - " + r_type + " - " + r_safety + " - GWP: " + r_gwp + " - ODP: " + r_odp;

    $("#answer").html(r_answer)
}

function getNextCard() {
    if(selectedCard === cards.length-1)
    {
        selectedCard = 0;
    }
    else
    {
        selectedCard += 1;
    }

    return selectedCard
}

function getType(type) {
    for (let i = 0; i < headers.length; i++) {
        if(headers[i]==type){
            return i
        }
    }
    return null
}


  window.onload = function() {
    this.newCard()
  };