const backendUrl="http://localhost:8000"


const SummaryApi={
    UserSignIn:{
        url:backendUrl+"/api/userSignUp",
        method:"POST"
    },
    UserAdmissionSignUp:{
        url:backendUrl+"/api/userAdmissionSignUp",
        method:"POST"
    }
}


export default SummaryApi