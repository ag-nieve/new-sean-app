import {useState} from "react";
import SignupForm from "./user_auth/SignupForm";
import LoginForm from "./user_auth/LoginForm";

export default function LoginScreen(){


    const [isLogin, setIsLogin] = useState(true);

    return (isLogin ? <LoginForm setIsLogin={setIsLogin} /> : <SignupForm setIsLogin={setIsLogin} />);
}
