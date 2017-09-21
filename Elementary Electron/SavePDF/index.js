var picture = require('cat-picture');
var image = require('lightning-image-poly');
var remote = require('electron').remote;
var fs = require('fs');

var src = picture.src;
picture.remove();
var viz = new image('#visualization', null, [src], { hullAlgorithm: 'convex' });

function save() {
    remote.getCurrentWebContents().printToPDF({
        portrait: true
    }, function (err, data) {
        if (err) alert('Error extracting data');
        fs.writeFile('annotation.pdf', data, function (err) {
            if (err) alert('Error generating pdf!' + err.message);
            else alert('PDF saved');
        })
    });
}

window.addEventListener('keydown', function (e) {
    if (e.keyCode === 80) save();
});