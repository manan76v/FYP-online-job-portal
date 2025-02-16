import React, { useState, useEffect } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setLoading, setUser } from '@/redux/authSlice'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });
    const { loading,user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const { data } = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });
            localStorage.setItem("token", data.token);
            dispatch(setUser(data.user));
            toast.success("Login Successfully");
            // Redirect to profile after successful login
            if (data.user.role === 'JobSeeker') {
                navigate('/profile');
            } else {
                navigate('/recruiter/dashboard');
            }
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            dispatch(setLoading(false));
        }
    };

    useEffect(()=>{
        if(user){
            navigate("/");
        }
    },[])
    return (
        <div>
            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <form onSubmit={handleSubmit} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
                    <h1 className='font-bold text-xl mb-5'>Login</h1>
                    <div className='my-2'>
                        <label>Email</label>
                        <Input
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="manan1765@gmail.com"
                        />
                    </div>

                    <div className='my-2'>
                        <label>Password</label>
                        <Input
                            type="password"
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                            placeholder="Password"
                        />
                    </div>
                    <div className='flex items-center justify-between'>
                        <div className="flex items-center gap-4 my-5">
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="JobSeeker"
                                    checked={input.role === 'JobSeeker'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                />
                                <label htmlFor="r1">JobSeeker</label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="recruiter"
                                    checked={input.role === 'recruiter'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                />
                                <label htmlFor="r2">Recruiter</label>
                            </div>
                        </div>
                    </div>
                    {
                        loading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> : <Button type="submit" className="w-full my-4">Login</Button>
                    }
                    <span className='text-sm'>Don't have an account? <a href="/signup" className='text-blue-600'>Signup</a></span>
                </form>
            </div>
        </div>
    )
}

export default Login    