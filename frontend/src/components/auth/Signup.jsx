import React, { useState, useEffect } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { registerApi } from '../../utils/constant'
import { setLoading } from '../../redux/slices/authSlice'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

const Signup = () => {
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, user } = useSelector((state) => state.auth);

    const changeEventHandler = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const changeFileHandler = (e) => {
        setInput({
            ...input,
            file: e.target.files[0]
        })
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!input.fullname || !input.email || !input.password || !input.role || !input.phoneNumber) {
            toast.error("All fields are required");
            return;
        }
        dispatch(setLoading(true));
        try {
            const formData = new FormData();
            formData.append("fullname", input.fullname);
            formData.append("email", input.email);
            formData.append("password", input.password);
            formData.append("role", input.role);
            formData.append("phoneNumber", input.phoneNumber);
            
            // Only append file if it exists
            if (input.file) {
                formData.append("file", input.file);
            }

            const response = await axios.post(registerApi, formData);
            
            if (response && response.data && response.data.success) {
                toast.success(response.data.message || "Registration successful");
                navigate("/login"); // Navigate to login instead of home
            } else {
                toast.error(response.data?.message || "Registration failed");
            }
        } catch (error) {
            console.error("Registration error:", error);
            toast.error(error.response?.data?.message || "Registration failed. Please try again.");
        } finally {
            dispatch(setLoading(false));
        }
    }

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);

    return (
        <div>
            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
                    <h1 className='font-bold text-xl mb-5'>Sign Up</h1>
                    <div className='my-2'>
                        <label className="text-sm font-medium leading-none">Full Name</label>
                        <Input
                            type="text"
                            value={input.fullname}
                            name="fullname"
                            onChange={changeEventHandler}
                            placeholder="Enter your full name"
                        />
                    </div>
                    <div className='my-2'>
                        <label className="text-sm font-medium leading-none">Email</label>
                        <Input
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className='my-2'>
                        <label className="text-sm font-medium leading-none">Phone Number</label>
                        <Input
                            type="text"
                            value={input.phoneNumber}
                            name="phoneNumber"
                            onChange={changeEventHandler}
                            placeholder="Enter your phone number"
                        />
                    </div>
                    <div className='my-2'>
                        <label className="text-sm font-medium leading-none">Password</label>
                        <Input
                            type="password"
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                            placeholder="Enter your password"
                        />
                    </div>
                    <div className='my-2'>
                        <label className="text-sm font-medium leading-none">Role</label>
                        <select
                            value={input.role}
                            name="role"
                            onChange={changeEventHandler}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <option value="">Select Role</option>
                            <option value="JobSeeker">Job Seeker</option>
                            <option value="recruiter">Recruiter</option>
                        </select>
                    </div>
                    <div className='flex items-center gap-2'>
                        <label className="text-sm font-medium leading-none">Profile Picture (Optional)</label>
                        <Input
                            accept="image/*"
                            type="file"
                            onChange={changeFileHandler}
                            className="cursor-pointer"
                        />
                    </div>
                    {
                        loading ? (
                            <Button className="w-full my-4">
                                <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait
                            </Button>
                        ) : (
                            <Button type="submit" className="w-full my-4">Sign Up</Button>
                        )
                    }
                    <span className='text-sm'>
                        Already have an account? <Link to="/login" className='text-blue-600'>Login</Link>
                    </span>
                </form>
            </div>
        </div>
    )
}

export default Signup
