const chat = require("../../models/chat")
const user = require("../../models/accountuser")
module.exports.index = async (req,res) => {
   const userid = res.locals.userclient.id
    _io.once("connection",(socket) => {
        socket.on("client_send_messages", async (data) => {
             const info = {
                user_id : userid,
                content: data,
             }
            const mess = new chat(info)
            await mess.save()
         _io.emit("Sever_render_mess_client", {
           content : mess.content,
           userid : mess.user_id,
           infor : res.locals.userclient

         })
        })
      })

      const newdata = await chat.find({
      })

      if(newdata){
         for(const item of newdata){
            const datauser = await user.findOne({
               _id : item.user_id
            })
            console.log(datauser)
            item.fullname = datauser.fullName
         }
      }
     
 res.render("client/page/chat/index",
    {
        data : newdata,
        userid : userid
    }
 )
}