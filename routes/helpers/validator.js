// routes/helpers/validator.js

exports.areInputsValid = areInputsValid;

function areInputsValid (inputs) {
    const num = inputs.length;
    for (var key in inputs) {
        if(typeof inputs[key] === 'undefined') return false;
    }
    return true;
}
