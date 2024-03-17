/**
* @jest-environment ./src/fixjsdomenvironment.js
*/

const fs = require("fs")
const generateChartImg = require('../lib/generateChartImg')
require("whatwg-fetch")

function initDomFromFiles(htmlPath, jsPath) {
    const html = fs.readFileSync(htmlPath, 'utf8')
    document.open()
    document.write(html)
    document.close()
    jest.isolateModules(function() {
        require(jsPath)
    })
}

test('generateChartImg generates an image URL using blob', async () => {
    // Arrange- retrieving dom and initializing data for chart
    initDomFromFiles(`${__dirname}/../index.html`, `${__dirname}/../lib/generateChartImg.js`)
    const type = "line"
    const data = [{ 'x': '5', 'y': '5'},{ 'x': '10', 'y': '10'},{ 'x': '15', 'y': '15'}]
    const xLabel = "time"
    const yLabel = "distance"
    const title = "distance over time"
    const color = "#ff4500"

    // Act- uses generateChartImg to create a URL that uses the inputted data
    const chartURL = await generateChartImg(type, data, xLabel, yLabel, title, color)

    // Assert- tests if the retrieved URL matches the blob format and has a length longer than 'blob:'
    expect(chartURL).toMatch(/^blob:.+/)
});

test('generateChartImg generates an image URL using blob without optional inputs (title and color)', async () => {
    // Arrange- retrieving dom and initializing data for chart
    initDomFromFiles(`${__dirname}/../index.html`, `${__dirname}/../lib/generateChartImg.js`)
    const type = "line"
    const data = [{ 'x': '5', 'y': '5'},{ 'x': '10', 'y': '10'},{ 'x': '15', 'y': '15'}]
    const xLabel = "time"
    const yLabel = "distance"

    // Act- uses generateChartImg to create a URL that uses the inputted data
    const chartURL = await generateChartImg(type, data, xLabel, yLabel)

    // Assert- tests if the retrieved URL matches the blob format and has a length longer than 'blob:'
    expect(chartURL).toMatch(/^blob:.+/)
});