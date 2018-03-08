'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var x = {
    a: 1,
    b: 2
};

var y = _extends({}, x, {
    c: 3
});

var z = _extends({}, y, {
    a: 4
});

var Car = function () {
    function Car(name) {
        _classCallCheck(this, Car);

        this.name = name;
    }

    _createClass(Car, [{
        key: 'getCarName',
        value: function getCarName() {
            return this.name;
        }
    }]);

    return Car;
}();

var newCard = new Car('Kit');

console.log(newCard);

console.log(newCard.getCarName());