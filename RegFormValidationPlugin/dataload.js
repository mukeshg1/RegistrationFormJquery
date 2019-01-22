const databody = document.querySelector("#table_user > tbody");
const html_code ='<input type="button" value="Edit" id="b_Edit"><input type="button" value="Delete" id="b_Del"></input>';

function DataToBody()
{
    const request = new XMLHttpRequest();
    request.open("get", "tabledata.json");
    request.onload = () => {
        try{
            const json = JSON.parse(request.responseText);
            populateBody(json);
        } catch (e){
            console.warn(e);
        }
    };
    request.send();
}
function populateBody(json){
    json.forEach((row) => {
        const tr = document.createElement("tr");
        row.forEach((cell) =>{
            const td = document.createElement("td");
            td.textContent = cell;
            tr.appendChild(td);
        });
        databody.appendChild(tr);
        
    });
    
}
document.addEventListener("DOMContentLoaded", () => { DataToBody(); });