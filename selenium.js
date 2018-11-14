const assert = require('assert');
const test = require('selenium-webdriver');
const webdriver = require('selenium-webdriver');

let driver;


describe('Adding a note', function () {

    beforeEach(function (done) {
        driver = new webdriver.Builder()
            .usingServer()
            .withCapabilities({
                'browserName': 'chrome'
            }).build();
        driver.get('http://localhost:8080/todo');
        done();
    });

    afterEach(function (done) {
        driver.quit();
        done()
    });

    it('Testing webpage Title', function (done) {
        var promis = driver.getTitle();
        promis.then(function (title) {
            assert.equal(title, 'My todolist')
        });
        done();
    });
    it('Testing input of note', function (done) {

        var adding = driver.findElement(webdriver.By.id("newttodo"));
        adding.sendKeys('new to List');
        adding.getAttribute('value').then(function(value){
            assert.equal(value, 'new to the List')
        });
        done();
    });

    it('Testing add note', function (done) {

        var adding = driver.findElement(webdriver.By.id("newttodo"));
        adding.sendKeys('new to List');
        adding = driver.findElement(webdriver.By.id("submit"));
        adding.click();
        var list = driver.findElement(webdriver.By.id("new to List"));
            list.getAttribute('value').then(function(value){
            assert.equal(value, 'new to the List')
        });
        done();
    });

    it('Testing Edit of note', function (done) {

        var adding = driver.findElement(webdriver.By.id("newttodo"));
        adding.sendKeys('new to List');
        adding = driver.findElement(webdriver.By.id("submit"));
        adding.click();
        adding = driver.findElement(webdriver.By.id("editnew to List"));
        adding.click();
        adding = driver.findElement(webdriver.By.id("newttodo"));
        adding.sendKeys('This is new');
        adding = driver.findElement(webdriver.By.id("submit"));
        adding.click();
        var list = driver.findElement(webdriver.By.id("This is new"));
        list.getAttribute('value').then(function(value){
            assert.equal(value, 'This is new')
        });
        done();
    });


});