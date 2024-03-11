/**
 * @jest-environment jsdom
 */

const sortPoints = require('../lib/sortPoints')
const chartStorage = require('../lib/chartStorage')
require('@testing-library/jest-dom')

test('sortPoints function is able to sort a given array', () => {
    // Arrange- creating an unsorted array to test
    const unsortedAr = [{ x: 1, y: 1},{ x: 4, y: 4},{ x: 3, y: 3}]

    // Act- using sortPoints function to sort previous array
    const sortedAr = sortPoints(unsortedAr)

    // Assert- ensuring new array is sorted
    expect(sortedAr[0]).toEqual({ x: 1, y: 1})
    expect(sortedAr[1]).toEqual({ x: 3, y: 3})
    expect(sortedAr[2]).toEqual({ x: 4, y: 4})
});

test('sortPoints function is able to sort a given array specifically by x-values', () => {
    // Arrange- creating an unsorted array to test
    const unsortedAr = [{ x: 5, y: 17},{ x: 4, y: 19},{ x: 2, y: 3},{ x: 3, y: 1},{ x: 1, y: 10}]

    // Act- using sortPoints function to sort previous array by x values, ignoring y values
    const sortedAr = sortPoints(unsortedAr)

    // Assert- ensuring new array is sorted by x values
    expect(sortedAr[0]).toEqual({ x: 1, y: 10})
    expect(sortedAr[1]).toEqual({ x: 2, y: 3})
    expect(sortedAr[2]).toEqual({ x: 3, y: 1})
    expect(sortedAr[3]).toEqual({ x: 4, y: 19})
    expect(sortedAr[4]).toEqual({ x: 5, y: 17})
});

test('sortPoints function outputs the same array if the array is already sorted', () => {
    // Arrange- creating an sorted array to test
    const unsortedAr = [{ x: 5, y: 5},{ x: 10, y: 10},{ x: 15, y: 15}]

    // Act- using sortPoints function to sort previous array
    const sortedAr = sortPoints(unsortedAr)

    // Assert- ensuring new array is still sorted
    expect(sortedAr[0]).toEqual({ x: 5, y: 5})
    expect(sortedAr[1]).toEqual({ x: 10, y: 10})
    expect(sortedAr[2]).toEqual({ x: 15, y: 15})
});

test('using saveChart to save data to localStorage', () => {
    // Arrange- Creating test data to be saved to localStorage
    const testChart = ('test data')
    
    // Act- Saving test data using saveChart and fetching chart data
    chartStorage.saveChart(testChart)
    const loadAllSavedCharts = window.localStorage.getItem("savedCharts")

    // Assert- expecting the localStorage chart data to contain test data
    expect(loadAllSavedCharts).toContain('test data')
});

test('using loadAllSavedCharts to retrieve data to localStorage', () => {
    // Arrange- Creating test data to be saved to localStorage
    const testChart = ('test data')
    
    // Act- Saving test data using saveChart and fetching chart data using loadAllSavedCharts
    chartStorage.saveChart(testChart)
    const loadAllSavedCharts = chartStorage.loadAllSavedCharts()

    // Assert- expecting the call to loadAllSavedCharts to return data that contains test data
    expect(loadAllSavedCharts).toContain('test data')
});

