import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('CUSTOMER');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        
        // const userData = {
        //     firstName,
        //     lastName,
        //     username,
        //     password,
        //     role,
        // };

        // axios.post('http://localhost:8080/api/users/create-user', userData)
        // .then(result => {
        //     console.log(result);
        //     if (result.data === "Already registered") {
        //         alert("E-mail already registered! Please Login to proceed.");
        //         navigate('/login');
        //     } else {
        //         alert("Registered successfully! Please Login to proceed.");
        //         navigate('/login');
        //     }
        // })
        // .catch(err => console.log(err));
    }

    return (
        <div>
            <div className="d-flex justify-content-center align-items-center text-center vh-100 mt-5" style={{backgroundColor: '#D7E4FF'} } >
                <div className="bg-white p-3  rounded shadow" style={{width: '30vw', borderRadius: '10px', marginTop: '55px'}}>
                    <h2 className='mb-3 text-primary'>Register</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3 text-start">
                            <label htmlFor="firstName" className="form-label">
                                First Name
                            </label>
                            <input 
                                type="text"
                                placeholder="Enter First Name"
                                className="form-control" 
                                id="firstName" 
                                onChange={(event) => setFirstName(event.target.value)}
                                required
                            /> 
                        </div>
                        <div className="mb-3 text-start">
                            <label htmlFor="lastName" className="form-label">
                                Last Name
                            </label>
                            <input 
                                type="text"
                                placeholder="Enter Last Name"
                                className="form-control" 
                                id="lastName" 
                                onChange={(event) => setLastName(event.target.value)}
                                required
                            /> 
                        </div>
                        <div className="mb-3 text-start">
                            <label htmlFor="exampleInputEmail1" className="form-label">
                                Email
                            </label>
                            <input 
                                type="email" 
                                placeholder="Enter Email"
                                className="form-control" 
                                id="username" 
                                onChange={(event) => setUsername(event.target.value)}
                                required
                            /> 
                        </div>
                        <div className="mb-3 text-start">
                            <label htmlFor="exampleInputPassword1" className="form-label">
                                Password
                            </label>
                            <input 
                                type="password" 
                                placeholder="Enter Password"
                                className="form-control" 
                                id="exampleInputPassword1" 
                                onChange={(event) => setPassword(event.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Register</button>
                    </form>

                    <p className='container my-2'>Already have an account?</p>
                    <Link to='/login' className="btn btn-secondary">Login</Link>
                </div>
            </div>
        </div>
    )
}

export default Register;
