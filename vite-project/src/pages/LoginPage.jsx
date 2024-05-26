import React from "react";
import { useState, useNavigate } from "react";
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


export default function LoginPage(){
    const [id, setId]=useState('');
    const [password, setPassword] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const validateId = (value) => {
        if (!value.trim()) {
          return '아이디를 입력해주세요.';
        } 
        else if (!/(?=.*[a-zA-Z])(?=.*\d)/.test(value)) {
          return '아이디는 한글,영어 또는 숫자로만 이루어져야 합니다.';
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
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // 페이지 새로고침을 방지하고, 대신 JavaScript로 유효성 검사를 처리함. preventDefault 안할 경우, 폼이 계속 새로고침됨..
        setSubmitted(true);

        const idError = validateId(id);
        const passwordError = validatePassword(password);
    
        if (!idError && !passwordError) {
          console.log('유효성 검사 통과!');
          console.log('아이디:',id);
          console.log('비밀번호:', password);
          
        } else {
          console.log('유효성 검사 실패!');
        }
    
      };
    
      // isValid => 모든 조건이 부합하면 제출하기 버튼 색 바꿀때 쓰임
      // isValid가 true이면 모든 유효성 검사 함수가 빈 문자열(즉, 오류가 없음)을 반환한 것이고, 이 경우 제출 버튼의 색상이 변경됨!!
      const isValid =
      !validateId(id) &&
      !validatePassword(password)
    

    return(
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
            {(submitted && validateId(id)) && <p style={{ color: 'red', fontSize: '15px' }}>{validateId(id)}</p>}
            <InputField
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {(submitted && validatePassword(password)) && <p style={{ color: 'red', fontSize: "15px" }}>{validatePassword(password)}</p>}
          <SubmitBtn type="submit" isValid={isValid}>로그인</SubmitBtn>
          </InputWrapper>
        </form>
      </div>
    </Container>
       )
       
}