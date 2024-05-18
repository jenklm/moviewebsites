import React from "react";
import { useState } from "react";
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
`;

export default function SignUpPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const validateName = (value) => {
    if (!value.trim()) {
      return '이름을 입력해주세요.';
    } else if (!/^[가-힣a-zA-Z]+$/.test(value)) {
      return '이름은 한글 또는 영어로만 이루어져야 합니다.';
    }
    return '';
  };

  const validateEmail = (value) => {
    if (!value.trim()) {
      return '이메일을 입력해주세요.';
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
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
    } else if (value.length < 4 || value.length > 12 || !/(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()])/.test(value)) {
      return "영어, 숫자, 특수 문자를 조합하여 4자 이상 12자 이하로 입력해주세요.";
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
    e.preventDefault();
    setSubmitted(true);

    const nameError = validateName(name);
    const emailError = validateEmail(email);
    const ageError = validateAge(age);
    const passwordError = validatePassword(password);
    const confirmPasswordError = validateConfirmPassword(confirmPassword);

    if (!nameError && !emailError && !ageError && !passwordError && !confirmPasswordError) {
      console.log('유효성 검사 통과!');
      console.log('이름:', name);
      console.log('이메일:', email);
      console.log('나이:', age);
      console.log('비밀번호:', password);
      console.log('비밀번호 확인:', confirmPassword);
    } else {
      console.log('유효성 검사 실패!');
    }



  };

  // isValid => 모든 조건이 부합하면 제출하기 버튼 색 바꿀때 쓰임
  const isValid =
  !validateName(name) &&
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
          <SubmitBtn type='submit' isValid={isValid}>제출하기</SubmitBtn>
        </form>
        <LoginWrapper>
          <LoginText>이미 아이디가 있으신가요? <span style={{ color: '#fff', fontWeight: 'bold' }}>&nbsp;&nbsp;&nbsp;로그인 페이지로 이동하기</span></LoginText>
        </LoginWrapper>
      </div>
    </Container>
  );
}
