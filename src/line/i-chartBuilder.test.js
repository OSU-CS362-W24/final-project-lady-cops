/**
 * @jest-environment jsdom
 */

const fs = require("fs")
const domTesting = require('@testing-library/dom')
require('@testing-library/jest-dom')
const userEvent = require("@testing-library/user-event").default

//Spy on
const window = require("./window")
 
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

/*
    They should verify the behaviors described above. Note that these behaviors are 
    duplicated across the three chart builder pages (bar.html, line.html, and scatter.html). 
    You only need to test these behaviors on one of those pages.
*/

//ADDING VALUES TO THE CHART BUILDER

test('Pressing "+" adds exactly one empty x and y value box', async function(){
    initDomFromFiles(`${__dirname}/line.html`, `${__dirname}/line.js`)

    //get + button for adding  new x and y cells.
    const buttons = domTesting.queryAllByRole(document, "button")
    const addButton = buttons[3];
    
    //make sure the correct button is selected
    expect(addButton).toHaveTextContent("+")

    //count all cells
    var xValues = await domTesting.getAllByLabelText(document, "X")
    var yValues = await domTesting.getAllByLabelText(document, "Y")


    // Assert that the lists are not empty
	expect(xValues).toHaveLength(1)
    expect(yValues ).toHaveLength(1)

    const user = userEvent.setup()

    await user.click(addButton)

    xValues = domTesting.getAllByLabelText(document, "X")
    yValues = domTesting.getAllByLabelText(document, "Y")

    expect(xValues).toHaveLength(2)
    expect(yValues).toHaveLength(2)
})


//ALERTS DISPLAYED FOR MISSING CHART DATA
test('Error message appears for missing chart title', async function(){
    initDomFromFiles(`${__dirname}/line.html`, `${__dirname}/line.js`)

    const xLabel = domTesting.getByLabelText(document, "X label")
    const yLabel = domTesting.getByLabelText(document, "Y label")
    
    const xValues = domTesting.getAllByLabelText(document, "X")
    const yValues = domTesting.getAllByLabelText(document, "Y")
    const xValue = xValues[0]
    const yValue = yValues[0]

    const buttons = domTesting.queryAllByRole(document, "button")
    var generateButton = buttons[0]

    //make sure the correct button is selected
    expect(generateButton).toHaveTextContent("Generate chart")

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
    initDomFromFiles(`${__dirname}/line.html`, `${__dirname}/line.js`)

    const chartTitle = domTesting.getByLabelText(document, "Chart title")

    const xLabel = domTesting.getByLabelText(document, "X label")
    
    const xValues = domTesting.getAllByLabelText(document, "X")
    const yValues = domTesting.getAllByLabelText(document, "Y")
    const xValue = xValues[0]
    const yValue = yValues[0]

    const buttons = domTesting.queryAllByRole(document, "button")
    var generateButton = buttons[0]

    //make sure the correct button is selected
    expect(generateButton).toHaveTextContent("Generate chart")

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
    initDomFromFiles(`${__dirname}/line.html`, `${__dirname}/line.js`)

    const chartTitle = domTesting.getByLabelText(document, "Chart title")

    const xLabel = domTesting.getByLabelText(document, "X label")
    const yLabel = domTesting.getByLabelText(document, "Y label")
    
    const yValues = domTesting.getAllByLabelText(document, "Y")
    const yValue = yValues[0]

    const buttons = domTesting.queryAllByRole(document, "button")
    var generateButton = buttons[0]

    //make sure the correct button is selected
    expect(generateButton).toHaveTextContent("Generate chart")

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
    initDomFromFiles(`${__dirname}/line.html`, `${__dirname}/line.js`)

    const chartTitle = domTesting.getByLabelText(document, "Chart title")

    const xLabel = domTesting.getByLabelText(document, "X label")
    const yLabel = domTesting.getByLabelText(document, "Y label")
    
    const xValues = domTesting.getAllByLabelText(document, "X")
    const xValue = xValues[0]

    const buttons = domTesting.queryAllByRole(document, "button")
    var generateButton = buttons[0]

    //make sure the correct button is selected
    expect(generateButton).toHaveTextContent("Generate chart")

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
test('All chart values are cleared when Clear Chart Data is pressed', async function(){
    initDomFromFiles(`${__dirname}/line.html`, `${__dirname}/line.js`)

    const chartTitle = domTesting.getByLabelText(document, "Chart title")
    const xLabel = domTesting.getByLabelText(document, "X label")
    const yLabel = domTesting.getByLabelText(document, "Y label")

    const buttons = domTesting.queryAllByRole(document, "button")
    const clearButton = buttons[1]

    //make sure the correct button is selected
    expect(clearButton).toHaveTextContent("Clear chart data")

    const user = userEvent.setup()

    await user.type(chartTitle, "Random Chart Title")
    await user.type(xLabel, "X Label Name :)")
    await user.type(yLabel, "Y Label Name :)")

    xValues = domTesting.getAllByLabelText(document, "X")
    yValues = domTesting.getAllByLabelText(document, "Y")

    expect(xLabel).toHaveValue("X Label Name :)")
    expect(yLabel).toHaveValue("Y Label Name :)")
    expect(chartTitle).toHaveValue("Random Chart Title")

    await user.click(clearButton)

    expect(xLabel).toHaveValue("")
    expect(yLabel).toHaveValue("")
    expect(chartTitle).toHaveValue("")
})

test('X and Y cell count is reduced to 1 when Clear Chart Data is pressed', async function(){
    initDomFromFiles(`${__dirname}/line.html`, `${__dirname}/line.js`)

    const chartTitle = domTesting.getByLabelText(document, "Chart title")

    const xLabel = domTesting.getByLabelText(document, "X label")
    const yLabel = domTesting.getByLabelText(document, "Y label")
    
    var xValues = domTesting.getAllByLabelText(document, "X")
    var yValues = domTesting.getAllByLabelText(document, "Y")
    const xValue = xValues[0]
    const yValue = yValues[0]

    const buttons = domTesting.queryAllByRole(document, "button")
    const clearButton = buttons[1]
    const addButton = buttons[3];
    
    //make sure the correct button is selected
    expect(addButton).toHaveTextContent("+")
    expect(clearButton).toHaveTextContent("Clear chart data")
    expect(xValues).toHaveLength(1)
    expect(yValues).toHaveLength(1)

    const user = userEvent.setup()

    await user.type(chartTitle, "Random Chart Title")
    await user.type(xLabel, "X Label Name :)")
    await user.type(yLabel, "Y Label Name :)")
    await user.type(xValue, "22")
    await user.type(yValue, "33")
    await user.click(addButton)
    await user.click(addButton)

    xValues = domTesting.getAllByLabelText(document, "X")
    yValues = domTesting.getAllByLabelText(document, "Y")

    expect(xValues).toHaveLength(3)
    expect(yValues).toHaveLength(3)

    await user.click(clearButton)

    xValues = domTesting.getAllByLabelText(document, "X")
    yValues = domTesting.getAllByLabelText(document, "Y")

    expect(xLabel).toHaveValue("")
    expect(yLabel).toHaveValue("")
    expect(chartTitle).toHaveValue("")
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
    
    /* Create a spy for generateChartImg */
    const generateSpy = jest.spyOn({ generateChartImg }, 'generateChartImg')
    /* Stub it to avoid actually connecting to the API */
    generateSpy.mockImplementation(() => {
        return 'https://placehold.co/600x400';
    });


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
    expect(generateSpy).toHaveBeenCalledTimes(1)

    const passedData = generateSpy.mock.calls[0]
    expect(passedData).toMatchObject({
        type: 'line',
        data: [
            {x: 1, y: 2},
            {x: 3, y: 4},
            {x: 5, y: 6},
        ],
        xLabel: 'My X Label',
        yLabel: 'My Y Label'
    })

    
    generateSpy.mockRestore()
})
test('Spy on image url to see if all values are correcly sent over', async function(){

})