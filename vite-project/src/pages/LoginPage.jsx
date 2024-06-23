import React, { useState } from "react";
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  text-align: center;
  justify-content: center;
  align-items: center;
  color: #fff;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column; 
  background-color: #20254C;
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
  width: 80%; /* 기본 너비 */
  max-width: 600px; /* 최대 너비 */
  height: 30px;
  margin-bottom: 10px;
  
  @media (max-width: 1200px) {
    width: 80%; 
    max-width: 500px;
  }

  @media (max-width: 768px) {
    width: 80%; 
    max-width: 400px;
  }

  @media (max-width: 480px) {
    width: 80%; 
    max-width: 300px;
  }
`;

const SubmitBtn = styled.button`
  color: #000;
  font-size: 20px;
  font-weight: bold;
  border-style: none;
  border: 1px solid #333;
  border-radius: 50px;
  width: 80%; /* 기본 너비 */
  max-width: 600px; /* 최대 너비 */
  height: 70px;
  margin-top: 50px;
  background-color: ${({ isValid }) => isValid ? 'yellow' : '#fff'};
  
  @media (max-width: 1200px) {
    width: 80%; 
    max-width: 500px;
  }

  @media (max-width: 768px) {
    width: 80%; 
    max-width: 400px;
  }

  @media (max-width: 480px) {
    width: 80%; 
    max-width: 300px;
  }
`;

const LoginPage = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const validateId = (value) => {
    if (!value.trim()) {
      return '아이디를 입력해주세요.';
    } else if (!/(?=.*[a-zA-Z])(?=.*\d)/.test(value)) {
      return '아이디는 한글, 영어 또는 숫자로만 이루어져야 합니다.';
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
    }
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    const idError = validateId(id);
    const passwordError = validatePassword(password);

    if (!idError && !passwordError) {
      try {
        const response = await fetch('http://localhost:8080/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: id,
            password: password
          })
        });

        if (!response.ok) {
          throw new Error('로그인에 실패했습니다.');
        }

        const responseData = await response.json();

        localStorage.setItem('token', responseData.token);
        localStorage.setItem('username', id);
        localStorage.setItem("isLoggedIn", "1");

        alert("로그인이 성공적으로 완료되었습니다!");
        navigate('/'); // 로그인 성공 후 홈페이지로 이동
      } catch (error) {
        console.error('로그인 오류:', error);
        console.log("입력한 정보에 오류가 있습니다. 수정 후 다시 제출해주세요.");
      }
    }
  };

  const isValid = !validateId(id) && !validatePassword(password);

  return (
    <Container>
      <div>
        <MainText>로그인 페이지</MainText>
        <form onSubmit={handleSubmit}>
          <InputWrapper>
            <InputField
              type="text"
              placeholder="아이디"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
            {submitted && validateId(id) && <p style={{ color: 'red', fontSize: '15px' }}>{validateId(id)}</p>}
            <InputField
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {submitted && validatePassword(password) && <p style={{ color: 'red', fontSize: '15px' }}>{validatePassword(password)}</p>}
            <SubmitBtn type="submit" isValid={isValid}>로그인</SubmitBtn>
          </InputWrapper>
        </form>
      </div>
    </Container>
  );
};

export default LoginPage;
