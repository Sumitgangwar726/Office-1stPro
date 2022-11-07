import { Button, Form, FormLayout, Page, TextField } from "@shopify/polaris";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginFetch } from "../api/apiConstants";
import { saveUser } from "../redux/LoginSlice";

const Login = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("password123");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  const dispatch = useDispatch()
  const state = useSelector(state => state.user)

  const loginHandler = async () => {
    setLoading(true);
    let res = await loginFetch(
      new URLSearchParams({ username: username, password: password })
    );
    setLoading(false);
    if (res.success) {
      sessionStorage.setItem(
        "user",
        JSON.stringify({ key: res.data.token, name: name })
      );
      dispatch(saveUser);
      nav("/dashboard");
    } else alert(res.message);
  };

  useEffect(() => {
    state && nav("/dashboard");
  }, [state]);

  return (
    <Page>
      <Form onSubmit={loginHandler} autoComplete={false}>
        <FormLayout>
          <TextField
            label="Your Name"
            type="text"
            value={name}
            onChange={(value) => setName(value)}
            helpText="We'll show this Name to your profile"
          />
          <TextField
            label="Username"
            type="text"
            value={username}
            onChange={(value) => setUsername(value)}
            helpText="Enter your username"
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(value) => setPassword(value)}
            helpText="Never Disclose your password to anyone"
          />
          <Button submit primary loading={loading}>
            Submit
          </Button>
        </FormLayout>
      </Form>
    </Page>
  );
};

export default Login
