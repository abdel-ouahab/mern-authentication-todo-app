import { Button, Input, Error } from '../index';
import { Link } from 'react-router-dom';

function RegisterForm({ inputref, onSubmit, errors, responseMessage }) {
  return (
    <form className="flex flex-col items-center gap-4" onSubmit={onSubmit}>
      <Input
        name="firstname"
        placeholder="First name"
        inputref={{...inputref("firstname")}}
        error={errors.firstname?.message}
        classname="rounded"
      />
      <Input
        name="lastname"
        placeholder="Last name"
        inputref={{...inputref("lastname")}}
        error={errors.lastname?.message}
        classname="rounded"
      />
      <Input
        name="username"
        placeholder="Username"
        inputref={{...inputref("username")}}
        error={errors.username?.message}
        classname="rounded"
      />
      <Input
        name="age"
        type="number"
        placeholder="Age"
        inputref={{...inputref("age")}}
        error={errors.age?.message}
        classname="rounded"
      />
      <Input
        name="email"
        type="email"
        placeholder="Email"
        inputref={{...inputref("email")}}
        error={errors.email?.message}
        classname="rounded"
      />
      <Input
        name="password"
        type="password"
        placeholder="Password"
        inputref={{...inputref("password")}}
        error={errors.password?.message}
        classname="rounded"
      />
      <Input
        name="confirmPassword"
        type="password"
        placeholder="confirm Password"
        inputref={{...inputref("confirmPassword")}}
        error={errors.confirmPassword?.message}
        classname="rounded"
      />
      <Error 
        error={responseMessage}
      />
      <Button 
          title= "Sign up" 
          variant="primary"
          classname={"rounded p-2"}
        />
      <Link to="/" className="text-gray-100 underline">
        Already have an account?
      </Link>
    </form>
  );
}

export default RegisterForm;
