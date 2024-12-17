import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useRef, useState } from 'react';
import auth from '../../firebase.init';
import { Link } from 'react-router-dom';

const Login = () => {
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const emailRef = useRef();

    const handleLogin = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);

        setSuccess(false);
        setError('');

        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result);
                if (!result.user.emailVerified) {
                    setError('please email verified!')
                }
                else {
                    setSuccess(true);
                }
            })
            .catch(error => {
                console.log('Error', error.message);
                setError(error.message);
            })
    }

    const handlePassword = () => {
        console.log('get me email address')
        const email = emailRef.current.value;
        if (!email) {
            console.log('Please provide a valid email address!')
        }
        else{
            sendPasswordResetEmail(auth, email)
            .then(() => {
                alert('Password reset email sent! please check email')
            })
        }
    }
    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                        quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form onSubmit={handleLogin} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" ref={emailRef} name='email' placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name='password' placeholder="password" className="input input-bordered" required />
                            <label onClick={handlePassword} className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                        </div>
                    </form>
                    {
                        success && <p className='text-green-900 text-center mb-3'>User Successfully Login!</p>
                    }
                    {
                        error && <p className='text-red-700 text-center mb-4'>{error}</p>
                    }
                    <p className='text-center mb-4'>New! to this website please <Link to="/signUp" className='underline font-semibold'>Sign Up</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;