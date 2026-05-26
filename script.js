const input = document.querySelector("#input");
const btn = document.querySelector("#btn");
const list = document.querySelector("#list");

let arr = JSON.parse(localStorage.getItem("todo")) || []; // 저장된 데이터 가져오기

function showList(){ // 화면 다시 출력하는 함수

    list.innerHTML = "";

    for(let i = 0; i < arr.length; i++){

        let li = document.createElement("li");

        if(arr[i].check == true){
            li.classList.add("done");
        }

        li.innerHTML = `
        ${arr[i].text}
        <button onclick="finish(${i})">완료</button>
        <button onclick="fix(${i})">수정</button>
        <button onclick="del(${i})">삭제</button>
        `;

        list.appendChild(li);
    }
    localStorage.setItem("todo", JSON.stringify(arr)); // 로컬스토리지 저장
}

function add(){ // 추가 기능

    let value = input.value;

    if(value == ""){
        alert("입력하세요");
        return;
    }

    let obj = {
        text : value,
        check : false
    };

    arr.push(obj);
    input.value = "";
    showList();
}

function finish(i){ // 완료 기능
    arr[i].check = !arr[i].check;
    showList();
}

function del(i){ // 삭제 기능
    arr.splice(i,1);
    showList();
}

function fix(i){ // 수정 기능
    let change = prompt("수정할 내용", arr[i].text);
    if(change != null){
        arr[i].text = change;
    }
    showList();
}

btn.onclick = function(){ // 버튼 클릭
    add();
}

input.onkeydown = function(e){ // 엔터키

    if(e.key == "Enter"){
        add();
    }

}

showList(); // 처음 실행