import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import Axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Container, Title, RegisterForm } from '../../components/index';

const api = "http://127.0.0.1:3001/api/auth";
const Register = () => {
  const [responseMessage, setResponseMessage] = useState("");
  const [, setCookies] = useCookies(['access_token']);
  const navigate = useNavigate();

  const userSchema = yup.object().shape({
    firstname: yup.string().lowercase().required("First name is required"),
    lastname: yup.string().lowercase().required("Last name is required"),
    username: yup.string().required("Username is required"),
    age: yup.number().required("Age is required").positive().integer(),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    confirmPassword: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });

  const {register, handleSubmit, formState: { errors },} = useForm({
    resolver: yupResolver(userSchema),
    defaultValues: {
      firstname: '',
      lastname: '',
      username: '',
      age: null,
      email: '',
      password: '',
      confirmPassword: '',
      createdOn: null,
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await Axios.post(`${api}/signup`, {
        ...data,
        createdOn: new Date(),
      });

      console.log(response.data.message);
      setCookies('access_token', response.data.token);
      window.localStorage.setItem('userID', response.data.user._id);
      window.localStorage.setItem('loggedIn', true);
      navigate('/todo', { replace: true });
    } catch (err) {
      const errorMsg = err.response?.data?.message || "An unexpected error occurred.";
      setResponseMessage(errorMsg);
      console.error("Sign-up error:", err.response?.data || err.message);
    }
  };

  return (
    <Container>
      <Title>Create a new account</Title>
      <RegisterForm
        inputref={register}
        onSubmit={handleSubmit(onSubmit)}
        errors={errors}
        responseMessage={responseMessage}
      />
    </Container>
  );
};

export default Register;
