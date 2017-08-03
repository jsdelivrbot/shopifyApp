var mongoose = require('mongoose')

var Store = mongoose.model('Store',{
    name: {
        type: String,
        required: true
    }, 
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    },
    _user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
});

module.exports = {
    Todo: Todo
}