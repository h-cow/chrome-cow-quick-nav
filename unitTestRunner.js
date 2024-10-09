// Simple test runner
// Helper function to perform deep equality check
const isDeepEqual = (obj1, obj2) => {
    if (obj1 === obj2) return true;
    if (typeof obj1 !== 'object' || typeof obj2 !== 'object' || obj1 == null || obj2 == null) return false;

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) return false;

    for (const key of keys1) {
        if (!keys2.includes(key) || !isDeepEqual(obj1[key], obj2[key])) return false;
    }

    return true;
};

const describe = (description, testFunction) => {
    console.log(`\n${description}`);
    testFunction();
};

const test = (description, testFunction) => {
    try {
        testFunction();
        console.log(`  ✓ ${description}`);
    } catch (error) {
        console.error(`  ✗ ${description}`);
        console.error(`    ${error.message}`);
    }
};

const expect = (actual) => ({
    toEqual: (expected) => {
        let isEqual;
        if (typeof actual === 'object' && actual !== null) {
            isEqual = isDeepEqual(actual, expected);
        } else {
            isEqual = JSON.stringify(actual) === JSON.stringify(expected);
        }
        if (!isEqual) {
            throw new Error(
                `Expected ${JSON.stringify(expected, null, 2)},\n` +
                `but got ${JSON.stringify(actual, null, 2)}`
            );
        }
    },
});

// Export the test functions
module.exports = { describe, test, expect };
