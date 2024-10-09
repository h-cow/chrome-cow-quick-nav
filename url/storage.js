module.exports = (_localStorage) => {
    const localStorage = (typeof window !== 'undefined' && window.localStorage)
        ? window.localStorage
        : (typeof _localStorage === 'object' && _localStorage !== null)
            ? _localStorage
            : {
                getItem: () => null,
                setItem: () => {},
                removeItem: () => {}
            };
    const { updateUrlTree } = require('./urlUtil.js');

    let storage = localStorage.getItem('hcow_quick_nav') || JSON.stringify({_tree: {}});
    try {
        storage = JSON.parse(storage);
    } catch (error) {
        console.error('hcow quick nav chrome extension was not able to parse it\'s saved data');
        console.error(error);
    }

    const save = () => {
        localStorage.setItem('hcow_quick_nav', JSON.stringify(storage));
    };

    const addUrl = (url) => {
        updateUrlTree(url, storage._tree);
        save();
    };
    return {
        addUrl
    }
}
