(function() {
  jQuery(function() {
    var $numOfMovies, movie, _i, _len, _ref, _results;
    $numOfMovies = gon.movies.length;
    $('<p>' + $numOfMovies + ' results!</p>').appendTo('div#form');
    _ref = gon.movies;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      movie = _ref[_i];
      _results.push((function() {
        var $form, $rt_id, $thumbnail, $title, $year;
        $title = movie["table"]["title"];
        $year = movie["table"]["year"];
        $rt_id = movie["table"]["id"];
        $thumbnail = movie['table']['posters']['table']['thumbnail'];
        $form = $('<form action = "../addmovie" method="POST"></form>');
        $form.append('' + _i + '<input type="text" size="45" name="title" value= "' + $title + '">');
        $form.append('<input type="text" name="year" value= "' + $year + '">');
        $form.append('<input type="hidden" name="rt_id" value= "' + $rt_id + '">');
        $form.append('<input type="hidden" name="rt_id" value= "' + $rt_id + '">');
        $form.append('<input type="submit" value="Add to movie DB" />');
        $form.append('<hr/>');
        return $form.appendTo('div#form');
      })());
    }
    return _results;
  });

}).call(this);
