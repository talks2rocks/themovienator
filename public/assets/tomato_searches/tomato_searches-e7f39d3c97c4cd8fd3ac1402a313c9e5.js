(function() {
  var logResponse, makeForm, nextMovie;

  makeForm = function(json) {
    var $numOfMovies, movie, _i, _len, _results;
    $numOfMovies = json.length;
    $('div#form').html("");
    $('<p>' + $numOfMovies + ' results!</p>').appendTo('div#form');
    _results = [];
    for (_i = 0, _len = json.length; _i < _len; _i++) {
      movie = json[_i];
      _results.push((function() {
        var $form, $rt_id, $thumbnail, $title, $year;
        $title = movie["table"]["title"];
        $year = movie["table"]["year"];
        $rt_id = movie["table"]["id"];
        $thumbnail = movie['table']['posters']['table']['thumbnail'];
        $form = $('<form action = "../addmovie" method="POST" class="save_movie"></form>');
        $form.append('' + _i + '<input type="text" size="45" name="title" value= "' + $title + '">');
        $form.append('<input type="text" name="year" value= "' + $year + '">');
        $form.append('<input type="hidden" name="rt_id" value= "' + $rt_id + '">');
        $form.append('<input type="hidden" name="rt_id" value= "' + $rt_id + '">');
        $form.append('<input class="submit" type="submit" value="Add to movie DB" />');
        $form.append('<hr/>');
        return $form.appendTo('div#form');
      })());
    }
    return _results;
  };

  logResponse = function(response) {
    return console.log(response);
  };

  nextMovie = function() {
    $.ajax({
      url: "/nextsearchedmovie",
      data: "next",
      dataType: "JSON",
      type: "post"
    }).success(function(json) {
      return makeForm(json);
    });
    return false;
  };

  jQuery(function() {
    $("form#search").submit(function() {
      var valuesToSubmit;
      valuesToSubmit = $(this).serialize();
      $.ajax({
        url: $(this).attr("action"),
        data: valuesToSubmit,
        dataType: "JSON",
        type: "post"
      }).success(function(json) {
        return makeForm(json);
      });
      return false;
    });
    $("div#form").on("submit", "form.save_movie", function() {
      var valuesToSubmit;
      valuesToSubmit = $(this).serialize();
      $.ajax({
        url: $(this).attr("action"),
        data: valuesToSubmit,
        dataType: "JSON",
        type: "post"
      }).success(function(json) {
        logResponse(json);
        return nextMovie();
      }).error(function(jqXHR, textStatus, errorThrown) {
        return logResponse([jqXHR, textStatus, errorThrown]);
      });
      return false;
    });
  });

}).call(this);
