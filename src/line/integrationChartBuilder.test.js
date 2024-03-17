/**
 * @jest-environment jsdom
 */

 const fs = require("fs")
 const domTesting = require('@testing-library/dom')
 require('@testing-library/jest-dom')
 const userEvent = require("@testing-library/user-event").default

 //Spy on
 const Window = require("./window")
 
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
    const alertMock = jest.spyOn(Window, 'alert');

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
    const alertMock = jest.spyOn(Window, 'alert');

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
    const alertMock = jest.spyOn(Window, 'alert');

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
    const alertMock = jest.spyOn(Window, 'alert');

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
    
    const xValues = domTesting.getAllByLabelText(document, "X")
    const yValues = domTesting.getAllByLabelText(document, "Y")
    const xValue = xValues[0]
    const yValue = yValues[0]

    const buttons = domTesting.queryAllByRole(document, "button")
    var clearButton = buttons[1]

    //make sure the correct button is selected
    expect(clearButton).toHaveTextContent("Clear chart data")

    const user = userEvent.setup()

    await user.type(chartTitle, "Random Chart Title")
    await user.type(xLabel, "X Label Name :)")
    await user.type(yLabel, "Y Label Name :)")
    await user.type(xValue, "22")
    await user.type(yValue, "33")

    expect(xLabel).toHaveValue("X Label Name :)")
    expect(yLabel).toHaveValue("Y Label Name :)")
    expect(xValue).toHaveTextContent("22")
    expect(yValue).toHaveTextContent("33")
    expect(chartTitle).toHaveValue("Random Chart Title")

    await user.click(clearButton)

    expect(xLabel).toHaveValue("")
    expect(yLabel).toHaveValue("")
    expect(xValue).not.toHaveTextContent("22")
    expect(yValue).not.toHaveTextContent("33")
    expect(chartTitle).toHaveValue("")

})

test('X and Y cell count is reduced to 1 when Clear Chart Data is pressed', async function(){
})
test('The chart display is empty after Clear Chart Data is pressed', async function(){
})

//DATA CORRECTLY SENT TO CHART GENERATION FUNCTION
test('Chart title and axis are named', async function(){
})
test('Spy on image url to see if all values are correcly sent over', async function(){
})