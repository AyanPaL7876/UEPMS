import { createContext, useContext, useState } from 'react';
import { useRouter } from "next/navigation";

const CreateUserContext = createContext();

const VALID_ROLES = ["admin", "coe", "hod", "teacher"];
const VALID_TEACHER_TYPES = ["external", "internal"];

export const CreateUserProvider = ({ children }) => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [universityName, setUniversityName] = useState('');
  const [school, setSchool] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [department, setDepartment] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [experience, setExperience] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [teacherType, setTeacherType] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    // Basic validation
    if (!name || !email || !password || !role || !universityName || 
        !phone || !address || !employeeId || !specialization || !experience) {
      setErrorMessage(`Please fill in all required fields : ${name}, ${email}, ${password}, ${role}, ${universityName}, ${phone}, ${address}, ${employeeId}, ${specialization}, ${experience}`);
      return false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Invalid email format');
      return false;
    }

    // Phone validation
    if (phone.length !== 10) {
      setErrorMessage('Phone number must be 10 digits');
      return false;
    }

    // Role validation
    if (!VALID_ROLES.includes(role)) {
      setErrorMessage(`Invalid role. Must be one of: ${VALID_ROLES.join(", ")}`);
      return false;
    }

    // Role-specific validation
    if ((role === "hod" || role === "teacher") && (!school || !department)) {
      setErrorMessage('School and department are required for HOD and teacher roles');
      return false;
    }

    if (role === "teacher" && (!teacherType || !VALID_TEACHER_TYPES.includes(teacherType))) {
      setErrorMessage(`Teacher type must be either ${VALID_TEACHER_TYPES.join(" or ")}`);
      return false;
    }

    // Password validation
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return false;
    }

    return true;
  };

  const resetForm = () => {
    setErrorMessage('');
    setName('');
    setRole('');
    setEmail('');
    setPhone('');
    setAddress('');
    setUniversityName('');
    setSchool('');
    setSpecialization('');
    setDepartment('');
    setEmployeeId('');
    setExperience('');
    setPassword('');
    setConfirmPassword('');
    setTeacherType('');
  };

  const handleSubmit = async () => {
    console.log('Submitting form...');
    try {
      setIsLoading(true);
      setErrorMessage('');

      if (!validateForm()) {
        setIsLoading(false);
        return;
      }

      const requestBody = {
        name,
        role,
        email,
        phone,
        address,
        universityName,
        school,
        specialization,
        department,
        employeeId,
        experience: Number(experience),
        password,
        ...(role === 'teacher' && { teacherType })
      };

      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      // Success
      resetForm();
      // You might want to add a success message or redirect here
      console.log('User created successfully:', data);
      
      router.push('/profile');
      
    } catch (error) {
      console.error('Sign-up Error:', error);
      setErrorMessage(error.message || 'Failed to create user');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CreateUserContext.Provider
      value={{
        errorMessage,
        setErrorMessage,
        name,
        setName,
        role,
        setRole,
        email,
        setEmail,
        phone,
        setPhone,
        address,
        setAddress,
        universityName,
        setUniversityName,
        school,
        setSchool,
        specialization,
        setSpecialization,
        department,
        setDepartment,
        employeeId,
        setEmployeeId,
        experience,
        setExperience,
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
        teacherType,
        setTeacherType,
        isLoading,
        resetForm,
        handleSubmit,
      }}
    >
      {children}
    </CreateUserContext.Provider>
  );
};

export const useCreateUser = () => {
  const context = useContext(CreateUserContext);
  if (!context) {
    throw new Error('useCreateUser must be used within a CreateUserProvider');
  }
  return context;
};