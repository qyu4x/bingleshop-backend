const healthService = require('../src/service/health.service');

describe('Health Service', () => {
    describe('get', () => {
        it('should return "PONG"', () => {
            const result = healthService.get();
            expect(result).toBe('PONG');
        });
    });
});