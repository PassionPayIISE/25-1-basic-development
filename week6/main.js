let target = document.querySelector("#dynamic");

function randomString(){
    //타자 치는 효과
    let stringArr=["PassionPay"];
    let selectString=stringArr[Math.floor(Math.random()*stringArr.length)];
    let selectStringArr=selectString.split("");

    return selectStringArr;
}

//타이핑 리셋
function resetTyping(){
    target.textContent="";
    dynamic(randomString());
}

//한글자씩 텍스트 출력력
function dynamic(randomArr){

    if(randomArr.length>0){
        target.textContent += randomArr.shift();
        setTimeout(function(){
            dynamic(randomArr);
        },80);
    }else{
        setTimeout(resetTyping,3000);
    }
}
dynamic(randomString());

//깜빡이기
function blink(){
    target.classList.toggle("active");
}
setInterval(blink,500);