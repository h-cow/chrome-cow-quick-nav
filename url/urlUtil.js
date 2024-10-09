/**
 * Updates the URL tree with a new path
 * @param {string} urlPath - The URL path without the origin
 * @param {Object} urlTree - The existing URL tree object
 * @returns {Object} The updated URL tree
 */
function updateUrlTree(urlPath, urlTree) {
    const pathParts = urlPath.split('/').filter(part => part !== '');
    let currentNode = urlTree;

    pathParts.forEach(part => {
        if (!currentNode._b) {
            currentNode._b = {};
        }

        if (!currentNode._b[part]) {
            currentNode._b[part] = {
                _b: {},
                _c: 0
            };
        }

        currentNode._b[part]._c++;
        currentNode = currentNode._b[part];
    });
}

module.exports = { updateUrlTree };
