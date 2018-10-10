$(function () {
    loadProducts();
    setFilters();
    // $(".subMenu").on('click', function () {
    //     console.log("hello");
    // });

    $(".subMenu").on('click', 'input', function () {
        let boxes = $('input:checked');

        let tags = '&tags=';
        let designers = '&designers=';
        let colors = '&colors=';
        let makers = '&makers=';

        for (let box of boxes) {
            switch (box.name) {
                case 'tag':
                    tags += box.value + ',';
                    break;
                case 'designer':
                    designers += box.value + ',';
                    break;
                case 'maker':
                    makers += box.value + ',';
                    break;
                case 'color':
                    colors += box.value + ',';
                    break;
            }
        }
        loadProducts(tags + designers + colors + makers);
    });
});

$(window).scroll(function () {
    setScrollBar();
});

function loadProducts(searchTerm = "") {
    $.ajax({
        type: 'GET',
        url: HOST_NAME + 'api/chairs?' + searchTerm,
        processData: false,
        dataType: 'json',
        success: (data) => {
            let i = 0;
            let productTable = $('.productTable');
            productTable.empty();
            data.forEach((product) => {
                if (i % 2 === 0) {
                    productTable.append("</tr><tr>");
                }
                productTable.append("<td><td class=\"chair\">\n" +
                    "<img src=" + product.pictureURL + "/>\n" +
                    "<br>\n" +
                    "<span class=\"chair__title\">" + product.name + "</span>\n" +
                    "<br>\n" +
                    "<span class=\"chair__designer\">" + product.designer.firstName + " " + product.designer.lastName + "</span>\n" +
                    "</td></td>");
                i++;

            })
        }
    });
    setScrollBar();
}

function setFilters() {
    $.ajax({
        type: 'GET',
        url: HOST_NAME + 'api/filters',
        processData: false,
        dataType: 'json',
        success: (data) => {
            console.log(data);
            data.tags.forEach(tag => {
                $("#tagsSubMenu").append("<li>" +
                    "<input type='checkbox' class='form-check-input' id='#" + convertToSlug(tag.name) + "' name='tag' value='" + tag.name + "'>" +
                    "<label class='form-check-label check' for='#" + convertToSlug(tag.name) + "'>" + tag.name + "</label>" +
                    "</li>");
            });
            data.designers.forEach(designer => {
                $("#designerSubMenu").append("<li>" +
                    "<input type='checkbox' class='form-check-input' id='#" + convertToSlug(designer.firstName + " " + designer.lastName) + "' name='designer' value='" + designer.firstName + " " + designer.lastName + "'>" +
                    "<label class='form-check-label' for='#" + convertToSlug(designer.firstName + " " + designer.lastName) + "'>" + designer.firstName + " " + designer.lastName + "</label>" +
                    "</li>");
            });
            data.makers.forEach(maker => {
                $("#makerSubMenu").append("<li>" +
                    "<input type='checkbox' class='form-check-input' id='#" + convertToSlug(maker.name) + "' name='maker' value='" + maker.name + "'>" +
                    "<label class='form-check-label' for='#" + convertToSlug(maker.name) + "'>" + maker.name + "</label>" +
                    "</li>");
            });
            data.colors.forEach(color => {
                $("#farveSubMenu").append("<li>" +
                    "<input type='checkbox' class='form-check-input' id='#" + convertToSlug(color.name) + "' name='color' value='" + color.name + "'>" +
                    "<label class='form-check-label' for='#" + convertToSlug(color.name) + "'>" + color.name + "</label>" +
                    "</li>");
            });


        }
    })
}

function setScrollBar() {
    const scrollPercent = 100 * $(window).scrollTop() / ($(document).height() - $(window).height());
    const pos = ($(window).height() - 135) * scrollPercent / 100 + 80;
    $(".scrollbar__img").css({top: pos});
}

function convertToSlug(Text)
{
    return Text
        .toLowerCase()
        .replace(/ /g,'-')
        .replace(/[^\w-]+/g,'')
        ;
}