import React, { useState } from "react";
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  text-align: center;
  justify-content: center;
  align-items: center;
  color: #fff;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column; 
  background-color: rgb(7, 7, 61);
`;

const MainText = styled.h2`
  color: #fff;
  margin-bottom: 10px;
  font-size: 30px;
`;

const FormWrapper = styled.div`
  width: 100%;
  max-width: 600px;
  padding: 20px;
  box-sizing: border-box;
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
  width: 100%;
  max-width: 600px;
  height: 30px;
  margin-bottom: 10px;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 15px;
`;

const SubmitBtn = styled.button`
  color: #000;
  font-size: 20px;
  font-weight: bold;
  border-style: none;
  border: 1px solid #333;
  border-radius: 50px;
  width: 100%;
  max-width: 600px;
  height: 70px;
  margin-top: 50px;
  background-color: ${({ isValid }) => isValid ? 'yellow' : '#fff'};
`;

const LoginWrapper = styled.div`
  margin-top: 20px;
`;

const LoginText = styled.p`
  color: #fff;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #fff;
  font-weight: bold;
`;

const SignUpPage = () => {
  const [name, setName] = useState('');
  const [id, setId] = useState('');
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

  const validateId = (value) => {
    if (!value.trim()) {
      return '아이디를 입력해주세요.';
    } else if (!/(?=.*[a-zA-Z])(?=.*\d)/.test(value)) {
      return '아이디는 영문과 숫자를 포함해야 합니다.';
    }
    return '';
  };

  const validateEmail = (value) => {
    if (!value.trim()) {
      return '이메일을 입력해주세요.';
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/.test(value)) {
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
    } else if (value.length < 4) {
      return '최소 4자리 이상 입력해주세요.';
    } else if (value.length > 12) {
      return '비밀번호는 최대 12자리까지 입력 가능합니다.';
    } else if (!/(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()])/.test(value)) {
      return '비밀번호는 영어, 숫자, 특수문자를 포함해야 합니다.';
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
    const idError = validateId(id);
    const emailError = validateEmail(email);
    const ageError = validateAge(age);
    const passwordError = validatePassword(password);
    const confirmPasswordError = validateConfirmPassword(confirmPassword);

    if (!nameError && !idError && !emailError && !ageError && !passwordError && !confirmPasswordError) {
      console.log('유효성 검사 통과!');
      console.log('이름:', name);
      console.log('아이디:', id);
      console.log('이메일:', email);
      console.log('나이:', age);
      console.log('비밀번호:', password);
      console.log('비밀번호 확인:', confirmPassword);
    } else {
      console.log('유효성 검사 실패!');
    }
  };

  const isValid = !validateName(name) &&
    !validateId(id) &&
    !validateEmail(email) &&
    !validateAge(age) &&
    !validatePassword(password) &&
    !validateConfirmPassword(confirmPassword);

  return (
    <Container>
      <div>
        <MainText>회원가입 페이지</MainText>
        <FormWrapper>
          <form onSubmit={handleSubmit}>
            <InputWrapper>
              <InputField
                type="text"
                placeholder="이름을 입력해주세요"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {submitted && validateName(name) && <ErrorMessage>{validateName(name)}</ErrorMessage>}
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
              {submitted && validateEmail(email) && <ErrorMessage>{validateEmail(email)}</ErrorMessage>}
              <InputField
                type="text"
                placeholder="나이를 입력해주세요"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
              {submitted && validateAge(age) && <ErrorMessage>{validateAge(age)}</ErrorMessage>}
              <InputField
                type="password"
                placeholder="비밀번호를 입력해주세요"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {submitted && validatePassword(password) && <ErrorMessage>{validatePassword(password)}</ErrorMessage>}
              <InputField
                type="password"
                placeholder="비밀번호 확인"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {submitted && validateConfirmPassword(confirmPassword) && <ErrorMessage>{validateConfirmPassword(confirmPassword)}</ErrorMessage>}
            </InputWrapper>
            <SubmitBtn type="submit" isValid={isValid}>제출하기</SubmitBtn>
          </form>
          <LoginWrapper>
            <LoginText>이미 아이디가 있으신가요? <StyledLink to="/loginpage">로그인 페이지로 이동하기</StyledLink></LoginText>
          </LoginWrapper>
        </FormWrapper>
      </div>
    </Container>
  );
};

export default SignUpPage;
