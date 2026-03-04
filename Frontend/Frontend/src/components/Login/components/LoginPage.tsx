import { Button } from "@/components/ui/button"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { authService } from "@/lib/BaseService"
import { useNavigate } from "react-router-dom"
import { useAuthStore } from "@/stores/AuthStore"

const LoginPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const { login } = useAuthStore();
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const token = await authService.login(username, password);
            login(token);
            navigate('/urls');
        } catch (error: any) {
            const validationErrors = error.response?.data?.errors;
            if (validationErrors) {
                const firstError = Object.values(validationErrors)[0] as string[];
                setError(firstError[0]);
            } else {
                setError(error.response?.data?.error || 'Registration failed');
            }
        }
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await authService.register(username, password);
            setIsLogin(true);
        } catch (error: any) {
            const validationErrors = error.response?.data?.errors;
            if (validationErrors) {
                const firstError = Object.values(validationErrors)[0] as string[];
                setError(firstError[0]);
            } else {
                setError(error.response?.data?.error || 'Registration failed');
            }
        }
    };

    return (

        <div className="flex justify-center items-center w-full">
            < Card className="" >
                <CardHeader>
                    <CardTitle>{isLogin ? "Login" : "Register"}</CardTitle>
                    <CardDescription>
                        {isLogin ? "Enter your credentials to login" : "Create a new account"}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="flex flex-col gap-6">
                            {error && <p className="text-red-500 text-sm">{error}</p>}
                            <div className="grid gap-2">
                                <Label htmlFor="username">Username</Label>
                                <Input
                                    id="username"
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <Button onClick={isLogin ? handleLogin : handleRegister} className="w-full cursor-pointer">
                        {isLogin ? "Login" : "Register"}
                    </Button>
                    <CardAction className="flex justify-center items-center w-full">
                        <Button onClick={() => setIsLogin(prev => !prev)} variant="link">
                            {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
                        </Button>
                    </CardAction>
                </CardFooter>
            </Card >
        </div >
    )
}

export default LoginPage