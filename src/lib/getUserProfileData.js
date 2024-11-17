//Returns the profile data of the user

// import { getUsers } from "./getUsers";

const getUserProfileData = () =>{
    // const User = getUsers();
    // console.log(User);
    return {
        name: 'Sajal Saha',
        role: 'Assistant Professor', 
        email: 'sajal.saha@adamasuniversity.ac.in',
        phone: '+91 9876543210',
        address: 'Kolkata, West Bengal, India',
        university: 'Adamas University',
        school: 'School of Engineering & Technology (SOET)',
        department: 'Computer Science & Engineering',
        employeeId: '59871',
        specialization: 'Data Structures & Algorithms',
        experience: '8+',
    }
}

export default getUserProfileData;