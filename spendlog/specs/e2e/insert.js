describe('Insert', function() {
    'use strict';

    var InsertPage = require('./pages/insert');
    var page;


    beforeEach(function() {
        // browser.get('/');
        page = new InsertPage();
    });


    it('should render Insert page', function() {
      expect(browser.findElement(by.binding('data.volumeTotal'))
        .getText())
        .toBe('0.00');
      expect(browser.findElement(by.model('data.volumeX10'))
        .getAttribute('value'))
        .toBe('0');
      expect(browser.findElement(by.model('data.volumeX1'))
        .getAttribute('value'))
        .toBe('0');
      expect(browser.findElement(by.model('data.volumeX01'))
        .getAttribute('value'))
        .toBe('0');
    });

    it('should setup volume', function() {
      var insertBtn = browser.findElement(by.binding('data.volumeTotal'));
      var volumeX10 = browser.findElement(by.model('data.volumeX10'))
      var volumeX1  = browser.findElement(by.model('data.volumeX1'))

      expect(insertBtn.getAttribute('disabled')).toBe('true');

      volumeX10.click().then(function() {
        expect(volumeX10.getAttribute('value')).toBe('5');
      });
      volumeX1.click().then(function() {
        expect(volumeX1.getAttribute('value')).toBe('5');
      });

      expect(insertBtn.getText())
        .toBe('55.00');
      expect(insertBtn.getAttribute('disabled'))
        .toBe(null);
    });

    it('should store expense', function() {
      page.setVolume().then(function() {
        page.insertBtn.click().then(function() {

          browser.findElement(by.css('.modal-dialog h4')).then(function(el) {
            el.getText().then(function(text) {
              // console.log(text)
            })
          })
        })
      });
    });
});
