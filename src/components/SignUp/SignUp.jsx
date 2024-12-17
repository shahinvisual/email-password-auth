import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';
import React, { useState } from 'react';
import auth from '../../firebase.init';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const SignUp = () => {

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSignUp = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const name = e.target.name.value;
        const photo = e.target.photo.value;
        const terms = e.target.terms.checked;
        console.log(email, password, name, photo, terms);

        setError('');
        setSuccess(false);

        if(!terms){
            setError('Please Accept Our Terms And Conditions.')
            return;
        }

        if (password.length < 6) {
            setError('password should be 6 characters or longer');
            return;
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        if (!passwordRegex.test(password)) {
            setError('At least one uppercase, one lowercase, one number, one special character');
            return;
        }
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result)
                setSuccess(true);

                sendEmailVerification(auth.currentUser)
                .then(() => {
                    console.log("sent email verification")

                    const profile = {
                        displayName: name,
                        photoURL: photo
                    }
                    updateProfile(auth.currentUser, profile)
                    .then(() => {
                        console.log('User profile updated')
                    })
                    .catch(() => {
                        console.log('User profile updated Error!!')
                    })
                })
            })
            .catch(error => {
                console.log('Error', error.message)
                setError(error.message);
                setSuccess(false);
            })
    }
    return (
        <div className="card bg-base-100 mt-28 mx-auto w-full max-w-sm shrink-0 shadow-2xl">
            <h3 className="text-4xl ml-8 font-bold">SignUp</h3>
            <form onSubmit={handleSignUp} className="card-body">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input type="text" name='name' placeholder="name" className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Photo Url</span>
                    </label>
                    <input type="text" name='photo' placeholder="photo" className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                </div>
                <div className="form-control relative">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        name='password'
                        placeholder="password"
                        className="input input-bordered" required />
                    <div className="form-control">
                        <label className="label justify-start  cursor-pointer">
                            <input type="checkbox" name='terms' className="checkbox" />
                            <span className="label-text ml-3">Accept Our Terms And Conditions. </span>
                        </label>
                    </div>
                    <button onClick={() => setShowPassword(!showPassword)} className='btn btn-xs absolute right-2 top-12'>
                        {showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
                    </button>
                    <label className="label">
                        <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                    </label>
                </div>
                <div className="form-control mt-6">
                    <button className="btn btn-success">Sign Up</button>
                </div>
            </form>
            <p className='text-center mb-5 text-red-600'>{error}</p>
            {
                success && <p className='text-green-900 text-center mb-5'>Sign Up is successful!</p>
            }
            <p className='text-center mb-5'>Allready have a Account <Link to={'/login'} className='font-semibold underline'>Login</Link></p>
        </div>
    );
};

export default SignUp;