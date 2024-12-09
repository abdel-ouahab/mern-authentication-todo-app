const Container = (props) => {
    return (
      <div className="container flex sm:mt-20 mt-5 sm:p-10 p-7 flex-col justify-center rounded bg-violet-950  ">
          {props.children}
      </div>
    )
  }
  
  export default Container