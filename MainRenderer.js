const electron = require("electron");
const { ipcRenderer } = electron;

const ul = document.querySelector("ul");

ipcRenderer.on("item:add",function(e, item){
    console.log("item in receiving window - ",item);
    const li = document.createElement("li");
    const itemText = document.createTextNode(item);
    li.appendChild(itemText);
    ul.appendChild(li);
});

ipcRenderer.on("item:clear",function(){
    ul.innerHTML = "";
})

ul.addEventListener("dblclick",removeItem);

const removeItem = (event) => {
    event.target.remove();
}