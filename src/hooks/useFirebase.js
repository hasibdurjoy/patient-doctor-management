import { useEffect, useState } from 'react';
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    getIdToken,
    onAuthStateChanged,
    updateProfile,
} from "firebase/auth";
import initializeAuthentication from '../Pages/Authentication/Firebase/firebase.init';

initializeAuthentication();

const useFirebase = () => {
    const [user, setUser] = useState({});
    const [authError, setAuthError] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [admin, setAdmin] = useState(false);
    const [authToken, setAuthToken] = useState('');

    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();

    const registerUser = (email, password, name, role, dateOfBirth, image, navigate) => {
        setIsLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setAuthError('');
                const newUser = { email, displayName: name, role, dateOfBirth };
                setUser(newUser);

                saveUser(email, name, role, dateOfBirth, image, 'POST');

                updateProfile(auth.currentUser, {
                    displayName: name
                })
                    .then(() => {

                    })
                    .catch((error) => {

                    });
                navigate('/');
            })
            .catch((error) => {
                const errorCode = error.code;
                setAuthError(error.message);
                // ..
            })
            .finally(() => setIsLoading(false));

    }

    const loginUser = (email, password, location, navigate) => {
        setIsLoading(true);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const destination = location?.state?.from || '/';
                navigate(destination);
                setAuthError('');
            })
            .catch((error) => {
                setAuthError(error.message);
            })
            .finally(() => setIsLoading(false));
    }

    const logInWithGoogle = (location, navigate) => {
        setIsLoading(true);
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                const user = result.user;
                setAuthError('');
                saveUser(user.email, user.displayName, 'PUT');
                const destination = location?.state?.from || '/';
                navigate(destination);
            })
            .catch((error) => {
                setAuthError(error.message);
            })
            .finally(() => setIsLoading(false));
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                getIdToken(user)
                    .then(idToken => {
                        setAuthToken(idToken);
                    })
            } else {
                setUser({});
            }
            setIsLoading(false)
        });
        return () => unsubscribe;
    }, []);

    useEffect(() => {
        fetch(`http://localhost:5000/users/${user.email}`)
            .then(res => res.json())
            .then(data => {
                setAdmin(data.admin);
            })
    }, [user.email]);

    const logOut = () => {
        setIsLoading(true);
        signOut(auth).then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
        })
            .finally(() => setIsLoading(false));
    }

    const saveUser = (email, displayName, role, dateOfBirth, image, method) => {
        // const user = { email, displayName, role, dateOfBirth, formData };
        const formData = new FormData();
        formData.append('name', displayName);
        formData.append('role', role);
        formData.append('dateOfBirth', dateOfBirth);
        formData.append('email', email);
        formData.append('image', image);
        let url = '';


        if (role === 'patient') {
            url = 'http://localhost:5000/patients'
        }
        if (role === 'doctor') {
            url = 'http://localhost:5000/doctors'
        }

        fetch(url, {
            method: method,
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    // setSuccess('Doctor added successfully')
                    console.log('doctor added successfully')
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
    return {
        user,
        admin,
        authToken,
        isLoading,
        authError,
        registerUser,
        loginUser,
        logInWithGoogle,
        logOut,
    }
}

export default useFirebase;