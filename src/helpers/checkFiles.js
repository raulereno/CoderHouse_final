module.exports = function checkFiles(files, arg, options) {

    const find = files.find(e => e.name === arg)
    if (find) {
        return options.fn(this);

    } else {
        return options.inverse(this);
    }
};
