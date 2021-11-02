function reloadSystem() {
    $.post("/reload", {
        system: "reaload"
    }, (data) => {
        if (data == "ok") {
            alert("Site Yenilendi!")
        } else {
            alert("Hata")
        }
    })
}