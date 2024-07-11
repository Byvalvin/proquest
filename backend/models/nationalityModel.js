import mongoose from 'mongoose'

const nationalitySchema = mongoose.Schema(
    {
        abbr:{type:String, required:true},
        full:{type:String, required:true}
    },
    { _id: false } // no _id should be added to sub docs
);


export default nationalitySchema;