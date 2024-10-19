const backendUrl="http://localhost:8000"


const SummaryApi={
    UserSignUp:{
        url:`${backendUrl}/api/userSignUp`,
        method:"post"
    },
    UserLogin:{
        url:`${backendUrl}/api/userSignIn`,
        method:"post"
    },
    FetchUsersAdmin:{
        url:`${backendUrl}/api/studentFetch1`,
        method:"get"
    },
    FetchuserTeacher:{
        url:`${backendUrl}/api/studentFetch2`,
        method:"get"
    }
}


export default SummaryApi