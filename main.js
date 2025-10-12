let myLeads=[]
let oldLead=[]
const inputEl=document.getElementById("input-el")
const inputBtn=document.getElementById("input-btn")
const ulEl=document.getElementById("ul-el")
const deleteBtn=document.getElementById("delete-btn")
const tabBtn=document.getElementById("tab-btn")


// Adding delete button
deleteBtn.addEventListener("dblclick",function(){
    localStorage.clear()
    myLeads=[]
    render(myLeads)
})

let leadsFromLocalStorage=JSON.parse(localStorage.getItem("myLeads"))
console.log(leadsFromLocalStorage)


if(leadsFromLocalStorage){
    myLeads=leadsFromLocalStorage
    render(myLeads)
}

tabBtn.addEventListener("click",function (){
    chrome.tabs.query({active:true,currentWindow:true},function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads",JSON.stringify(myLeads))
        render(myLeads)
    })
})

function render(leads){
    let listItems=""
    for(let i=0;i<leads.length;i++){
        listItems+=`<li>
                        <a href='${leads[i]}' target='_blank'>${leads[i]}</a>
                    </li>`
    }
    ulEl.innerHTML=listItems

}
//Save button functionality
inputBtn.addEventListener("click",function(){
    myLeads.push(inputEl.value)
    inputEl.value=""
    localStorage.setItem("myLeads",JSON.stringify(myLeads))
    render(myLeads)
})
