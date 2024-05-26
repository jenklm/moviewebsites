import React from "react";
import { useState, useNavigate } from "react";
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container=styled.div`
text-align:center;
justify-content: center;
align-items: center;
color:#fff;
width:100%;
height:100%;
height: 100vh;
display: flex;
flex-direction: column; 
background-color: rgb(7, 7, 61);
`;


const MainText = styled.h2`
  color: #fff;
  margin-bottom: 10px;
  font-size: 30px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputField = styled.input`
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #333;
  border-radius: 50px;
  width: 600px;
  height: 30px;
  margin-bottom: 10px;
`;

const SubmitBtn = styled.button`
  color:#000;
  font-size: 20px;
  font-weight: bold;
  border-style: none;
  border: 1px solid #333;
  border-radius: 50px;
  width: 630px;
  height: 70px;
  margin-top: 50px;
  background-color: ${({ isValid }) => isValid ? 'yellow' : '#fff'};
`;

const LoginWrapper = styled.div`
  margin-top: 20px;
`;

const LoginText = styled.p`
  color:#fff;
  white-space: nowrap; 
  text-decoration-line: none;
  text-decoration : none;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;


export default function SignUpPage() {
  const [name, setName] = useState('');
  const [id, setId]=useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // value.trim()이 빈 문자열이 아니면, 이는 True 값. ! 연산자는 이 True 값을 False로 변환.
  // value가 공백만으로 이루어져 있거나 빈 문자열일 경우, 조건이 성립하여 블록 내부 코드가 실행됨.
  const validateName = (value) => {
    if (!value.trim()) {
      return '이름을 입력해주세요.';
    } 
    // '/^'는 문자열의 시작을 의미. 
    // '[가-힣a-zA-Z]' 는 한글 문자 가-힣 또는 영문 대소문자 (a-zA-Z) 중 하나를 의미.
    // + 는 앞의 문자 클래스인 '[가-힣a-zA-Z]'가 하나 이상 이어지는 것을 의미.
    // $ 는 문자열의 끝을 의미.
    // '/.test(value)는 정규 표현식 객체의 test 메서드를 호출하는 것. test 메서드는 문자열 value가 정규 표현식과 일치하는지 검사함. 일치하면 true 아니면 false
    else if (!/^[가-힣a-zA-Z]+$/.test(value)) {
      return '이름은 한글 또는 영어로만 이루어져야 합니다.';
    }
    return '';
  };

  const validateId = (value) => {
    if (!value.trim()) {
      return '아이디를 입력해주세요.';
    } 
    else if (!/(?=.*[a-zA-Z])(?=.*\d)/.test(value)) {
      return '이름은 한글 또는 영어로만 이루어져야 합니다.';
    }
    return '';
  };

  const validateEmail = (value) => {
    if (!value.trim()) {
      return '이메일을 입력해주세요.';
    }
    // '\.' 는 이스케이프된 마침표로, 마침표 자체를 의미함. 정규 표현식에서 특수 문자인 마침표(.)를 문자 그대로 해석하도록 하기 위해 이스케이프(\) 문자를 사용  
    // {2, } 는 앞의 문자 클래스가 최소 2회 이상 반복됨을 의미.  최상위 도메인(TLD)은 최소 두 글자의 영문자로 구성되어야 함. 
    else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/.test(value)) {
      return '올바른 이메일 형식을 입력해주세요.';
    }
    return '';
  };

  const validateAge = (value) => {
    if (!value.trim()) {
      return '나이를 입력해주세요.';
    } else if (isNaN(value) || value < 0 || value < 19) {
      return '미성년자는 가입할 수 없습니다!';
    }
    return '';
  };

  const validatePassword = (value) => {
    if (!value.trim()) {
      return '비밀번호를 입력해주세요.';
    } 
    else if (value.length < 4) {
      return '최소 4자리 이상 입력해주세요.';
    }
    else if(value.length > 12){
      return '비밀번호는 최소 12자리까지 입력 가능합니다.'
    } 
    // 앞 뒤의 '/'는 정규 표현식의 시작과 끝을 나타냄. 
    // (?=.*[a-zA-Z]) => 문자열에 하나 이상의 영문자가 포함되어 있는지 확인. 
    // (?=.*\d) => 문자열에 하나 이상의 숫자가 포함되어 있는지 확인. '\d'는 숫자(0-9)를 의미.
    // (?=.*[!@#$%^&*()]) => 문자열에 하나 이상의 특수 문자(!@#$%^&*())가 포함되어 있는지 확인
    // ===> 문자열이 세 가지 조건을 모두 만족하는 지를 검사
    /* 정규 표현식에서 (?=.*pattern)는 긍정형 전방탐색(Positive Lookahead)으로, 특정 패턴이 문자열 어딘가에 존재하는지를 확인하는 데 사용. 
       즉, (?=.*pattern)은 주어진 문자열 내에 특정 패턴이 최소한 하나 이상 존재하는지 여부를 검사. 문자열 내에서 패턴의 존재 여부를 확인.
       '.*'는 임의의 문자(줄바꿈 문자를 제외한 모든 문자)가 0번 이상 반복되는 것을 의미. 
       '(?= ...)'는 긍정형 전방탐색으로, 내부의 패턴이 뒤따르는 문자열 어딘가에 존재해야 한다는 것을 의미
    */
    else if(!/(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()])/.test(value)){
      return '비밀번호는 영어, 숫자, 특수문자를 포함해주세요.';
    }
    return '';
  };

  const validateConfirmPassword = (value) => {
    if (!value.trim()) {
      return '비밀번호를 확인해주세요.';
    } else if (value !== password) {
      return '비밀번호가 일치하지 않습니다.';
    }
    return '';
  };


  const handleSubmit = (e) => {
    e.preventDefault(); // 페이지 새로고침을 방지하고, 대신 JavaScript로 유효성 검사를 처리함. preventDefault 안할 경우, 폼이 계속 새로고침됨..
    setSubmitted(true);

    const nameError = validateName(name);
    const idError = validateId(id);
    const emailError = validateEmail(email);
    const ageError = validateAge(age);
    const passwordError = validatePassword(password);
    const confirmPasswordError = validateConfirmPassword(confirmPassword);

    if (!nameError && !idError && !emailError && !ageError && !passwordError && !confirmPasswordError) {
      console.log('유효성 검사 통과!');
      console.log('이름:', name);
      console.log('아이디:',id);
      console.log('이메일:', email);
      console.log('나이:', age);
      console.log('비밀번호:', password);
      console.log('비밀번호 확인:', confirmPassword);
      
    } else {
      console.log('유효성 검사 실패!');
    }

  };

  // isValid => 모든 조건이 부합하면 제출하기 버튼 색 바꿀때 쓰임
  // isValid가 true이면 모든 유효성 검사 함수가 빈 문자열(즉, 오류가 없음)을 반환한 것이고, 이 경우 제출 버튼의 색상이 변경됨!!
  const isValid =
  !validateName(name) &&
  !validateId(id) &&
  !validateEmail(email) &&
  !validateAge(age) &&
  !validatePassword(password) &&
  !validateConfirmPassword(confirmPassword);

  
  
    return (

    <Container>
      <div>
        <MainText>회원가입 페이지</MainText>
        <form onSubmit={handleSubmit}>
          <InputWrapper>
            <InputField
              type="text"
              placeholder="이름을 입력해주세요"
              value={name}
              //실시간으로 에러문이 변동될 때 
              onChange={(e) => setName(e.target.value)}
            />
            {(submitted && validateName(name)) && <p style={{ color: 'red', fontSize: "15px" }}>{validateName(name)}</p>}
            <InputField
              type="text"
              placeholder="아이디를 입력해주세요"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
            <InputField
              type="email"
              placeholder="이메일을 입력해주세요"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {(submitted && validateEmail(email)) && <p style={{ color: 'red', fontSize: "15px" }}>{validateEmail(email)}</p>}
            <InputField
              type="text"
              placeholder="나이를 입력해주세요"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
            {(submitted && validateAge(age)) && <p style={{ color: 'red', fontSize: "15px" }}>{validateAge(age)}</p>}
            <InputField
              type="password"
              placeholder="비밀번호를 입력해주세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {(submitted && validatePassword(password)) && <p style={{ color: 'red', fontSize: "15px" }}>{validatePassword(password)}</p>}
            <InputField
              type="password"
              placeholder="비밀번호 확인"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {(submitted && validateConfirmPassword(confirmPassword)) && <p style={{ color: 'red', fontSize: "15px" }}>{validateConfirmPassword(confirmPassword)}</p>}
          </InputWrapper>
          <SubmitBtn type="submit" isValid={isValid}>제출하기</SubmitBtn>
          
        </form>
        <LoginWrapper>
        <LoginText>이미 아이디가 있으신가요? <StyledLink to="/loginpage" style={{ color: '#fff', fontWeight: 'bold' }}>&nbsp;&nbsp;&nbsp;로그인 페이지로 이동하기</StyledLink></LoginText>
        </LoginWrapper>
      </div>
    </Container>
  );
}
