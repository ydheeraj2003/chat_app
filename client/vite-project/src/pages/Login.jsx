import {Alert, Button, Form, Col, Row, Stack} from "react-bootstrap"
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
const Login = () => {
    const {loginInfo, updateLoginInfo, loginUser, loginError, isLoginLoading}=useContext(AuthContext);
    return (
        <>
            <Form onSubmit={loginUser}>
                <Row style={{height: "100vh", justifyContent: "center", paddingTop: "10%"}}>
                    <Col xs={6}>
                        <Stack gap={3}>
                            <h2 className="link-light">Login</h2>
                            <Form.Control type="email" placeholder="email" onChange={(e)=> updateLoginInfo({...loginInfo, email: e.target.value})}/>
                            <Form.Control type="password" placeholder="password" onChange={(e)=> updateLoginInfo({...loginInfo, password: e.target.value})}/>
                            <Button type="submit">{isLoginLoading ? "Getting you in.." : "Login"}</Button>
                            {
                                loginError?.error && 
                                (
                                    <Alert variant="danger">
                                        <p>{loginError?.message}</p>
                                    </Alert>
                                )

                            }
                            
                        </Stack>
                    </Col>
                </Row>
            </Form>
        </>
    );
}

export default Login;