// 1. 조건을 만족하는 객체 person 만들기
const person = {
    name: "Alice",       // 이름
    age: 25,             // 나이
    isEmployed: false,   // 취업 여부 (논리형)
    address: undefined,  // 주소: 할당하지 않음
    pet: null            // 애완동물: 비어있음을 명시 (null 사용)
  };
  
  // 2. 다양한 타입의 값을 가진 배열 mixed 만들기
  const mixed = [1, 2, 3, "four", false];
  
  // 3. 사용할 수 없는 변수 이름에 주석 달기
  // let 2cool = true;         //  숫자로 시작하는 변수명은 허용되지 않음
  // let *private = "secret";  //  특수문자(*)는 변수명으로 사용할 수 없음
  let $dollar = 1000;          //  사용 가능 (특수기호 $는 허용)
  //let my-name = "Lee";       //  하이픈(-)은 변수명에서 연산자로 인식됨
  let camelCaseName = "OK";    //  사용 가능 (카멜케이스 표기법)
  