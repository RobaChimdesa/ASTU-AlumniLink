import "../styles/form.css"
import { useState } from "react";
import users_API from "../users_API";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import LoadingIndicator from "./LoadingIndicator";

const userTypes = {
    student: ["full_name", "email", "password", "confirm_password", "student_id", "department", "admission_year", "graduation_year", "phone_number", "username"],
    teacher: ["email", "password", "confirm_password", "full_name", "subject", "phone_number"],
    admin: ["email", "password", "confirm_password", "full_name", "role"],
    guest: ["email", "password", "confirm_password"],
};

const initialFields = {    
    full_name: "",
    email: "",
    phone_number: "",
    student_id: "",
    department: "CSE",
    admission_year: 2023,
    graduation_year: "",
    username: "",
    subject: "",
    role: "",
    user_type: "student",  // Default user type
    password: "",
    confirm_password: "",
};

function Form({ route, method }) {
    const [fields, setFields] = useState(initialFields);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFields({ ...fields, [name]: value });
    };

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        if (method === "register" && fields.password !== fields.confirm_password) {
            alert("Passwords Mismatch.");
            setLoading(false);
            return;
        }

        const userData = {};
        userTypes[fields.user_type].forEach(field => {
            userData[field] = fields[field];
        });

        try {
            const res = await users_API.post(route, userData);
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/");
            } else {
                navigate("/login");
            }
        } catch (error) {
            alert(JSON.stringify(error.response ? error.response.data : error.message));
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h1>{method === "login" ? "Login" : "Register"}</h1>
            <input
                className="form-input"
                type="email"
                name="email"
                value={fields.email}
                onChange={handleChange}
                placeholder="Email"
                required
            />
            <input
                className="form-input"
                type="password"
                name="password"
                value={fields.password}
                onChange={handleChange}
                placeholder="Password"
                required
            />
            {method === "register" && (
                <>
                    <input
                        className="form-input"
                        type="password"
                        name="confirm_password"
                        value={fields.confirm_password}
                        onChange={handleChange}
                        placeholder="Confirm Password"
                        required
                    />
                    <select
                        className="form-input"
                        name="user_type"
                        value={fields.user_type}
                        onChange={handleChange}
                    >
                        <option value="student">Student</option>
                        <option value="teacher">Teacher</option>
                        <option value="admin">Admin</option>
                        <option value="guest">Guest</option>
                    </select>
                    {userTypes[fields.user_type].includes("full_name") && (
                        <input
                            className="form-input"
                            type="text"
                            name="full_name"
                            value={fields.full_name}
                            onChange={handleChange}
                            placeholder="Full Name"
                        />
                    )}
                    {userTypes[fields.user_type].includes("student_id") && (
                        <input
                            className="form-input"
                            type="text"
                            name="student_id"
                            value={fields.student_id}
                            onChange={handleChange}
                            placeholder="Student ID"
                        />
                    )}
                    {userTypes[fields.user_type].includes("student_type") && (
                        <select
                            className="form-input"
                            name="student_type"
                            value={fields.student_type}
                            onChange={handleChange}
                        >
                            <option value="FR">Freshman</option>
                            <option value="SCH">School</option>
                        </select>
                    )}
                    {userTypes[fields.user_type].includes("department") && (
                        <select
                            className="form-input"
                            name="department"
                            value={fields.department}
                            onChange={handleChange}
                        >
                            <option value="CSE">Computer Science Engineering</option>
                            <option value="SE">Software Engineering</option>
                            <option value="Electrical">Electrical</option>
                            <option value="Civil">Civil</option>
                            <option value="Mechanical">Mechanical</option>
                            <option value="Applied">Applied</option>
                        </select>
                    )}
                    {userTypes[fields.user_type].includes("admission_year") && (
                        <input
                            className="form-input"
                            type="number"
                            name="admission_year"
                            value={fields.admission_year}
                            onChange={handleChange}
                            placeholder="Admission Year"
                        />
                    )}
                    {userTypes[fields.user_type].includes("graduation_year") && (
                        <input
                            className="form-input"
                            type="number"
                            name="graduation_year"
                            value={fields.graduation_year}
                            onChange={handleChange}
                            placeholder="Graduation Year"
                        />
                    )}
                    {userTypes[fields.user_type].includes("phone_number") && (
                        <input
                            className="form-input"
                            type="text"
                            name="phone_number"
                            value={fields.phone_number}
                            onChange={handleChange}
                            placeholder="Phone Number"
                        />
                    )}
                   
                    {userTypes[fields.user_type].includes("subject") && (
                        <input
                            className="form-input"
                            type="text"
                            name="subject"
                            value={fields.subject}
                            onChange={handleChange}
                            placeholder="Subject"
                        />
                    )}
                    {userTypes[fields.user_type].includes("role") && (
                        <input
                            className="form-input"
                            type="text"
                            name="role"
                            value={fields.role}
                            onChange={handleChange}
                            placeholder="Role"
                        />
                    )}
                </>
            )}
            {loading && <LoadingIndicator />}
            <button className="form-button" type="submit">
                {method === "login" ? "Login" : "Register"}
            </button>
        </form>
    );
}

export default Form;
