/**
 * @jest-environment jsdom
 */

 const fs = require("fs")
 const domTesting = require('@testing-library/dom')
 require('@testing-library/jest-dom')
 const userEvent = require("@testing-library/user-event").default
 
 function initDomFromFiles(htmlPath, jsPath) {
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
    yLabels = domTesting.getAllByLabelText(document, "Y")

    expect(xValues).toHaveLength(2)
    expect(yValues).toHaveLength(2)
})


//ALERTS DISPLAYED FOR MISSING CHART DATA
test('Error message appears for missing chart title', async function(){
    initDomFromFiles(`${__dirname}/line.html`, `${__dirname}/line.js`)

    const xLabel = domTesting.getByLabelText(document, "X label")
    const yLabel = domTesting.getByLabelText(document, "Y label")
    
    const xValue = domTesting.getByLabelText(document, "X")
    const yValue = domTesting.getByLabelText(document, "Y")

    const chartTitle = domTesting.getByLabelText(document, "Chart title")

    const buttons = domTesting.queryAllByRole(document, "button")
    var generateButton = buttons[2]

    //make sure the correct button is selected
    expect(generateButton).toHaveTextContent("Generate chart")

    //Popups
    const alertMock = jest.spyOn(window,'alert').mockImplementation(); 
    const { getByText, getByTestId } = render(<Form />)

    const user = userEvent.setup()

    await user.type(xLabel, "X Label Name :)")
    await user.type(yLabel, "Y Label Name :(")
    await user.type(xValue, "22")
    await user.type(yValue, "33")
    await user.type(chartTitle, "") //missing chart title

    await user.click(generateButton)
    
    expect(alertMock).toHaveBeenCalledTimes(1)


})
test('Error message appears for missing X Label', async function(){
})
test('Error message appears for missing Y Label', async function(){
})
test('Error message appears for missing X value', async function(){
})
test('Error message appears for missing Y value', async function(){
})


//CLEARING CHART DATA
test('All chart values are cleared when Clear Chart Data is pressed', async function(){
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