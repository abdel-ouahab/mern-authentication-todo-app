import { Button, Input, Error } from '../index'
import { Link } from 'react-router-dom'

function LoginForm({ inputref, onSubmit, errors, responseMessage }) {
  
  return (
    <>
      <form className="flex flex-col items-center  gap-4" onSubmit={onSubmit}>
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
        <Error 
          error={responseMessage}
        />
        <Button 
          title= "Login" 
          variant="primary"
          classname={"rounded p-2"}
        />
        <Link to='/register' className="text-gray-100 underline">Sign up</Link>
      </form>
    </>
  )
}

export default LoginForm
