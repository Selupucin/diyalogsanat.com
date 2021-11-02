var imageList = [];
var deleteImageList = [];
var deleteImages = [];
function FileListItems(files) {
    var b = new ClipboardEvent("").clipboardData || new DataTransfer()
    for (var i = 0, len = files.length; i < len; i++){
        b.items.add(files[i])
    }
    return b.files
}

function deleteImage(index) {
    window.event.preventDefault();
    var url = $(".uploaded-image #image-" + index).attr('data-image');

    imageList = Array.from(imageList);
    if (url !== null) {
        var itemIndex = imageList.findIndex(c => c.name.toString().includes(url));
        
        imageList.splice(itemIndex, 1);
    }

    var deleteId = $(".new-image#img-" + index).attr('data-id');

    deleteImageList.push(deleteId);



    $(".new-image#img-" + index).remove();
    $("#imgc-" + index).remove();
    // $("#fileInput").value = imageList;
    $("#fileInput")[0].files = new FileListItems(imageList)
}
//   var files = [
//     new File(['content'], 'sample1.txt'),
//     new File(['abc'], 'sample2.txt'),
//     new File(['dcb'], 'sample3.txt')
//   ];
  
  
//   fileInput.files = new FileListItems(files)
//   console.log(fileInput.files)



function deleteAddedImage(index) {
    window.event.preventDefault();



    var deleteId = $(".added-image#added-img-" + index).attr('data-id');
    deleteImageList.push(deleteId);

    $(".added-image#added-img-" + index).remove();
    $(".added-image#img-" + index).remove();
    $("#fileInput").val(imageList);

    $("#clone-image-" + index).val("");
}

function processFileList(list) {
    var reader = new FileReader();

    reader.readAsText(list[0]);
    reader.addEventListener("loadend", function () {
        var fileInput = document.getElementById("fileInput");
        fileInput.files = reader.result;
    });
}
function processFileList2(list) {
    var reader = new FileReader();
    reader.readAsText(list[0][0]);
    reader.addEventListener("loadend", function () {
        var fileInput = document.getElementById("fileInput");
        fileInput.filesreader.result;
    });
}
$("#fileInput").change(function () {
    var s = 0;
    var str = $("#added-images-div").html();
    var count = $(".added-image").length;
    if (count != undefined) {
        s = s + count;
    }

    var dosya = document.getElementById("fileInput");

    var fileInput = document.getElementById("fileInput");
    var filesInput = [];
    filesInput = fileInput.files;

    if (imageList.length == 0) {
        imageList.push.apply(imageList, dosya.files);
    }
    else {
        imageList.push.apply(imageList, dosya.files);

        fileInput.files = new FileListItems(imageList);

        $("#fileInput").prop("files", fileInput.files);
    }
    var indexx = 0;
    for (var i = 0; i < imageList.length; i++) {
        var oFReader = new FileReader();
        oFReader.readAsDataURL(fileInput.files[i]);
        oFReader.onload = function (oFREvent) {
            var namet = "";
            if (count != 0) {
                namet = fileInput.files[indexx].name;
            }
            else {
                namet = fileInput.files[indexx].name;
            }

            str = str + '<div class="col-md-2" id="imgc-'+ s +'"><div class="uploaded-image new-image" id="img-' + s + '" data-id='+ s +'> <button onclick="deleteImage(' + s + ')"><i class="fa fa-close"></i></button> <img src="' + oFREvent.target.result + '" data-image="' + namet + '" id="image-' + s + '" /></div></div>';
            $("#images-div").html(str);
            s++;
            indexx++;
        };
    }
});