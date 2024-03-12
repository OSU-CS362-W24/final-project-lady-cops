/**
 * @jest-environment jsdom
 */

const chartStorage = require('../lib/chartStorage')
require('@testing-library/jest-dom')

test('using saveChart to save data to localStorage', () => {
    // Arrange- Creating test data to be saved to localStorage
    const testChart = ('test data')
    
    // Act- Saving test data using saveChart and fetching chart data
    chartStorage.saveChart(testChart)
    const loadAllSavedCharts = window.localStorage.getItem("savedCharts")

    // Assert- expecting the localStorage chart data to contain test data
    expect(loadAllSavedCharts).toContain('test data')
});

test('using loadAllSavedCharts to retrieve data from localStorage', () => {
    // Arrange- Creating test data to be saved to localStorage
    const testChart = ('test data')
    
    // Act- Saving test data using saveChart and fetching chart data using loadAllSavedCharts
    chartStorage.saveChart(testChart)
    const loadAllSavedCharts = chartStorage.loadAllSavedCharts()

    // Assert- expecting the call to loadAllSavedCharts to return data that contains test data
    expect(loadAllSavedCharts).toContain('test data')
});

test('using loadSavedChart to retrieve data from a specific index in localStorage', () => {
    // Arrange- Creating test data to be saved to localStorage
    const testChart1 = ('banana')
    const testChart2 = ('apple')
    const testChart3 = ('orange')
    
    // Act- Saving test data using saveChart and fetching chart data using loadAllSavedCharts
    chartStorage.saveChart(testChart1)
    chartStorage.saveChart(testChart2)
    chartStorage.saveChart(testChart3)

    // Starting at index 2, since 0 and 1 have been filled by previous tests
    const loadSavedChart1 = chartStorage.loadSavedChart(2)
    const loadSavedChart2 = chartStorage.loadSavedChart(3)
    const loadSavedChart3 = chartStorage.loadSavedChart(4)

    // Assert- expecting the call to loadAllSavedCharts to return data that contains test data
    expect(loadSavedChart1).toBe('banana')
    expect(loadSavedChart2).toBe('apple')
    expect(loadSavedChart3).toBe('orange')
});

test("using updateCurrentChartData to write to the current chart's data from localStorage", () => {
    // Arrange- Creating test data to be saved to localStorage
    const testChart1 = ("banana")
    
    // Act- Saving test data using updateCurrentChartData and fetching chart data from localStorage
    chartStorage.updateCurrentChartData(testChart1)
    const currentChartData = window.localStorage.getItem('currentChartData')

    // Assert- expecting localStorage to the test data from currentChartData
    expect(currentChartData).toContain('banana')
});