$(function () {
    $.ajax({
        type: 'GET',
        url: HOST_NAME + 'api/chairs',
        processData: false,
        dataType: 'json',
        success: data => {
            let i = 0;
            data.forEach((product) => {
                i++;
                $('.chairs').prepend("<div class=\"chair\">" +
                    "        <span class=\"title\">" + product.name + "</span>" +
                    "        <div class=\"col-md-4 imgdiv\">" +
                    "            <img src=" + product.pictureURL + "/>" +
                    "            <div class=\"form-group col-md-6\">" +
                    "                <input onkeypress='saveChair(event)' type='text' id='" + product.id + "-Picture' class='form-control' required value='" + product.pictureURL + "'>" +
                    "                <label class=\"form-control-placeholder\" for='" + product.id + "-Picture'>PictureURL</label>" +
                    "            </div>" +
                    "<br><br><br><br><br><span><button onclick='deleteChair(event)' class='btn btn-danger' id='" + product.id + "-Delete'>Delete</button></span><br>" +
                    "        </div>" +
                    "        <div class=\"col-md-8 inputs\">\n" +
                    "            <form>\n" +
                    "                <div class=\"form-group col-md-3\">\n" +
                    "                    <input onkeypress='saveChair(event)' type=\"text\" id='" + product.id + "-Name' class=\"form-control\" required value='" + product.name + "'>\n" +
                    "                    <label class=\"form-control-placeholder\" for='" + product.id + "-Name'>Name</label>\n" +
                    "                </div>\n" +
                    "                <div class=\"form-group col-md-3\">\n" +
                    "                    <input onkeypress='saveChair(event)' type=\"text\" id='" + product.id + "-Pris' class=\"form-control\" required value='" + product.price + "'>\n" +
                    "                    <label class=\"form-control-placeholder\" for='" + product.id + "-Pris'>Pris</label>\n" +
                    "                </div>\n" +
                    "                <div class=\"form-group col-md-3\">\n" +
                    "                    <input onkeypress='saveChair(event)' type=\"text\" id='" + product.id + "-Farver' class=\"form-control\" required value='" + getColors(product.chairColors) + "'>\n" +
                    "                    <label class=\"form-control-placeholder\" for='" + product.id + "-Farver'>Farver</label>\n" +
                    "                </div>\n" +
                    "                <div class=\"form-group col-md-3\">\n" +
                    "                    <input onkeypress='saveChair(event)' type=\"text\" id='" + product.id + "-Maker' class=\"form-control\" required value='" + product.maker.name + "'>\n" +
                    "                    <label class=\"form-control-placeholder\" for='" + product.id + "-Maker'>Maker</label>\n" +
                    "                </div>\n" +
                    "                <div class=\"form-group col-md-3\">\n" +
                    "                    <input onkeypress='saveChair(event)' type=\"text\" id='" + product.id + "-DesignerFirstName' class=\"form-control\" required value='" + product.designer.firstName + "'>\n" +
                    "                    <label class=\"form-control-placeholder\" for='" + product.id + "-DesignerFirstName'>Designer Fornavn</label>\n" +
                    "                </div>\n" +
                    "                <div class=\"form-group col-md-3\">\n" +
                    "                    <input onkeypress='saveChair(event)' type=\"text\" id='" + product.id + "-DesignerLastName' class=\"form-control\" required value='" + product.designer.lastName + "'>\n" +
                    "                    <label class=\"form-control-placeholder\" for='" + product.id + "-DesignerLastName'>Designer Efternavn</label>\n" +
                    "                </div>\n" +
                    "                <div class=\"form-group col-md-3\">\n" +
                    "                    <input onkeypress='saveChair(event)' type=\"text\" id='" + product.id + "-DesignerCountry' class=\"form-control\" required value='" + product.designer.countryOfOrigin + "'>\n" +
                    "                    <label class=\"form-control-placeholder\" for='" + product.id + "-DesignerCountry'>Designer Fædreland</label>\n" +
                    "                </div>\n" +
                    "                <div class=\"form-group col-md-3\">\n" +
                    "                    <input onkeypress='saveChair(event)' type=\"text\" id='" + product.id + "-Tags' class=\"form-control\" required value='" + getTags(product.chairTags) + "'>\n" +
                    "                    <label class=\"form-control-placeholder\" for='" + product.id + "-Tags'>Tags</label>\n" +
                    "                </div>\n" +
                    "\n" +
                    "                <br>\n" +
                    "                <div class=\"form-group col-md-3\">\n" +
                    "                    <textarea onkeypress='saveChair(event)' cols=\"98\" rows=\"15\" class=\"form-control textareaInput\" id='" + product.id + "-Desc' required>" + product.description + "</textarea>\n" +
                    "                    <label class=\"form-control-placeholder textareaLbl\" for='" + product.id + "-Desc'>Beskrivelse</label>\n" +
                    "                </div>\n" +
                    "\n" +
                    "            </form>\n" +
                    "        </div>\n" +
                    "    </div>\n");
            });
        }
    });
    $('#createForm').on('submit', (e) => {
        e.preventDefault();
        createChair();
    });
});

function saveChair(event) {
    if (event.keyCode === 13) {
        let id = event.path[0].id.split("-")[0];
        let pictureURL = $('#' + id + "-Picture")[0].value;
        let name = $('#' + id + "-Name")[0].value;
        let price = $('#' + id + "-Pris")[0].value;
        let colors = $('#' + id + "-Farver")[0].value;
        let maker = $('#' + id + "-Maker")[0].value;
        let designerFirstName = $('#' + id + "-DesignerFirstName")[0].value;
        let designerLastName = $('#' + id + "-DesignerLastName")[0].value;
        let designerCountry = $('#' + id + "-DesignerCountry")[0].value;
        let tags = $('#' + id + "-Tags")[0].value;
        let description = $('#' + id + "-Desc")[0].value;
        let json = JSON.stringify({
            "name": name,
            "price": parseFloat(price),
            "chairColors": splitColors(colors),
            "maker": {name: maker},
            "designer": {
                "firstName": designerFirstName,
                "lastName": designerLastName,
                "countryOfOrigin": designerCountry
            },
            "chairTags": splitTags(tags),
            "description": description,
            "pictureURL": pictureURL
        });
        console.log(json);
        $.ajax({
            type: 'PUT',
            url: HOST_NAME + 'api/chairs/' + id,
            contentType: 'application/json',
            processData: false,
            data: json,
            success: res => {
                console.log(res);
            },
            error: (jqXHR, textStatus, errorThrown) => {
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
            }
        });
    }
}


function createChair() {
    let pictureURL = $('#newPicture')[0].value;
    let name = $('#newName')[0].value;
    let price = $('#newPris')[0].value;
    let colors = $('#newFarver')[0].value;
    let maker = $('#newMaker')[0].value;
    let designerFirstName = $('#newDesignerFirstName')[0].value;
    let designerLastName = $('#newDesignerLastName')[0].value;
    let designerCountry = $('#newDesignerCountry')[0].value;
    let tags = $('#newTags')[0].value;
    let description = $('#newDesc')[0].value;
    let json = JSON.stringify({
        "name": name,
        "price": parseFloat(price),
        "chairColors": splitColors(colors),
        "maker": {name: maker},
        "designer": {
            "firstName": designerFirstName,
            "lastName": designerLastName,
            "countryOfOrigin": designerCountry
        },
        "chairTags": splitTags(tags),
        "description": description,
        "pictureURL": pictureURL
    });
    console.log(json);
    $.ajax({
        type: "POST",
        url: HOST_NAME + 'api/chairs',
        contentType: 'application/json',
        data: json,
        success: res => {
            console.log(res);
        },
        error: (jqXHR, textStatus, errorThrown) => {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}

function deleteChair(event) {
    let id = event.path[0].id.split("-")[0];
    $.ajax({
        type: "DELETE",
        url: HOST_NAME + 'api/chairs/' + id,
        success: data => {
            console.log(data);
        }
    });
}

function splitTags(tags) {
    let tagsArr = tags.split(',');
    let tagsList = [];
    for (let tag of tagsArr) {
        tagsList.push({tag: {name: tag}});
    }
    return tagsList;
}

function splitColors(colors) {
    let colorsArr = colors.split(',');
    let colorList = [];
    for (let color of colorsArr) {
        colorList.push({color: {name: color}});
    }
    return colorList;
}

function getTags(tags) {
    let tagsStr = "";
    for (let tag of tags) {
        if (tag === tags[tags.length - 1]) {
            tagsStr += tag.tag.name;
        } else {
            tagsStr += tag.tag.name + ',';
        }
    }
    return tagsStr;
}

function getColors(colors) {
    let colorStr = "";
    for (let color of colors) {
        if (color === colors[colors.length - 1]) {
            colorStr += color.color.name;
        } else {
            colorStr += color.color.name + ',';
        }
    }
    return colorStr;
}