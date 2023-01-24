import { useEffect, useState } from "react";
import { useToken } from "../Auth";
import { useNavigate } from "react-router-dom";
import controller from "../images/controller.png";

function SignupComponent() {
  const [account, setAccount] = useState({
    username: "",
    password: "",
    passwordConfirm: "",
  });

  const handleChange = (event) => {
    setAccount({ ...account, [event.target.name]: event.target.value });
    console.log(account);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = { ...account };
    if (data.password === data.passwordConfirm) {
      console.log(data);
      const accountsUrl = "http://localhost:8000/api/accounts/";
      const fetchConfig = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(accountsUrl, fetchConfig);
      if (response.ok) {
        const newaccount = await response.json();
        setAccount({
          username: "",
          password: "",
          passwordConfirm: "",
        });
      } else {
        console.error("Error in creating account");
      }
    } else {
      console.error("Passwords do not match");
    }
  };

  const handleKeypress = (event) => {
    if (event.keyCode === 13) {
      handleSubmit();
    }
  };

  return (
    <div class="container h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="card-body p-md-5">
          <div class="row justify-content-center">
            <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
              <h2>Sign Up</h2>
              <form onSubmit={handleSubmit} id="signup-form">
                <div className="form-floating mb-3">
                  <input
                    onChange={handleChange}
                    onKeyDown={handleKeypress}
                    value={account.username}
                    placeholder="Enter your username"
                    required
                    type="text"
                    name="username"
                    id="username"
                    className="form-control"
                  />
                  <label htmlFor="username">Username</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    onChange={handleChange}
                    value={account.password}
                    placeholder="Enter your password"
                    required
                    type="password"
                    name="password"
                    id="password"
                    className="form-control"
                  />
                  <label htmlFor="password">Password</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    onChange={handleChange}
                    value={account.passwordConfirm}
                    placeholder="Confirm password"
                    required
                    type="passwordConfirm"
                    name="passwordConfirm"
                    id="passwordConfirm"
                    className="form-control"
                  />
                  <label htmlFor="passwordConfirm">Confirm Password</label>
                </div>
                <button className="btn btn-primary">Sign up</button>
              </form>
            </div>
            <div class="col-md-10 col-lg-6 col-xl-7  align-items-center order-1 order-lg-2">
              <img
                class="img-fluid width=50% height=50%"
                src={controller}
                alt="video game controller"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupComponent;
// return (
//   <div className="container h-100">
//   <div className="row d-flex justify-content-center align-items-center h-100">
//   <div className="card-body p-md-5">
//   <div className="row ">
//     <div className="offset-3 col-6">
//       <div className="shadow p-4 mt-4">
//         <h1>Sign Up</h1>
//         <form onSubmit={handleSubmit} id="signup-form">
//           <div className="form-floating mb-3">
//             <input
//               onChange={handleChange}
//               value={account.username}
//               placeholder="Enter your username"
//               required
//               type="text"
//               name="username"
//               id="username"
//               className="form-control"
//             />
//             <label htmlFor="username">Username</label>
//           </div>
//           <div className="form-floating mb-3">
//             <input
//               onChange={handleChange}
//               value={account.password}
//               placeholder="Enter your password"
//               required
//               type="password"
//               name="password"
//               id="password"
//               className="form-control"
//             />
//             <label htmlFor="password">Password</label>
//           </div>
//           <div className="form-floating mb-3">
//             <input
//               onChange={handleChange}
//               value={account.passwordConfirm}
//               placeholder="Confirm password"
//               required
//               type="passwordConfirm"
//               name="passwordConfirm"
//               id="passwordConfirm"
//               className="form-control"
//             />
//             <label htmlFor="passwordConfirm">Confirm Password</label>
//           </div>
//           <button className="btn btn-primary">Sign up</button>
//         </form>
//       </div>
//     </div>
//   </div>
//   </div>
//   </div>
//   </div>
// );
