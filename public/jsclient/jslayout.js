console.log("ok đã chạy vào đây đước")

const addcart = document.querySelectorAll("[addcart]")
console.log(addcart)
addcart.forEach((item) => {
    item.addEventListener('click',(e) => {
        e.preventDefault();
        const id = item.getAttribute("addCart")
        const shop = item.getAttribute("idshop")
        const form = document.querySelector("[formaddcart]")
        console.log(form)
        form.action = `/cart/${shop}/${id}`
        form.submit()
    })
})
const form = document.querySelector("[formaddcart]");
form.addEventListener('submit', (e) => {
    e.preventDefault(); 
});