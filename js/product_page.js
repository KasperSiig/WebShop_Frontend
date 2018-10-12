$(function () {
   $.ajax({
       type: 'GET',
       url: HOST_NAME + 'api/chairs/' + getUrlParameter('id'),
       dataType: 'json',
       processData: false,
       success: product => {
           console.log(product);
           $('.div__info').append("<img class='product__img ' src=" + product.pictureURL + "/>" +
               "<span class='name__styled'>" + product.name + "</span>" +
           "<br><br><br>" +
           "<span class='name__italized'>" + product.name + "</span>" +
           " - " +
           "<span class='designername'>" + product.designer.firstName + ' ' + product.designer.lastName + "</span>" +
           "<br><br>" +
           "<span class='price__label'>Pris</span>&nbsp;<span class='price__number'>" + product.price + " kroner</span>" +
           "<br><br>" +
           "<span class='desc'>" + product.description + "</span>")
       }
   })
});

function getUrlParameter(sParam) {
    let sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
}