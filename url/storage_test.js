const { describe, test, expect } = require('../testing/unitTestRunner.js');

// Mock localStorage
const mockLocalStorage = {
    storage: {},
    getItem: function(key) {
        return this.storage[key] || null;
    },
    setItem: function(key, value) {
        this.storage[key] = value;
    }
};

const createStorage = require('./storage.js');

describe('storage', () => {
    test('addUrl should add URL to localStorage', () => {
        const storage = createStorage(mockLocalStorage);
        
        storage.addUrl('/test/url');
        
        const savedData = JSON.parse(mockLocalStorage.getItem('hcow_quick_nav'));
        expect(savedData).toEqual({
            _tree: {
                _b: {
                    test: {
                        _c: 1,
                        _b: {
                            url: {
                                _c: 1,
                                _b: {}
                            }
                        }
                    }
                }
            }
        });
    });

    test('existing localStorage should work with 2 new urls being added', () => {
        mockLocalStorage.setItem('hcow_quick_nav', JSON.stringify({
            _tree: {
                _b: {
                    test: {
                        _c: 5,
                        _b: {
                            url: {
                                _c: 1,
                                _b: {}
                            }
                        }
                    }
                }
            }
        }));

        const storage = createStorage(mockLocalStorage);

        storage.addUrl('/test/url');
        storage.addUrl('/test/url2');

        const savedData = JSON.parse(mockLocalStorage.getItem('hcow_quick_nav'));
        expect(savedData).toEqual({
            _tree: {
                _b: {
                    test: {
                        _c: 7,
                        _b: {
                            url: {
                                _c: 2,
                                _b: {}
                            },
                            url2: {
                                _c: 1,
                                _b: {}
                            }
                        }
                    }
                }
            }
        });
    });
});
