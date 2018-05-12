var mongoose = require('mongoose');


var ProductSchema = new mongoose.Schema(
    {
        pid:Number,
        productName:String,
        productInfo:String,
        productPrice:String,
        imgPath: String,
        meta:{
            createAt:{
                type:Date,
                default:Date.now()
            },
            updateAt:{
                type:Date,
                default:Date.now()
            }
        }
    }
)

ProductSchema.pre("save",function (next) {
    if (this.isNew){
        this.meta.createAt = this.meta.updateAt=Date.now()
    }else{
        this.meta.updateAt=Date.now()
    }
    next()
})

ProductSchema.statics={
    fetch:function (cb) {
        return this.find().sort('meta.updateAt')
            .exec(cb)
    },
    finduser:function (pid,cb) {
        return this.findOne({pid:pid}).exec(cb)
    }
}

module.exports=ProductSchema
