FilePond.registerPlugin(FilePondPluginImageResize, FilePondPluginFileEncode, FilePondPluginImagePreview);

FilePond.setOptions({
    stylePanelAspectRatio: 150 / 100, //image ratio
    imageResizeTargetWidth:100, //image size that store in database
    imageResizeTargetHeight:150 //image size that store in database
})
FilePond.parse(document.body);