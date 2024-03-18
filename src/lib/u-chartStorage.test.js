/**
 * @jest-environment jsdom
 */

const fs = require("fs")
const chartStorage = require('./chartStorage')
require('@testing-library/jest-dom')

function initDomFromFiles(htmlPath, jsPath) {
    const html = fs.readFileSync(htmlPath, 'utf8')
    document.open()
    document.write(html)
    document.close()
    jest.isolateModules(function() {
        require(jsPath)
    })
}

test('using saveChart to save data to localStorage', () => {
    // Arrange- Creating test data to be saved to localStorage
    initDomFromFiles(`${__dirname}/../index.html`, `${__dirname}/../lib/chartStorage.js`)
    const testChart = {"type":"line","data":[{"x":5,"y":5}],"xLabel":"time","yLabel":"distance"}
    
    // Act- Saving test data using saveChart and fetching chart data
    chartStorage.saveChart(testChart)
    const loadAllSavedCharts = window.localStorage.getItem("savedCharts")

    // Assert- expecting the localStorage chart data to contain test data
    expect(loadAllSavedCharts).toBe('[{"type":"line","data":[{"x":5,"y":5}],"xLabel":"time","yLabel":"distance"}]')
    window.localStorage.clear()
});

test('using loadAllSavedCharts to retrieve data from localStorage', () => {
    // Arrange- Creating test data to be saved to localStorage
    initDomFromFiles(`${__dirname}/../index.html`, `${__dirname}/../lib/chartStorage.js`)
    const testChart1 = '{"type":"line","data":[{"x":5,"y":5}],"xLabel":"time","yLabel":"distance"}'
    const testChart2 = '{"type":"scatter","data":[{"x":10,"y":10}],"xLabel":"years","yLabel":"dollars"}'
    const testChart3 = '{"type":"bar","data":[{"x":"Cookies","y":15}],"xLabel":"items","yLabel":"profit"}'
    
    // Act- Saving test data using saveChart and fetching chart data using loadAllSavedCharts
    chartStorage.saveChart(testChart1)
    chartStorage.saveChart(testChart2)
    chartStorage.saveChart(testChart3)
    const loadAllSavedCharts = chartStorage.loadAllSavedCharts()

    // Assert- expecting the call to loadAllSavedCharts to return data that contains test data
    expect(loadAllSavedCharts).toContain('{"type":"line","data":[{"x":5,"y":5}],"xLabel":"time","yLabel":"distance"}')
    expect(loadAllSavedCharts).toContain('{"type":"scatter","data":[{"x":10,"y":10}],"xLabel":"years","yLabel":"dollars"}')
    expect(loadAllSavedCharts).toContain('{"type":"bar","data":[{"x":"Cookies","y":15}],"xLabel":"items","yLabel":"profit"}')
    window.localStorage.clear()
});

test('using loadSavedChart to retrieve data from a specific index in localStorage', () => {
    // Arrange- Creating test data to be saved to localStorage
    initDomFromFiles(`${__dirname}/../index.html`, `${__dirname}/../lib/chartStorage.js`)
    const testChart1 = '{"type":"line","data":[{"x":5,"y":5}],"xLabel":"time","yLabel":"distance"}'
    const testChart2 = '{"type":"scatter","data":[{"x":10,"y":10}],"xLabel":"years","yLabel":"dollars"}'
    const testChart3 = '{"type":"bar","data":[{"x":"Cookies","y":15}],"xLabel":"items","yLabel":"profit"}'
    
    // Act- Saving test data using saveChart and fetching chart data using loadAllSavedCharts
    chartStorage.saveChart(testChart1)
    chartStorage.saveChart(testChart2)
    chartStorage.saveChart(testChart3)

    const loadSavedChart1 = chartStorage.loadSavedChart(0)
    const loadSavedChart2 = chartStorage.loadSavedChart(1)
    const loadSavedChart3 = chartStorage.loadSavedChart(2)

    // Assert- expecting the call to loadAllSavedCharts to return data that contains test data
    expect(loadSavedChart1).toBe('{"type":"line","data":[{"x":5,"y":5}],"xLabel":"time","yLabel":"distance"}')
    expect(loadSavedChart2).toBe('{"type":"scatter","data":[{"x":10,"y":10}],"xLabel":"years","yLabel":"dollars"}')
    expect(loadSavedChart3).toBe('{"type":"bar","data":[{"x":"Cookies","y":15}],"xLabel":"items","yLabel":"profit"}')
    window.localStorage.clear()
});

test("using updateCurrentChartData to write to the current chart's data from localStorage", () => {
    // Arrange- Creating test data to be saved to localStorage
    initDomFromFiles(`${__dirname}/../index.html`, `${__dirname}/../lib/chartStorage.js`)
    const testChart = {"type":"line","data":[{"x":5,"y":5}],"xLabel":"time","yLabel":"distance"}

    // Act- Saving test data using updateCurrentChartData and fetching chart data from localStorage
    chartStorage.updateCurrentChartData(testChart)
    const currentChartData1 = window.localStorage.getItem('currentChartData')

    // Assert- expecting localStorage to the test data from currentChartData
    expect(currentChartData1).toBe('{"type":"line","data":[{"x":5,"y":5}],"xLabel":"time","yLabel":"distance"}')

    // Arrange- Creating test data to be saved to localStorage
    const testReplace = {"type":"scatter","data":[{"x":10,"y":10}],"xLabel":"years","yLabel":"dollars"}
    
    // Act- Saving test data using updateCurrentChartData and fetching chart data from localStorage
    chartStorage.updateCurrentChartData(testReplace)
    const currentChartData2 = window.localStorage.getItem('currentChartData')

    // Assert- expecting localStorage to the test data from currentChartData and not to contain previous data
    expect(currentChartData2).not.toContain('{"type":"line","data":[{"x":5,"y":5}],"xLabel":"time","yLabel":"distance"}')
    expect(currentChartData2).toBe('{"type":"scatter","data":[{"x":10,"y":10}],"xLabel":"years","yLabel":"dollars"}')
    window.localStorage.clear()
});

test("using loadCurrentChartData to read the current chart's data from localStorage", () => {
    // Arrange- Creating test data to be saved to localStorage
    initDomFromFiles(`${__dirname}/../index.html`, `${__dirname}/../lib/chartStorage.js`)
    const testChart1 = '{"type":"scatter","data":[{"x":10,"y":10}],"xLabel":"years","yLabel":"dollars"}'
    
    // Act- Saving test data using updateCurrentChartData and fetching chart data using loadCurrentChartData
    chartStorage.updateCurrentChartData(testChart1)
    const currentChartData = chartStorage.loadCurrentChartData()

    // Assert- expecting localStorage to the test data from currentChartData
    expect(currentChartData).toBe('{"type":"scatter","data":[{"x":10,"y":10}],"xLabel":"years","yLabel":"dollars"}')
    window.localStorage.clear()
});