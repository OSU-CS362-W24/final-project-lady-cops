const JSDOM = require("jsdom").JSDOM

const dom = new JSDOM(
    "<!DOCTYPE html><p id='hello'>Hello world!</p>"
)