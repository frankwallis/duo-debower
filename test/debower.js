var co = require('co')
var path = require('path')
var should = require('should');

var Debower = require('../lib/debower');
var debower = new Debower()

describe('Debower', function () {
  describe('angular', function () {
    var angularComponent;
      
    beforeEach(co(function* () {
        var angularBower = require('./fixtures/angular.json');
        angularComponent = yield debower.createComponentJson(angularBower);
        console.log(JSON.stringify(angularComponent, null, 4));
    }))
    
    it('should have correct main', function () {
        angularComponent.should.have.property('main', './angular.js');
    })

    it('should have correct scripts', function () {
        angularComponent.should.have.property('scripts').with.lengthOf(1);
    })
  })

  describe('ng-material', function () {
    var materialComponent;
      
    beforeEach(co(function* () {
        var materialBower = require('./fixtures/ng-material.json');
        materialComponent = yield * debower.createComponentJson(materialBower);
        console.log(JSON.stringify(materialComponent, null, 4));
    }))
    
    it('should have correct main', function () {
        materialComponent.should.have.property('main', 'angular-material.js');
    })

    it('should have correct scripts', function () {
        materialComponent.should.have.property('scripts').with.lengthOf(1);
    })
    
    it('should have correct styles', function () {
        materialComponent.should.have.property('styles').with.lengthOf(1);
    })
    
    it('should have correct dependencies', function () {
        materialComponent.should.have.property('dependencies');
        materialComponent.dependencies.should.have.properties({
            "angular/bower-angular": "1.3.x",
            "angular/bower-angular-animate":"1.3.x",
            "angular/bower-angular-aria":"1.3.x",
            "EightMedia/hammer.js":"~2.0.2"    
        });
    })
  })
})