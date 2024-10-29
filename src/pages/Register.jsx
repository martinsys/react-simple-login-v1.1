import {useEffect, useState} from "react";
import {register} from "../config/firebase.js";
import {Formik} from "formik";
import btlogo from "../assets/bootstrap-logo.svg";
import {Link, useNavigate} from "react-router-dom";
import packageJson from "../../package.json";
import * as Yup from "yup";
import {useUserContext} from "../context/UserContext.jsx";

const Register = () => {

    const { user } = useUserContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) navigate("/dashboard");
    }, [user]);

    const handleSubmit = async  (e) =>{
        e.preventDefault();
        try {
            const credentialUser = await register({ email, password });
            console.log("user created", credentialUser);
        } catch (error) {
            console.log(error.code);
            console.log(error.message);
        }
    }

    const onSubmit = async (
        { email, password },
        { setSubmitting, setErrors, resetForm }
    ) => {
        try {
            await register({ email, password });
            console.log("user registered");
            resetForm();
        } catch (error) {
            console.log(error.code);
            console.log(error.message);
            if (error.code === "auth/email-already-in-use") {
                setErrors({ email: "Email already in use" });
            }
        } finally {
            setSubmitting(false);
        }
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string().email().required(),
        password: Yup.string().trim().min(6).required(),
    });

    const { dependencies } = packageJson;
    const version = packageJson.version;

    return (
        <>
            <main className="form-signin w-100 m-auto">
                <Formik
                    initialValues={{email: "", password: ""}}
                    onSubmit={onSubmit}
                    validationSchema={validationSchema}
                >
                    {({
                          handleSubmit,
                          handleChange,
                          values,
                          isSubmitting,
                          errors,
                          touched,
                          handleBlur,
                      }) => (
                        <form onSubmit={handleSubmit}>
                            <img className="mb-4" src={btlogo} alt="" width="72" height="57"/>
                            <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

                            <span
                                className="display-error text-danger-emphasis display-error-text">{errors.email && touched.email && errors.email}</span>
                            <div className="form-floating">

                                <input type="email" className="form-control" placeholder="name@example.com"
                                       value={values.email}
                                       onChange={handleChange}
                                       name="email"
                                       onBlur={handleBlur}/>
                                <label htmlFor="floatingInput">Email address</label>

                            </div>
                            <div className="form-floating">
                                <input type="password"
                                       className={`form-control mb-0 ${errors.password ? 'display-error-input' : ''}`}
                                       id="floatingPassword" placeholder="Password" value={values.password}
                                       onChange={handleChange}
                                       name="password"
                                       onBlur={handleBlur}/>
                                <label className={` ${errors.password ? 'display-error-input-label' : ''}`}
                                       htmlFor="floatingPassword">Password</label>

                            </div>
                            <span
                                className={`display-error text-danger-emphasis ${errors.password ? 'display-error-text' : ''}`}>{errors.password && touched.password && errors.password}</span>


                            <button className="btn btn-primary w-100 py-2 mt-4" type="submit"
                                    disabled={isSubmitting}>

                                {isSubmitting &&
                                    <span className="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
                                }

                                Sign in
                            </button>

                            <p className="text-center my-4">
                                <Link className="  link-offset-2 link-underline link-underline-opacity-100"
                                      to="/">Already have an account? login here.</Link>
                            </p>
                        </form>
                    )}
                </Formik>

            </main>
            <footer
                className="text-center mt-5 mb-3 text-body-secondary">
                <p className="fs-footer">© 2024 <span className="fw-bold">Simple Login v{version}</span> All rights
                    reserved to Martin Alegría.
                    MIT License.</p>
                <p className="fs-footer">Dependencies: &nbsp;
                    {Object.entries(dependencies).map(([name, version]) => (
                        <span key={name} className="fw-bold ">
                            {name}: {version}, &nbsp;
                        </span>
                    ))}
                </p>

                <p className="fs-footer">Code based on Bluuweb. <a
                    href="https://www.udemy.com/course/curso-react-js" className="links-custom">React
                    Course.</a></p>
            </footer>
        </>
    )
};

export default Register;
