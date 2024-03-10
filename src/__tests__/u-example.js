const sortPoints = require('../lib/sortPoints')

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