const fs = require('fs');

// Function to decode a value from a given base
function decodeValue(base, value) {
    return parseInt(value, parseInt(base));
}

// Lagrange interpolation to calculate the constant term c
function lagrangeInterpolation(points, x) {
    let total = 0;

    for (let i = 0; i < points.length; i++) {
        let [xi, yi] = points[i];
        let term = yi;

        for (let j = 0; j < points.length; j++) {
            if (i !== j) {
                let [xj] = points[j];
                term *= (x - xj) / (xi - xj);
            }
        }

        total += term;
    }

    return total;
}

// Read the JSON file
fs.readFile('input.json', 'utf8', (err, data) => {
    if (err) {
        console.error("Error reading the JSON file:", err);
        return;
    }

    // Parse the JSON data
    const jsonData = JSON.parse(data);
    const k = jsonData.keys.k;

    // Collect the points (x, y)
    const points = [];
    for (let i = 1; i <= k; i++) {
        const base = jsonData[i].base;
        const value = jsonData[i].value;
        const decodedValue = decodeValue(base, value);
        points.push([i, decodedValue]); // (x, y)
    }

    console.log("Points:", points);

    // Calculate the constant term (c) at x = 0
    const c = lagrangeInterpolation(points, 0);
    console.log("The constant term c is:", c);
});
