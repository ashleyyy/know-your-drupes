$(function() {
  $.getJSON("/things", function(res) {
    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }

    var drupes_and_stuff = res;

    var num = getRandomInt(0, drupes_and_stuff.length);
    var drupe;
    var aggregate;
    var lastDrupe;
    var correct = 0;
    var questions = 0;
    var thisDrupe;

    function updateScore() {
      if (questions > 0) {
        $('#score').text("your score: " + ((correct / questions) * 100).toFixed(0) + "% correct (" + correct + " of " + questions + ")");
      }
    }

    function setDrupe(lastDrupe) {
      //clears previous drupe
      aggregate = null;
      num = getRandomInt(0, drupes_and_stuff.length);
      $('#image').empty();

      //checks to make sure previous drupe isn't the same as the last one
      if (lastDrupe != drupes_and_stuff[num].name) {
        //and sets new drupe
        drupe = drupes_and_stuff[num].drupe;
        aggregate = drupes_and_stuff[num].aggregate;
        thisDrupe = drupes_and_stuff[num].name;
        var image = ("<img src =" + drupes_and_stuff[num].imageUrl + " class='sized'>");
        var title = $("<h2 id='title'>").text(thisDrupe + "?");
        $('#image').append(image).append(title);

      } else {
        // or it picks a new number      
        num = getRandomInt(0, drupes_and_stuff.length);
        setDrupe(lastDrupe);
      }
    }

    function pluralButtons(thisDrupe) {
      if (thisDrupe.slice(-1) == 's') {
        $('#drupe').html('drupes');
        $('#not').html('not drupes');
      } else {
        $('#drupe').html('drupe');
        $('#not').html('not a drupe');
      }
    }

    function newTurn(lastDrupe) {
      setDrupe(lastDrupe);
      updateScore();
      pluralButtons(thisDrupe);
    }

    newTurn();

    $('#drupe').on('click', function() {
      var title = $("#title").text();
      lastDrupe = title.substr(0, title.length - 1);

      if (aggregate) {
        $('#message').html("WRONG!! " + lastDrupe + " are not drupes! <br />" + "They are aggregates of drupelets!");
      } else {
        if (drupe) {
          $('#message').text("CORRECT!!");
          correct++;
        } else {
          if (lastDrupe.slice(-1) == "s") {
            $('#message').text("WRONG!! " + lastDrupe + " are not drupes!");
          } else {
            $('#message').text("WRONG!! " + lastDrupe + " is not a drupe!");
          }
        }
      }
      questions++;

      newTurn(lastDrupe);
    });

    $('#not').on('click', function() {
      var title = $("#title").text();
      lastDrupe = title.substr(0, title.length - 1);

      if (!drupe) {
        $('#message').text("CORRECT!!");
        correct++;
      } else {
        if (lastDrupe.slice(-1) == "s") {
          $('#message').text("WRONG!! " + lastDrupe + " are drupes!");
        } else {
          $('#message').text("WRONG!! " + lastDrupe + " is a drupe!");
        }
      }
      questions++;

      newTurn(lastDrupe);
    });
  });
});