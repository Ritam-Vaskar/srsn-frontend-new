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
    }
}


export default SummaryApi