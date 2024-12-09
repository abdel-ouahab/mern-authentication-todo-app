import  Axios  from 'axios';
import  {userSchema} from './Schema'
import { useState } from 'react';
import {useCookies} from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Container , Title, LoginForm } from '../../components/index'

const api = "http://127.0.0.1:3001/api/auth";
function Login() {
  const [responseMessage, setResponseMessage] = useState("");
  const [, setCookies] = useCookies("access_token")
  const navigate = useNavigate();

  const { register , handleSubmit, formState: { errors },} = useForm({
    resolver: yupResolver(userSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  
  const onSubmit = async (data) => {
    try {
      const response = await Axios.post(`${api}/login`,{...data});
      setCookies("access_token", response.data.token);
      window.localStorage.setItem("userID", response.data.user._id);
      window.localStorage.setItem("firstname", response.data.user.firstname);
      window.localStorage.setItem("loggedIn", true );
      navigate('/todo' , { replace: true });
    } catch (err) {
      const errorMsg = err.response?.data?.message || "An unexpected error occurred.";
      setResponseMessage(errorMsg);
      console.error("Login error:", err.response?.data || err.message);
    }
  };
  
  return (
    <>
      <Container>
        <Title>Login</Title>
        <LoginForm 
          inputref={register}
          onSubmit={handleSubmit(onSubmit)}
          errors={errors}
          responseMessage={responseMessage}
        />
      </Container>
    </>
  )
}

export default Login
