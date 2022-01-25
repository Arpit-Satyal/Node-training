module.exports = function(obj1, obj2) {
    if(obj1.description) {
        obj2['description'] = obj1.description;
    }
    if(obj1.status) {
        obj2['status'] = obj1.status;
    }
}