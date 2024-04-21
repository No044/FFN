const account = require("../../models/account")
const moment = require("moment")
require('moment-timezone'); // Import thư viện moment-timezone

module.exports.index = async (req,res) => {
    const dataaccount = await account.find({ deleted: true }).sort({ createdAt: 1 });

    for(const item of dataaccount){
        item.time = moment(item.createdAt).tz('Asia/Ho_Chi_Minh').format('DD-MM-YYYY HH:mm:ss');
    }
    res.render("admin/page/accountrv/index.pug",{
        dataaccount : dataaccount
    })
}


module.exports.check = async (req,res) => {
    console.log(req.params)
    const dataaccount = await account.findOne(
        { 
            _id : req.params.id,
            deleted: true 
        });
    console.log(dataaccount)
    res.render("admin/page/accountrv/check.pug",{
        dataaccount : dataaccount
    })
}