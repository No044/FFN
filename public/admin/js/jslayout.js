//lọc trạng thái
const Button = document.querySelectorAll("[button-status]")
if (Button.length > 0) {
    let url = new URL(window.location.href)
    Button.forEach((item) => {
        item.addEventListener("click", () => {
            const status = item.getAttribute("button-status")
            if (status) {
                url.searchParams.set("status", status)
            }
            else {
                url.searchParams.delete("status")
            }
            window.location.href = url.href
        })
    })
}


//tìm kiếm
const form = document.querySelector("#form-seach")
if (form) {
    let url = new URL(window.location.href)
    form.addEventListener("submit", (e) => {
        e.preventDefault()
        const data = e.target.elements.keyword.value
        if (data) {
            url.searchParams.set("key", data)
        }
        else {
            url.searchParams.delete("key")
        }
        window.location.href = url.href
    })
}


// tính năng phân trang
const buttonpaginet = document.querySelectorAll("[buttonpaginet]")
if (buttonpaginet.length > 0) {
    let url = new URL(window.location.href)
    buttonpaginet.forEach((item) => {
        item.addEventListener("click", () => {
            const page = item.getAttribute("buttonpaginet")
            if (page) {
                url.searchParams.set("page", page)
            }
            else {
                url.searchParams.delete("page")
            }
            window.location.href = url.href
        })
    })
}


//tính năng thay đổi trạng thái sản phẩm
const buttonchangestatus = document.querySelectorAll("[buttonchangestatus]")
if (buttonchangestatus.length > 0) {
    const form = document.querySelector("[form-change-status]")
    const path = form.getAttribute("data-path")
    buttonchangestatus.forEach((item) => {
        item.addEventListener('click', () => {
            console.log("đã chạy vào đây")
            const status = item.getAttribute("status")
            const id = item.getAttribute("id")
            const statusuppdate = status == "active" ? "inactive" : "active"
            const action = `${path}/${statusuppdate}/${id}?_method=PATCH`
            form.action = action
            form.submit();
        })
    })
}


//tính năng checkall
const checkboxfather = document.querySelector("[checkboxfather]")
if (checkboxfather) {
    const checkall = checkboxfather.querySelector("input[name='checkall']")
    const input = checkboxfather.querySelectorAll("input[name='id']")
    checkall.addEventListener('click', () => {
        if (checkall.checked == true) {
            input.forEach((item) => {
                item.checked = true
            })
        }
        else {
            input.forEach((item) => {
                item.checked = false
            })
        }

    })
    input.forEach((item) => {
        item.addEventListener('click', () => {
            const inputcheck = checkboxfather.querySelectorAll("input[name='id']:checked")
            if (input.length == inputcheck.length) {
                checkall.checked = true
            }
            else {
                checkall.checked = false
            }
        })
    })
}



// tính năng thay đổi all
const formchangemulti = document.querySelector("[form-change-multi]")
if (formchangemulti) {
    formchangemulti.addEventListener('submit', async (e) => {
        e.preventDefault()
        const type = e.target.elements.type.value
        const input = checkboxfather.querySelectorAll("input[name='id']:checked")
        if (input.length > 0) {
            if (type == "deleteall") {
                const result = await Swal.fire({
                    title: "Are you sure?",
                    text: "You won't be able to revert this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, delete it!"
                })
                if (!result.isConfirmed) {
                  return
                }
                }
                const inputall = formchangemulti.querySelector("input[name='ids']")
                let inputchange = ""
                input.forEach((item) => {
                    inputchange += item.value + ','
                })
                inputall.value = inputchange.slice(0, inputchange.length - 1)
                formchangemulti.submit()
            }
            else {
                Swal.fire("Vui Lòng Chọn Một Bảng Ghi");
            }

        })

}



// tính năng xóa            
const buttondelete = document.querySelectorAll("[button-delete]")
if (buttondelete) {
    const formdelete = document.querySelector("[form-delete]")
    buttondelete.forEach((item) => {
        item.addEventListener('click', () => {
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
                    const path = formdelete.getAttribute("data-path")                    
                    const dataid = item.getAttribute("data")
                    const action = `${path}/${dataid}?_method=DELETE`
                    console.log(action)
                    formdelete.action = action
                    formdelete.submit()
                }
            })

        })
    })
}



// tính năng showalert
const showalert = document.querySelector("[show-alert]")
if(showalert)
{
 setTimeout(()=> {
    showalert.classList.add("alert-hidden")
 },5000)
 const buttonclose = document.querySelector("[close-alert]")
 buttonclose.addEventListener('click',() => {
    showalert.classList.add("alert-hidden")
 })
}


// tính năng sắp xếp

const selectsort = document.querySelector('[sort-select]')
if(selectsort){
    let url = new URL(window.location.href)
    selectsort.addEventListener('change',(e) => {
        const [key,value] = selectsort.value.split("-")
        console.log(key,value)
        url.searchParams.set("sortkey",key)
        url.searchParams.set("sortvalue",value)
        window.location.href = url.href
    })
}


const button = document.querySelector("[sort-clear]")
console.log(button)
if(button){
    let url = new URL(window.location.href)
    button.addEventListener('click',() => {
        url.searchParams.delete("sortkey")
        url.searchParams.delete("sortvalue")
        window.location.href = url.href;
    })
}



let url = new URL(window.location.href)
const sortkey = url.searchParams.get("sortkey")
const sortvalue = url.searchParams.get("sortvalue")

if(sortkey && sortvalue){
    const string = `${sortkey}-${sortvalue}`
    const selectsort = document.querySelector('[sort-select]')
    const opption = selectsort.querySelector(`option[value="${string}"]`)
    console.log(string)
    opption.selected = true
}

// tính năng phân quyền
const premisson = document.querySelector("[table-permissions]")
console.log(premisson)
if(premisson)
{
    const buttonupdate = document.querySelector("[button-submit]")
    buttonupdate.addEventListener("click",() => {
        const role = []
        const row = premisson.querySelectorAll("[data-name]")
        row.forEach((row) => {
            const name = row.getAttribute("data-name")
            const input = row.querySelectorAll("input")
            if(name == "id"){
               input.forEach((input) => {
                role.push({
                    id : input.value,
                    premisson : []
     
                  })
               })
            }
            else{
                input.forEach((item,index) => {
                    if(item.checked){
                     role[index].premisson.push(name)
                    }
                })

            }
        })
        const form = document.querySelector("[form-change-permissions]")
        const input = form.querySelector("input")
        input.value = JSON.stringify(role)
        form.submit()
    })
}

const datarecord = document.querySelector("[data-records]")
if(datarecord){
   const data = JSON.parse(datarecord.getAttribute("data-records"))
   data.forEach((item,index) => {
    item.permissions.forEach((itemchildren) => {
        const tr = premisson.querySelector(`[data-name="${itemchildren}"]`)
        const ip = tr.querySelectorAll("input")
        console.log(ip)
        console.log(ip[index])
        ip[index].checked = true
    })
   })
}