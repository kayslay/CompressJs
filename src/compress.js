/**
 * Created by kayslay on 6/28/17.
 */

const Compress = (param) => {
    "use strict";

};

const canvas = document.createElement(canvas);

function compress(src, dimension) {
    const context = canvas.getContext('2d');
    const img = new Image();
    //set the img.src
    img.src = src;
    //set dimension
    const width = canvas.width = dimension.width || img.width;
    const height = canvas.height = dimension.height || img.height;
    context.drawImage(img, 0, 0, width, height);
    return (canvas.toDataURL("image/jpeg", (rate / 120)))
}

export default Compress