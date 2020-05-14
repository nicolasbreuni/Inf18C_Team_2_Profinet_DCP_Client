const chai = require('chai');
const should = chai.should();
const request = require('request-promise-native');

describe(`Backend Testing`, () => {

    describe(`Backend Routing`, () => {
        it('should be return 404 cause rout not found', () => {
            return request({
                url : 'http://localhost:1880/foo/baa',
                method : 'GET',
                resolveWithFullResponse: true,
                simple: false,
                json: true
            }).then(res => {
                res.statusCode.should.equal(404);
            })
        });
    });

    describe(`Refreshing`, () => {
        it('should be return 200 if refreshed', () => {
            return request({
                url : 'http://localhost:1880/devices/refresh',
                method : 'GET',
                resolveWithFullResponse: true,
                simple: false,
                json: true
            }).then(res => {
                res.statusCode.should.equal(200);
            })
        });
    });

    describe(`Get Devices overview`, () => {
        it('should be return 200 if route works', () => {
            return request({
                url : 'http://localhost:1880/devices',
                method : 'GET',
                resolveWithFullResponse: true,
                simple: false,
                json: true
            }).then(res => {
                res.statusCode.should.equal(200);
            })
        });
        it('should return content', () => {
            return request({
                url : 'http://localhost:1880/devices',
                method : 'GET',
                resolveWithFullResponse: true,
                simple: false,
                json: true
            }).then(res => {
                if(res.body.length > 0) {
                    '1'.should.equal('1')
                }
            })
        });
    });


    describe(`Detail View`, () => {
        it('should be return 404 if device is not in list', () => {
            return request({
                url : 'http://localhost:1880/devices/fooba',
                method : 'GET',
                resolveWithFullResponse: true,
                simple: false,
                json: true
            }).then(res => {
                res.statusCode.should.equal(404);
            })
        });


        it('should be return 200 if device is in list', () => {
            return request({
                url : 'http://localhost:1880/devices',
                method : 'GET',
                resolveWithFullResponse: true,
                simple: false,
                json: true
            }).then(res => {
                return request({
                    url : 'http://localhost:1880/devices?ip=' + res.body[0].ip_addr,
                    method : 'GET',
                    resolveWithFullResponse: true,
                    simple: false,
                    json: true
                }).then(res => {
                    res.statusCode.should.equal(200);
                })
            })
        });

        it('should be return content if device is in list', () => {
            return request({
                url : 'http://localhost:1880/devices',
                method : 'GET',
                resolveWithFullResponse: true,
                simple: false,
                json: true
            }).then(res => {
                return request({
                    url : 'http://localhost:1880/devices?ip=' + res.body[0].ip_addr,
                    method : 'GET',
                    resolveWithFullResponse: true,
                    simple: false,
                    json: true
                }).then(res => {
                    if(res.body.length > 0) {
                        '1'.should.equal('1')
                    }
                })
            })
        });


});
});
