function searchMovie() {
  // setiap kita klik movie-listnya kita hilangnya isinya/htmlnya, jadi setiap di klik kosongin dulu baru request
  $("#movie-list").html("");

  $.ajax({
    url: "http://omdbapi.com",
    type: "get",
    dataType: "json",
    data: {
      apikey: "a1f4f476",
      s: $("#search-input").val(), //jquery tolong carikan elemen yang idnya search-input lalu ambil apapun valuenya.
    },
    // jika sukses maka berikan function, data functionnya akan menerima parameter hasilnya
    // jika responnya true maka datanya tampil
    // jika tidak tampil maka akan tampil movie not found
    // jquery tolong carikan saya element movie-list lalu htmlnya/isinya Movie Not Found!
    success: function (result) {
      if (result.Response == "True") {
        let movies = result.Search;

        // array movies akan di looping menggunakan fungsi yang parameternya i=index dan data.
        // jquery tolong carikan #movie-list yang akan di tambahkan (append).
        $.each(movies, function (i, data) {
          $("#movie-list").append(
            `
          <div class="col-md-4 mt-5">
                <div class="card">
                   <img src="` +
              data.Poster +
              `" class="card-img-top" alt="...">
                    <div class="card-body">
                     <h5 class="card-title">` +
              data.Title +
              `</h5>
                     <h6 class="card-subtitle mb-2 text-muted">` +
              data.Year +
              `</h6>
                     <a href="#" class="card-link see-detail" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id="` +
              data.imdbID +
              `">See Detail</a>
                    </div>
                </div>
            </div>
        
            `
          );
        });

        // untuk menghilangkan class setelah mencari movie
        $("#search-input").val("");
      } else {
        $("#movie-list").html(
          `
         <div class="col">
           <h1 class="text-center">` +
            result.Error +
            `</h1>
         </div>
        `
        );
      }
    },
  });
}
$("#search-button").on("click", function () {
  searchMovie();
});

// memberi fungsi ketika tombol enter di klik
// jquery tolong carikan #search-input ketika tombol dilepas jalankan fungsi berikut
// ketika parameter e punya key kode = 13 (bisa pake keyCode/which) enter itu kodenya 13.
// baru kita jalani searchMovie
$("#search-input").on("keyup", function (e) {
  if (e.which === 13) {
    searchMovie();
  }
});

// jquery tolong carikan saya id movie-list lalu ketika saya klik see-detail maka jalankan fungsi berikut ini
// ambil tombol ini lalu ambil datanya yang namanya id

$("#movie-list").on("click", ".see-detail", function () {
  // jquery jalankan ajax
  $.ajax({
    url: "http://omdbapi.com",
    type: "get",
    dataType: "json",
    data: {
      apikey: "a1f4f476",
      i: $(this).data("id"),
    },
    success: function (movie) {
      if (movie.Response === "True") {
        $(".modal-body").html(
          `
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-4">
                        <img src="` +
            movie.Poster +
            `" class="img-fluid">
                        </div>

                        <div class="col-md-8">
                          <ul class="list-group">
                             <li class="list-group-item"><h3>` +
            movie.Title +
            `<h3></li>
                             <li 
                             <li class="list-group-item">Released: ` +
            movie.Released +
            `</li>
                             <li 
                             <li class="list-group-item">Genre: ` +
            movie.Genre +
            `</li>
                             <li 
                             <li 
                             <li class="list-group-item">Director: ` +
            movie.Director +
            `</li>
                             <li 
                             <li 
                             <li class="list-group-item">Actors: ` +
            movie.Actors +
            `</li>
                           </ul>
                        </div>
                    </div>
                </div>
            `
        );
      }
    },
  });
});
