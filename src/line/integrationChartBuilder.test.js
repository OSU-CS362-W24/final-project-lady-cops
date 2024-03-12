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
    
    //count all cells
    


    // Assert that the lists are not empty
	// expect(xLabels).toHaveLength(1)
    // expect(yLabels ).toHaveLength(1)



    const user = userEvent.setup()

    await user.click(addButton)

    const xLabels = await domTesting.getAllByLabelText(document, "X label")
    const yLabels = await domTesting.getAllByLabelText(document, "Y label")

    expect(xLabels).toHaveLength(2)
    expect(yLabels ).toHaveLength(2)
})


//ALERTS DISPLAYED FOR MISSING CHART DATA 

//CLEARING CHART DATA

//DATA CORRECTLY SENT TO CHART GENERATION FUNCTION