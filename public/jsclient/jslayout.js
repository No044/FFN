console.log("ok đã chạy vào đây đước")
const addcart = document.querySelectorAll("[addcart]")
console.log(addcart)
//thêm vào giỏ hàng ở trang chủ
addcart.forEach((item) => {
    item.addEventListener('click',(e) => {
        e.preventDefault();
        const id = item.getAttribute("addCart")
        const shop = item.getAttribute("idshop")
        const form = document.querySelector("[formaddcart]")
        console.log(form)
        form.action = `/cart/featured/${shop}/${id}`
        form.submit()
    })
})
const form = document.querySelector("[formaddcart]");
if(form){
    form.addEventListener('submit', (e) => {
        e.preventDefault(); 
    });
    
}


//tamg số lượng trang chi tiết
const qualitycart = document.querySelector("[qualitycart]")
console.log(qualitycart)
if(qualitycart){
    const btntang = qualitycart.querySelector(".btn-up")
    const btngiam = qualitycart.querySelector(".btn-down")
    btntang.addEventListener("click",() => {
        const input = qualitycart.querySelector("[input]")
        console.log(input.value)
        input.value = +input.value + 1
    })
    btngiam.addEventListener("click",() => {
        const input = qualitycart.querySelector("[input]")
        console.log(parseInt(input.value))
        input.value = parseInt(input.value) - 1
    })
}


//thêm vào giỏ hàng
const buttoncart = document.querySelector("[addcartdetail]")
if(buttoncart){
    buttoncart.addEventListener('click',() => {
        console.log('daxdd chạy vào đây')
       const form = document.querySelector("[formdetail]")
       const id = buttoncart.getAttribute("addcartdetail")
       const shopid = buttoncart.getAttribute("shopid")
       const quality = qualitycart.querySelector("[input]")
       form.action = `/cart/detail/${shopid}/${id}/${quality.value}`
       form.submit()
    })
}



//nut tang so luong trong trang gio hang
const qualityincart = document.querySelector("[qualityincart]")
if(qualityincart){
    const datacart = qualityincart.querySelectorAll("[datacart]")
    datacart.forEach((item) => {
        const input = item.querySelector("[inputcart]")
        const btntang = item.querySelector(".btn-up")
        const btngiam = item.querySelector(".btn-down")
        btntang.addEventListener('click',() => {
            input.value = parseInt(input.value) + 1
            input.dispatchEvent(new Event('change'));
        })
        btngiam.addEventListener('click',() => {
            input.value = parseInt(input.value) - 1
            input.dispatchEvent(new Event('change'));
        })
        
    })
}


//input tang so luong
    const input = document.querySelectorAll("[inputcart]")
    input.forEach((item) => {
        item.addEventListener('change',() => {
            console.log("Đã chạy vào đây")
            const id = item.getAttribute("idsanpham")
            const form = document.querySelector("[formchangeinput]")
            form.action=`/cart/cartuser/${id}/${item.value}`
            form.submit()
        })
    })


//xóa sản phẩm trong giỏ hàng
if(qualityincart){
    const buttondelete = qualityincart.querySelectorAll("[buttondeletecart]")
    buttondelete.forEach((item) => {
        item.addEventListener("click", () => {
            console.log("đã chạy vào đây")
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                    const formchangeinput = document.querySelector("[formchangeinput]")
                    const id = item.getAttribute("buttondeletecart")
                    formchangeinput.action = `/cart/cartuser/${id}`
                    formchangeinput.submit()
                }
            })
        })
    })
}


const iduserchat = document.querySelector("[datauserid]")
console.log(iduserchat)
if(iduserchat){
    const id = iduserchat.getAttribute("datauserid")
    iduserchat.addEventListener("click",() => {
        const form = document.querySelector("[submitchat]")
        form.action = `/chat/${id}`
        form.submit()
    })
}