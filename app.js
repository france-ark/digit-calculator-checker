const prompt = require('prompt');

prompt.start();

prompt.get(['barcode'], function (err, result) {
    if (err) { return onErr(err); }

    // GTIN-13 Check Digit is calculated
    // 1. Multiply by even by 3 and odd is 1
    // 2. Add all results or sum all numbers inside the multipliedNumbers array
    // 3. Get nearest 10 then subtract with the sum numbers


    const barcode = result.barcode
    const arr = Array.from(barcode.toString()).map(Number) // convert barcode to array

    const multipliedNumbers = [] // multiplied numbers from array

    arr.forEach((x, index) => {
    	let nIndex = index + 1;
    	if(nIndex % 2 == 0) {
        multipliedNumbers.push(x * 3)
    	}else{
      	 multipliedNumbers.push(x * 1)
      }
    })

    const sum = multipliedNumbers.reduce((a, b) => a + b, 0); // sum all numbers inside multipliedNumbers
    const nearestTen = Math.ceil(sum / 10) * 10; // get nearest 10 from sum numbers

    const digit = nearestTen - sum;

    console.log("digit is : " + digit)
    console.log("barcode with digit :  " + barcode + digit)

    });

function onErr(err) {
    console.log(err);
    return 1;
}
