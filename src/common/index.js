const backendUrl="http://localhost:8000"


const SummaryApi={
    UserSignIn:{
        url:backendUrl+"/api/userSignIn",
        method:"POST"
    },
    UserAdmissionSignUp:{
        url:backendUrl+"/api/userAdmissionSignUp",
        method:"POST"
    },
    UserProfile:{
        url:backendUrl+"/api/userProfile",
        method:"GET"
    },
    UserEdit:{
        url:backendUrl+"/api/userEdit",
        method:"PUT"
    },
    StudentFetch:{
        url:backendUrl+"/api/studentFetch",
        method:"GET"
    },
    TeacherFetch:{
        url:backendUrl+"/api/teacherFetch",
        method:"GET"
    }
}


export default SummaryApi