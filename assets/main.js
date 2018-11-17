var instance, dpick = $('.datepicker');
$(document).ready(function () {
    dpick.datepicker();
    instance = M.Datepicker.getInstance(dpick.get(0));
    instance.setDate(new Date());
    instance.open();
});

var addBtn = $('#add'),
    gdate = $('#gdate'),
    todoc = $('#todoc'),
    tcelem = $('#todoColls').get(0);
gdate.get(0).innerHTML = ": Choose a Date to get list";
dpick.change(function () {
    gdate.get(0).innerHTML = "on " + instance.el.value;
    getColls();
});
addBtn.click(function () {
    var instval = instance.el.value;
    var tcval = todoc.get(0).value.trim();
    if (instval === "") {
        instance.open();
        alert("Choose a date first!");
    } else if (tcval === "") {
        alert("Todo content should be empty");
        todoc.get(0).focus();
    } else {
        addC(instval, tcval);
    }
});
todoc.click(function () {
    if (instance.el.value === "") {
        instance.open();
        alert("Choose a date first!");
    }
    return;
});

function collElem(cont) {
    return `<div>` + cont + `<a href="javascript:void(0);" class="secondary-content" onclick="deleteC(event,'` + cont + `')"><i class="material-icons">delete</i></a></div>`;
}

function clearC(){
    var collItems = document.getElementsByClassName("collection-item").length;
    console.log("Length",collItems);
    while(collItems > 0){
        tcelem.removeChild(tcelem.lastElementChild);
        collItems--;
    }
}

function getColls() {
    var celem, litem = localStorage.getItem(instance.el.value);
    clearC();
    if (litem !== null) {
        var items = litem.split(";");
        for (var i in items) {
            if (items[i].trim() !== "") {
                celem = document.createElement("li");
                celem.className = "collection-item";
                celem.innerHTML = collElem(items[i]);
                tcelem.appendChild(celem);
            }
        }
    }
}

function addC(instval, tcval) {
    var getLSI = localStorage.getItem(instval);
    todoc.get(0).value = "";
    localStorage.setItem(instval, ((getLSI === "" || getLSI === null) ? "" : getLSI + ";") + tcval);
    var celem = document.createElement("li");
    celem.className = "collection-item";
    celem.innerHTML = collElem(tcval);
    tcelem.appendChild(celem);
}

function deleteC(e, cont) {
    e.preventDefault();
    var i, litem = localStorage.getItem(instance.el.value);
    if (litem !== null) {
        items = litem.split(";");
        i = items.indexOf(cont);
        if (i > -1) {
            items.splice(i, 1);
            item = items.join(";");
            if (item !== "") {
                localStorage.setItem(instance.el.value, item)
            } else {
                localStorage.removeItem(instance.el.value);
            }
        }
    }
    var getElem = e.target.parentElement.parentElement.parentElement;
    getElem.parentElement.removeChild(getElem);
}
