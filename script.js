console.log(moment)

function dealWithResponse(response) {
  console.log(response)
  let poster = response.Poster
  let title = response.Title
  let year = response.Year
  let actors = response.Actors
  let rating = response.Ratings[0].Value
  let plot = response.Plot

  $("#poster").attr("src", poster)
  $("#title").text("Title: " + title)
  $("#year").text("Year: " + year)
  $("#cast").text("Cast: " + actors)
  $("#rating").text("IMDB Rating : " + rating)
  $("#plot").text("Plot : " + plot)
}

$("#search").on("click", function(event) {
  event.preventDefault()

  let movie = $("#movie-input").val()
  let queryURL = "https://www.omdbapi.com/?t=" + movie + "&apikey=982d108e"

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(dealWithResponse)
})

function dealWithTV(response) {
  console.log(response)
  $("#tv-poster").attr("src", response.Poster)
  $("#tv-year").text("Year(s): " + response.Year)
  $("#tv-cast").text("Cast: " + response.Actors)
  $("#tv-rating").text("IMDB Rating " + response.Ratings[0].Value)
  $("#tv-plot").text("Plot: " + response.Plot)
}

$("#tv-search").on("click", function(event) {
  event.preventDefault()
 $("#season-input").val('')
 $("#tv-episodes").empty()
 $("#season-number").empty()
  let show = $("#tv-input").val()
  let seasonNumber = $("#season-input").val()
 $("#seasonSearch").show()

  let tvURL =
    "https://www.omdbapi.com/?t=" +
    show +
    "&Season=" +
    seasonNumber +
    "&apikey=982d108e"

  $.ajax({
    url: tvURL,
    method: "GET",
  }).then(dealWithTV)
})

function dealWithSeason(response) {
  console.log(response)
  $("#season-number").text("Season: " + response.Season)

  for (let i = 0; i < response.Episodes.length; i++) {
    let counter = 0
    console.log(response.Episodes[i].Title)
    counter = counter + i + 1
    console.log(counter)
    let episodeTitle = response.Episodes[i].Title
    let releaseDate = response.Episodes[i].Released 
    let momentReleaseDate = moment(releaseDate) 
    let formattedDate = momentReleaseDate.format('MMMM Do YYYY')

    $("#tv-episodes").append(
      "<p><b> Episode " +
        counter +
        ": </b>" +
        episodeTitle +
        "<br>" +
        "Air Date : " +
        formattedDate +
        "</p>"
    )
  }
}



$("#season-search").on("click", function(event) {

  event.preventDefault()
  $("#tv-episodes").empty()
  

  let show = $("#tv-input").val()
  let seasonNumber = $("#season-input").val()

  let tvURL =
    "https://www.omdbapi.com/?t=" +
    show +
    "&Season=" +
    seasonNumber +
    "&apikey=982d108e"

  $.ajax({
    url: tvURL,
    method: "GET",
  }).then(dealWithSeason)
})
