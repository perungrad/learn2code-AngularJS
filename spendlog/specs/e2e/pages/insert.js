var InsertPage;


module.exports = InsertPage = function() {
  browser.get('/');

  this.insertBtn = browser.findElement(by.binding('data.volumeTotal'));
  this.volumeX10 = browser.findElement(by.model('data.volumeX10'));
  this.volumeX1  = browser.findElement(by.model('data.volumeX1'));
  this.volumeX01 = browser.findElement(by.model('data.volumeX01'));
};


InsertPage.prototype.setVolume = function() {
  return this.volumeX10.click().then(function() {
    return this.volumeX1.click();
  }.bind(this));
};
