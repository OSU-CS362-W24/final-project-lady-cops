/**
 * @jest-environment jsdom
 */

const fs = require("fs")
const domTesting = require('@testing-library/dom')
require('@testing-library/jest-dom')
const userEvent = require("@testing-library/user-event").default

//Spy on window

    
function initDomFromFiles(htmlPath, jsPath) {
    window.localStorage.clear()
    const html = fs.readFileSync(htmlPath, 'utf8')
    document.open()
    document.write(html)
    document.close()
    jest.isolateModules(function() {
        require(jsPath)
    })
}

//ADDING VALUES TO THE CHART BUILDER

test('Pressing "+" adds exactly one empty x and y value box', async function(){
    initDomFromFiles(`${__dirname}/line.html`, `${__dirname}/line.js`)

    //get + button for adding  new x and y cells.
    const addButton = domTesting.getByText(document, "+")

    //count all cells
    var xValues = await domTesting.getAllByLabelText(document, "X")
    var yValues = await domTesting.getAllByLabelText(document, "Y")


    // Assert that the lists are not empty
	expect(xValues).toHaveLength(1)
    expect(yValues).toHaveLength(1)

    const user = userEvent.setup()

    await user.click(addButton)

    xValues = domTesting.getAllByLabelText(document, "X")
    yValues = domTesting.getAllByLabelText(document, "Y")

    expect(xValues).toHaveLength(2)
    expect(yValues).toHaveLength(2)
})


//ALERTS DISPLAYED FOR MISSING CHART DATA
test('Error message appears for missing chart title', async function(){
    const window = require("./window")

    initDomFromFiles(`${__dirname}/line.html`, `${__dirname}/line.js`)

    const xLabel = domTesting.getByLabelText(document, "X label")
    const yLabel = domTesting.getByLabelText(document, "Y label")
    
    const xValues = domTesting.getAllByLabelText(document, "X")
    const yValues = domTesting.getAllByLabelText(document, "Y")
    const xValue = xValues[0]
    const yValue = yValues[0]

    const generateButton = domTesting.getByText(document, "Generate chart")

    //Popups
    window.alert = jest.fn();
    const alertMock = jest.spyOn(window, 'alert');

    const user = userEvent.setup()

    await user.type(xLabel, "X Label Name :)")
    await user.type(yLabel, "Y Label Name :(")
    await user.type(xValue, "22")
    await user.type(yValue, "33")

    await user.click(generateButton)
    
    expect(alertMock).toHaveBeenCalledTimes(1)
})

test('Error message appears for missing Y Label', async function(){
    const window = require("./window")
    initDomFromFiles(`${__dirname}/line.html`, `${__dirname}/line.js`)

    const chartTitle = domTesting.getByLabelText(document, "Chart title")

    const xLabel = domTesting.getByLabelText(document, "X label")
    
    const xValues = domTesting.getAllByLabelText(document, "X")
    const yValues = domTesting.getAllByLabelText(document, "Y")
    const xValue = xValues[0]
    const yValue = yValues[0]

    const generateButton = domTesting.getByText(document, "Generate chart")

    //Popups
    window.alert = jest.fn();
    const alertMock = jest.spyOn(window, 'alert');

    const user = userEvent.setup()

    await user.type(chartTitle, "Random Chart Title")
    await user.type(xLabel, "X Label Name :)")
    await user.type(xValue, "22")
    await user.type(yValue, "33")

    await user.click(generateButton)
    
    expect(alertMock).toHaveBeenCalledTimes(1)
})

test('Error message appears for missing X value', async function(){
    const window = require("./window")
    initDomFromFiles(`${__dirname}/line.html`, `${__dirname}/line.js`)

    const chartTitle = domTesting.getByLabelText(document, "Chart title")

    const xLabel = domTesting.getByLabelText(document, "X label")
    const yLabel = domTesting.getByLabelText(document, "Y label")
    
    const yValues = domTesting.getAllByLabelText(document, "Y")
    const yValue = yValues[0]

    const generateButton = domTesting.getByText(document, "Generate chart")

    //Popups
    window.alert = jest.fn();
    const alertMock = jest.spyOn(window, 'alert');

    const user = userEvent.setup()

    await user.type(chartTitle, "Random Chart Title")
    await user.type(xLabel, "X Label Name :)")
    await user.type(yLabel, "Y Label Name")
    await user.type(yValue, "33")

    await user.click(generateButton)
    
    expect(alertMock).toHaveBeenCalledTimes(1)
})

test('Error message appears for missing Y value', async function(){
    const window = require("./window")
    initDomFromFiles(`${__dirname}/line.html`, `${__dirname}/line.js`)

    const chartTitle = domTesting.getByLabelText(document, "Chart title")

    const xLabel = domTesting.getByLabelText(document, "X label")
    const yLabel = domTesting.getByLabelText(document, "Y label")
    
    const xValues = domTesting.getAllByLabelText(document, "X")
    const xValue = xValues[0]

    const generateButton = domTesting.getByText(document, "Generate chart")

    //Popups
    window.alert = jest.fn();
    const alertMock = jest.spyOn(window, 'alert');

    const user = userEvent.setup()

    await user.type(chartTitle, "Random Chart Title")
    await user.type(xLabel, "X Label Name :)")
    await user.type(yLabel, "Y Label Name :)")
    await user.type(xValue, "22")

    await user.click(generateButton)
    
    expect(alertMock).toHaveBeenCalledTimes(1)
})


//CLEARING CHART DATA
test('All chart data is cleared when Clear Chart Data is pressed', async function(){
    initDomFromFiles(`${__dirname}/line.html`, `${__dirname}/line.js`)

    const chartTitle = domTesting.getByLabelText(document, "Chart title")
    const chartColor = domTesting.getByLabelText(document, "Chart color")
    const chartStyle = getComputedStyle(chartColor);
    const xLabel = domTesting.getByLabelText(document, "X label")
    const yLabel = domTesting.getByLabelText(document, "Y label")
    var xValues = domTesting.getAllByLabelText(document, "X")
    var yValues = domTesting.getAllByLabelText(document, "Y")
    var xValue = xValues[0]
    var yValue = yValues[0]

    const clearButton = domTesting.getByText(document, "Clear chart data")

    const user = userEvent.setup()

    await user.type(chartTitle, "Random Chart Title")
    await user.type(xLabel, "X Label Name :)")
    await user.type(yLabel, "Y Label Name :)")
    await user.type(xValue, "22")
    await user.type(yValue, "33")
    chartColor.value = '#00d9ff'

    xValues = domTesting.getAllByLabelText(document, "X")
    yValues = domTesting.getAllByLabelText(document, "Y")

    expect(chartColor.value).toBe('#00d9ff')
    expect(chartTitle).toHaveValue("Random Chart Title")
    expect(xLabel).toHaveValue("X Label Name :)")
    expect(yLabel).toHaveValue("Y Label Name :)")

    await user.click(clearButton)

    xValues = domTesting.getAllByLabelText(document, "X")
    yValues = domTesting.getAllByLabelText(document, "Y")
    xValue = xValues[0]
    yValue = yValues[0]

    expect(chartColor.value).toBe('#ff4500')
    expect(xLabel).toHaveValue("")
    expect(yLabel).toHaveValue("")
    expect(chartTitle).toHaveValue("")
    expect(xValue).toHaveValue(null)
    expect(yValue).toHaveValue(null)
})

test('X and Y cell count is reduced to 1 when Clear Chart Data is pressed', async function(){
    initDomFromFiles(`${__dirname}/line.html`, `${__dirname}/line.js`)

    const chartTitle = domTesting.getByLabelText(document, "Chart title")

    const xLabel = domTesting.getByLabelText(document, "X label")
    const yLabel = domTesting.getByLabelText(document, "Y label")
    
    var xValues = domTesting.getAllByLabelText(document, "X")
    var yValues = domTesting.getAllByLabelText(document, "Y")
    var xValue = xValues[0]
    var yValue = yValues[0]

    const clearButton = domTesting.getByText(document, "Clear chart data")
    const addButton = domTesting.getByText(document, "+")
    
    expect(xValues).toHaveLength(1)
    expect(yValues).toHaveLength(1)

    const user = userEvent.setup()

    await user.type(chartTitle, "Random Chart Title")
    await user.type(xLabel, "X Label Name :)")
    await user.type(yLabel, "Y Label Name :)")
    await user.type(xValue, "22")
    await user.type(yValue, "33")
    await user.click(addButton)
    xValues = domTesting.getAllByLabelText(document, "X")
    yValues = domTesting.getAllByLabelText(document, "Y")
    await user.type(xValues[1], "22")
    await user.type(yValues[1], "33")
    await user.click(addButton)
    xValues = domTesting.getAllByLabelText(document, "X")
    yValues = domTesting.getAllByLabelText(document, "Y")
    await user.type(xValues[2], "22")
    await user.type(yValues[2], "33")

    xValues = domTesting.getAllByLabelText(document, "X")
    yValues = domTesting.getAllByLabelText(document, "Y")

    expect(xValues).toHaveLength(3)
    expect(yValues).toHaveLength(3)

    await user.click(clearButton)

    xValues = domTesting.getAllByLabelText(document, "X")
    yValues = domTesting.getAllByLabelText(document, "Y")
    xValue = xValues[0]
    yValue = yValues[0]

    expect(xLabel).toHaveValue("")
    expect(yLabel).toHaveValue("")
    expect(chartTitle).toHaveValue("")
    expect(xValue).toHaveValue(null)
    expect(yValue).toHaveValue(null)
    expect(xValues).toHaveLength(1)
    expect(yValues).toHaveLength(1)
})

//DATA CORRECTLY SENT TO CHART GENERATION FUNCTION
test('generateChartImg receives the required parameters when the user creates a chart', async function(){
    const generateChartImg = require(`${__dirname}/../lib/generateChartImg.js`)
    initDomFromFiles(`${__dirname}/line.html`, `${__dirname}/line.js`)

    const xLabel = domTesting.getByLabelText(document, 'X label')
    const yLabel = domTesting.getByLabelText(document, 'Y label')
    const addDataBtn = domTesting.getByText(document, '+')
    const submitBtn = domTesting.getByText(document, 'Generate chart')

    const user = userEvent.setup()
    
    /* Create a mock for generateChartImg */
    jest.mock(`${__dirname}/../lib/generateChartImg.js`, () => {
        return jest.fn(() => 'https://placehold.co/600x400')
    })


    /* Add a few rows for data */
    await user.click(addDataBtn)
    await user.click(addDataBtn)
    await user.click(addDataBtn)
    var xValues = domTesting.getAllByLabelText(document, "X")
    var yValues = domTesting.getAllByLabelText(document, "Y")

    /* Start entering data for the chart */
    await user.type(xLabel, 'My X Label')
    await user.type(yLabel, 'My Y Label')

    await user.type(xValues[0], '1')
    await user.type(yValues[0], '2')
    await user.type(xValues[1], '3')
    await user.type(yValues[1], '4')
    await user.type(xValues[2], '5')
    await user.type(yValues[2], '6')

    /* Generate the chart with that data */
    await user.click(submitBtn)


    /* Ensure the function received the correct data */
    expect(generateChartImg).toHaveBeenCalledTimes(1)

    const passedData = generateChartImg.mock.calls[0]
    expect(passedData[0]).toEqual('line')
    expect(passedData[1]).toEqual([
        {x: '1', y: '2'},
        {x: '3', y: '4'},
        {x: '5', y: '6'},
    ])
    expect(passedData[2]).toEqual('My X Label')
    expect(passedData[3]).toEqual('My Y Label')

    
    generateChartImg.mockRestore()
})
test('generateChartImg receives the optional parameters when the user creates a chart with optional data', async function(){
    const generateChartImg = require(`${__dirname}/../lib/generateChartImg.js`)
    initDomFromFiles(`${__dirname}/line.html`, `${__dirname}/line.js`)

    const chartTitle = domTesting.getByLabelText(document, 'Chart title')
    const xLabel = domTesting.getByLabelText(document, 'X label')
    const yLabel = domTesting.getByLabelText(document, 'Y label')
    const chartColor = domTesting.getByLabelText(document, 'Chart color')
    const addDataBtn = domTesting.getByText(document, '+')
    const submitBtn = domTesting.getByText(document, 'Generate chart')

    const user = userEvent.setup()
    
    /* Create a mock for generateChartImg */
    jest.mock(`${__dirname}/../lib/generateChartImg.js`, () => {
        return jest.fn(() => 'https://placehold.co/600x400')
    })


    /* Add a few rows for data */
    await user.click(addDataBtn)
    await user.click(addDataBtn)
    await user.click(addDataBtn)
    var xValues = domTesting.getAllByLabelText(document, "X")
    var yValues = domTesting.getAllByLabelText(document, "Y")

    /* Start entering data for the chart */
    await user.type(chartTitle, 'My Title')
    await user.type(xLabel, 'My X Label')
    await user.type(yLabel, 'My Y Label')
    /* Not ideal, but best available method for setting the chart color: https://github.com/testing-library/user-event/issues/423#issuecomment-669368863 */
    domTesting.fireEvent.input(chartColor, {target: {value: '#98ff98'}})

    await user.type(xValues[0], '1')
    await user.type(yValues[0], '2')
    await user.type(xValues[1], '3')
    await user.type(yValues[1], '4')
    await user.type(xValues[2], '5')
    await user.type(yValues[2], '6')

    /* Generate the chart with that data */
    await user.click(submitBtn)


    /* Ensure the function received the correct data */
    expect(generateChartImg).toHaveBeenCalledTimes(1)

    const passedData = generateChartImg.mock.calls[0]
    expect(passedData[0]).toBe('line')
    expect(passedData[1]).toEqual([
        {x: '1', y: '2'},
        {x: '3', y: '4'},
        {x: '5', y: '6'},
    ])
    expect(passedData[2]).toBe('My X Label')
    expect(passedData[3]).toBe('My Y Label')
    expect(passedData[4]).toBe('My Title')
    expect(passedData[5]).toBe('#98ff98')

    
    generateChartImg.mockRestore()
})