function itemTemplate(item){
  return `<li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
    <span class="item-text">${item.text}</span>
    <div>
      <button data-id="${item._id}" class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
      <button data-id="${item._id}" class="delete-me btn btn-danger btn-sm">Delete</button>
    </div>
  </li>`
}
//Pgae Load rendering
let ourHTML = items.map(function(item){
  return itemTemplate(item)
}).join("")
document.getElementById("item-list").insertAdjacentHTML("beforeend", ourHTML)



let createField = document.getElementById("create-field")

document.getElementById("create-form").addEventListener("submit", function(event){
  event.preventDefault()
  axios.post('/create',{text: createField.value}).then(function(response){
    // Create New Item
    document.getElementById("item-list").insertAdjacentHTML("beforeend", itemTemplate(response.data))
    createField.value = ""
    createField.focus()

  }).catch(function(){
    console.log("please try again later")
  })
})




document.addEventListener("click", function(event){
  
  //Delete Feature
  if(event.target.classList.contains("delete-me")){
    if(confirm("Are You Sure You Want To Delete This Task?")){
      axios.post('/delete-item',{id: event.target.getAttribute("data-id")}).then(function(){
        event.target.parentElement.parentElement.remove()
      }).catch(function(){
        console.log("please try again later")
      })
    }
    
  }
  
  
  //Update Feature
  if(event.target.classList.contains("edit-me")){
    let userInput = prompt("Enter Your New Value",event.target.parentElement.parentElement.querySelector(".item-text").innerHTML)
    if(userInput){
      axios.post('/update-item',{text: userInput, id: event.target.getAttribute("data-id")}).then(function(){
        event.target.parentElement.parentElement.querySelector(".item-text").innerHTML = userInput
      }).catch(function(){
        console.log("please try again later")
      })
    }
  }

})