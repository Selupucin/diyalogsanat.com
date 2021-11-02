// Default ckeditor
CKEDITOR.replace('aboutTextCkeditor', {
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