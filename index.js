// Check if a text layer is selected
if (app.activeDocument.activeLayer.kind != LayerKind.TEXT)
{
    alert("Please select a text layer.");
}
else
{
    var userInputDialog = new Window("dialog", "Font Generator Settings");
    userInputDialog.add("statictext", undefined, "Enter characters to include:");
    var userInputField = userInputDialog.add("edittext", undefined, "0123456789.,");
    var okButton = userInputDialog.add("button", undefined, "OK");
    okButton.onClick = function ()
    {
        userInputDialog.close();
    };
    userInputDialog.show();

    var digits = userInputField.text;

    var outputFolder = Folder.selectDialog("Select an output folder");

    app.activeDocument.resizeCanvas(1920, 1080);
    var allDigitsTextLayer = app.activeDocument.activeLayer;
    allDigitsTextLayer.textItem.contents = digits;
    app.activeDocument.trim(TrimType.TRANSPARENT);
    var allDigitsWidth = app.activeDocument.width;
    var allDigitsHeight = app.activeDocument.height;
    allDigitsTextLayer.visible = false;

    for (var i = 0; i < digits.length; i++)
    {
        var currentDigit = digits[i];
        var oneDigitTextLayer = allDigitsTextLayer.duplicate();
        oneDigitTextLayer.textItem.contents = currentDigit;

        app.activeDocument.resizeCanvas(allDigitsWidth, allDigitsHeight);

        app.activeDocument.trim(
            TrimType.TRANSPARENT,
            false, //no top trim
            true,
            false, //no bottom trim
            true
        );

        var imageName;
        if (currentDigit === ".")
        {
            imageName = "dot";
        }
        else if (currentDigit === ",")
        {
            imageName = "comma";
        }
        else
        {
            imageName = currentDigit;
        }

        var imageFile = new File(outputFolder + "/c_" + imageName + ".png");
        var saveOptions = new PNGSaveOptions();
        app.activeDocument.saveAs(imageFile, saveOptions, true, Extension.LOWERCASE);
        oneDigitTextLayer.remove();
    }

    app.activeDocument.resizeCanvas(1920, 1080);
    allDigitsTextLayer.visible = true;

    alert("Font successfully saved in " + outputFolder);
}
