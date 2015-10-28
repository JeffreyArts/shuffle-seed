var seedrandom = require('seedrandom');
var util = require('util');
var self = {};

var extend = function(obj) {
	for (var i = 1; i < arguments.length; i++) for (var key in arguments[i]) obj[key] = arguments[i][key];
	return obj;
}

var seedify = function(seed){
	if (util.isNumber(seed) || util.isString(seed)) return seed;
	if (isNaN(seed)) return Number(String((this.strSeed = seed)).split('').map(function(x){return x.charCodeAt(0)}).join(''));
	return seed;
}

var seedRand = function(func,min,max){
	return Math.floor(func() * (max - min + 1)) + min;
}

self.shuffle = function(arr,seed){
	if (!util.isArray(arr)) return null;
	seed = seedify(seed) || 'none';

	var size = arr.length;
	var rng = seedrandom(seed);
	var resp = [];
	var keys = [];

	for(var i=0;i<size;i++) keys.push(i);
	for(var i=0;i<size;i++){
		var r = seedRand(rng,0,keys.length-1);
		var g = keys[r];
		keys.splice(r,1);
		resp.push(arr[g]);
	}
	return resp;
}

self.unshuffle = function(arr,seed){
	if (!util.isArray(arr)) return null;
	seed = seedify(seed) || 'none';

	var size = arr.length;
	var rng = seedrandom(seed);
	var resp = [];
	var map = [];
	var keys = [];

	for(var i=0;i<size;i++) {
		resp.push(null);
		keys.push(i);
	}

	for(var i=0;i<size;i++){
		var r = seedRand(rng,0,keys.length-1);
		var g = keys[r];
		keys.splice(r,1);
		resp[g]=arr[i];
	}

	return resp;
}

module.exports = self;
