
import { useToken } from "./useToken";
import { useState } from "react";

function LoginComponent() {
const [token, login] = useToken();

async function login(username, password) {
const url = `${process.env.REACT_APP_API_HOST}/token`;

const handleChange = (event) => {
    setFormData({...aFormData, [event.target.name]: event.target.value})
  }

  const form = new FormData();
  form.append("username", username);
  form.append("password", password);

  const response = await fetch(url, {
    method: "post",
    credentials: "include",
    body: form,
  });
  if (response.ok) {
    const tokenUrl = `${process.env.REACT_APP_API_HOST}/token`;

    try {
      const response = await fetch(tokenUrl, {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        const token = data.access_token;
        // DO SOMETHING WITH THE TOKEN SO YOU CAN USE IT
        // IN REQUESTS TO YOUR NON-ACCOUNTS SERVICES
      }
    } catch (e) {}
    return false;
  }
  let error = await response.json();
  // DO SOMETHING WITH THE ERROR, IF YOU WANT
    return (
    <div style={{ padding: "0 20px" }}>
      <Container className="form-login card shadow p-4 mt-5 d-grid">
        <div className="d-flex justify-content-center mt-2">
          <Image src={logo} style={{ width: "6rem" }} />
        </div>
        <div className="text-center mt-3">
          <h5>Please sign in</h5>
        </div>
        <Form
          className="mt-3 mb-3 w-100 justify-content-center"
          method="POST"
          onSubmit={(e) => {
            e.preventDefault();
           form(e.target);
            navigate("/");
          }}
        >
          <Form.Group className="mb-3" controlId="formUsername">
            <Form.Control
              required
              onChange={field}
              value={username}
              name="username"
              type="username"
              placeholder="Username"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Control
              required
              onChange={field}
              value={password}
              name="password"
              type="password"
              placeholder="Password"
            />
          </Form.Group>
          <div className="d-grid gap-2">
            <Button size="md" variant="primary" type="submit">
              Sign in
            </Button>
          </div>
        </Form>
        {/* <div className="text-center">
          <p>Don't have an account?</p>
          <p>
            Create one{" "}
            <Link className="link" to="/signup">
              {" "}
              here!
            </Link>
          </p>
        </div> */}
      </Container>
    </div>
  );
}

}
export default LoginComponent;
