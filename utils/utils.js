exports.createDateFromDotDate = function (dateString) {
    const dateLiterals = dateString.split('.');
    return new Date(parseInt(dateLiterals[2]), parseInt(dateLiterals[1])-1, parseInt(dateLiterals[0]))
}