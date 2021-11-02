function prescriptionTypeControl(entry) {
    if (entry == null || entry == undefined || entry == "") {
        return "Genel"
    } else {
        return entry
    }
}

function originControl(entry) {
    if (entry == null || entry == undefined || entry == "") {
        return "Belirtilmemiş"
    } else {
        return entry
    }
}

function activeIngredientControl(entry) {
    if (entry == null || entry == undefined || entry == "") {
        return "-"
    } else {
        return entry.replace(/ı/g, "I").replace(/i/g, "İ").toUpperCase()
    }
}

function barcodeControl(entry) {
    if (entry == null || entry == undefined || entry == "") {
        return "-"
    } else {
        return entry.toString()
    }
}