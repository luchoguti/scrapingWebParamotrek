$(function () {
    $('#search').on('keyup', function (e) {
        if (e.keyCode === 13) {
            var parameters = { title: $(this).val() };
            $.ajax({
                type: "GET",
                url: '/scraping/findTitle/',
                data: parameters,
                success: function (data) {
                    var htmlDom = htmlDomFilter(data);
                    $('#container').html(htmlDom);
                },
                error: function () {
                    console.log("No se ha podido obtener la información");
                }
            });

        };
    });
});

function htmlDomFilter(arr){
    var htmlDom = '';
    Object.keys(arr).forEach(nameTag => {
        if (arr[nameTag].length > 0) {
            htmlDom += '<div class="row">' +
                '<div class="col-sm-12 alert alert-info" role="alert">' +
                '<h4>' + nameTag + '</h4>' +
                '</div>';
            for (let j = 0; j < arr[nameTag].length; j++) {
                let toursFilter = arr[nameTag][j];
                htmlDom += '<div class="col-sm-4 pb-3">' +
                    '<div class="card">' +
                    '<img class="card-img-top" src="' + toursFilter.img + '" alt="Card image cap">' +
                    '<div class="card-body">' +
                    '<h5 class="card-title">' + toursFilter.title + '</h5>' +
                    '<p class="card-text">' + toursFilter.description + '</p>' +
                    '</div>' +
                    '</div>' +
                    '</div>';
            }
            htmlDom += '</div>';
        }
    });

    if(htmlDom == ''){
        htmlDom += '<div class="row">' +
        '<div class="col-sm-12 alert alert-danger" role="alert">' +
        '<h4>No results try again!</h4>' +
        '</div>';
        htmlDom += '</div>';
    }
    return htmlDom;
}