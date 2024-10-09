const { describe, test, expect } = require('../testing/unitTestRunner.js');
const { updateUrlTree } = require('./urlUtil.js');

describe('updateUrlTree', () => {
  test('should correctly update the URL tree', () => {
    const tree = {};
    updateUrlTree('/path/to/page', tree);

    expect(tree).toEqual({
      _b: {
        path: {
          _c: 1,
          _b: {
            to: {
              _c: 1,
              _b: {
                page: {
                  _c: 1,
                  _b: {}
                }
              }
            }
          }
        }
      }
    });
  });

  test('should increment counts for existing paths', () => {
    const tree = {
      _b: {
        path: {
          _c: 1,
          _b: {
            to: {
              _c: 1,
              _b: {}
            }
          }
        }
      }
    };
    updateUrlTree('/path/to/page', tree);

    expect(tree).toEqual({
      _b: {
        path: {
          _c: 2,
          _b: {
            to: {
              _c: 2,
              _b: {
                page: {
                  _c: 1,
                  _b: {}
                }
              }
            }
          }
        }
      }
    });
  });

  test('should handle a tree that has multiple paths', () => {
    const tree = {};
    updateUrlTree('/path/other/page', tree);
    updateUrlTree('/path/to/page/2', tree);

    expect(tree).toEqual({
      _b: {
        path: {
          _c: 2,
          _b: {
            other: {
              _c: 1,
              _b: {
                page: {
                  _c: 1,
                  _b: {}
                }
              }
            },
            to: {
              _c: 1,
              _b: {
                page: {
                  _c: 1,
                  _b: {
                    '2': {
                      _c: 1,
                      _b: {}
                    }
                  }
                }
              }
            }
          }
        }
      }
    });
  });

  test('should handle path with the word "branch" and "count" in it', () => {
    const tree = {};
    updateUrlTree('/path/branch/count', tree);

    expect(tree).toEqual({
      _b: {
        path: {
          _c: 1,
          _b: {
            branch: {
              _c: 1,
              _b: {
                count: {
                  _c: 1,
                  _b: {}
                }
              }
            }
          }
        }
      }
    });
  });

  test('should handle empty paths', () => {
    const tree = {};
    updateUrlTree('', tree);

    expect(tree).toEqual({});
  });
});