const xlsxFile = require('read-excel-file/node');

//var oldList = []
//var js = [{"index":"value"}]
function one() {
    // setTimeout(() => {
    //     xlsxFile('./ilk7500.xlsx').then((rows) => {
    //         console.log("starting to one")
    //         var sayac1 = 0
    //         rows.forEach(row => {
    //             sayac1++
    //             var bdy = {
    //                 "barcode": barcodeControl(row[1]),
    //                 "name": row[2].toLowerCase().replace(/ kapli /g, " kaplı ").replace(/ı/g, "I").replace(/i/g, "İ").toUpperCase(),
    //                 "activeIngredient": activeIngredientControl(row[3]),
    //                 "atcCode": row[4],
    //                 "licenseOwner": row[5],
    //                 "licenseNumber": row[6] + "_",
    //                 "prescriptionType": prescriptionTypeControl(row[12]),
    //                 "origin": originControl(row[13]),
    //                 "img": "",
    //                 "price": 0
    //             }
    //             myArray.push(bdy)
    //             console.log(myArray.length)
    //             if (sayac1 == rows.length) {
    //                 console.log("Satır Sayısı", rows.length, "Array Uzunluğu", myArray.length)
    //                 add()
    //             }
    //         });
    //     })
    // }, 10);
    // setTimeout(() => {
    //     xlsxFile('./iki7500.xlsx').then((rows) => {
    //         console.log("starting to two")
    //         var sayac2 = 0
    //         rows.forEach(row => {
    //             sayac2++
    //             var bdy = {
    //                 "barcode": barcodeControl(row[1]).toString(),
    //                 "name": row[2].toLowerCase().replace(/ kapli /g, " kaplı ").replace(/ı/g, "I").replace(/i/g, "İ").toUpperCase(),
    //                 "activeIngredient": activeIngredientControl(row[3]),
    //                 "atcCode": row[4],
    //                 "licenseOwner": row[5],
    //                 "licenseNumber": row[6] + "_",
    //                 "prescriptionType": prescriptionTypeControl(row[12]),
    //                 "origin": originControl(row[13]),
    //                 "img": "",
    //                 "price": 0
    //             }
    //             myArray.push(bdy)
    //             console.log(myArray.length)
    //             if (sayac2 == rows.length) {
    //                 console.log("Satır Sayısı", rows.length, "Array Uzunluğu", myArray.length)
    //                 add()
    //             }
    //         });
    //     })
    // }, 1000);

    // setTimeout(() => {
    //     xlsxFile('./uc7500.xlsx').then((rows) => {
    //         console.log("starting to three")
    //         var sayac3 = 0
    //         rows.forEach(row => {
    //             sayac3++
    //             var bdy = {
    //                 "barcode": barcodeControl(row[1]).toString(),
    //                 "name": row[2].toLowerCase().replace(/ kapli /g, " kaplı ").replace(/ı/g, "I").replace(/i/g, "İ").toUpperCase(),
    //                 "activeIngredient": activeIngredientControl(row[3]),
    //                 "atcCode": row[4],
    //                 "licenseOwner": row[5],
    //                 "licenseNumber": row[6] + "_",
    //                 "prescriptionType": prescriptionTypeControl(row[12]),
    //                 "origin": originControl(row[13]),
    //                 "img": "",
    //                 "price": 0
    //             }
    //             myArray.push(bdy)
    //             console.log(myArray.length)
    //             if (sayac3 == rows.length) {
    //                 console.log("Satır Sayısı", rows.length, "Array Uzunluğu", myArray.length)
    //                 add()
    //             }
    //         });
    //     })
    // }, 2000);

    // js.forEach(e => {
    //     if (oldList.indexOf(e.id) < 0) {
    //         oldList.push(e.id)
    //         var bdy = {
    //             "barcode": "-",
    //             "name": e.name.toLowerCase().replace(/ kapli /g, " kaplı ").replace(/ı/g, "I").replace(/i/g, "İ").toUpperCase(),
    //             "activeIngredient": activeIngredientControl(e.category),
    //             "atcCode": "-",
    //             "licenseOwner": e.brand,
    //             "licenseNumber": "_",
    //             "prescriptionType": "Genel",
    //             "origin": "Belirtilmemiş",
    //             "img": "",
    //             "price": 0
    //         }
    //         myArray.push(bdy)
    //         console.log(e.name.toLowerCase().replace(/ kapli /g, " kaplı ").replace(/ı/g, "I").replace(/i/g, "İ").toUpperCase(), myArray.length)
    //     }
    // });
    // console.log("Finished", myArray.length, myArray[25], oldList.length, js.length)
    // add()
}