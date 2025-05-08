const fs = require('fs');

try {
    fs.unlinkSync('output.json');
    console.log('output.json deleted successfully');
} catch (err) {
    if (err.code === 'ENOENT') {
        console.log('output.json does not exist');
    } else {
        console.error('Error deleting output.json:', err);
    }
}

try {
    fs.unlinkSync('allocation.xlsx');
    console.log('allocation.xlsx deleted successfully');
} catch (err) {
    if (err.code === 'ENOENT') {
        console.log('allocation.xlsx does not exist');
    } else {
        console.error('Error deleting allocation.xlsx:', err);
    }
}