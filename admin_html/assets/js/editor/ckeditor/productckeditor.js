// Default ckeditor
CKEDITOR.replace('newProductCkeditor', {
  on: {
    contentDom: function (evt) {
      console.log()
      // Allow custom context menu only with table elemnts.
      evt.editor.editable().on('contextmenu', function (contextEvent) {
        var path = evt.editor.elementPath();

        if (!path.contains('table')) {
          contextEvent.cancel();
        }
      }, null, null, 5);
    }
  }
});

function ckEditorInstall(ckName) {
  console.log(ckName)
  // Default ckeditor
  CKEDITOR.replace(ckName, {
    on: {
      contentDom: function (evt) {
        // Allow custom context menu only with table elemnts.
        evt.editor.editable().on('contextmenu', function (contextEvent) {
          var path = evt.editor.elementPath();

          if (!path.contains('table')) {
            contextEvent.cancel();
          }
        }, null, null, 5);
      }
    }
  });
}