const backendUrl="http://localhost:8000"


const SummaryApi={
    //User sign up and sign in 
    UserSignIn:{
        url:backendUrl+"/api/userSignIn",
        method:"POST"
    },
    UserAdmissionSignUp:{
        url:backendUrl+"/api/userAdmissionSignUp",
        method:"POST"
    },
    UserLogout:{
        url:backendUrl+"/api/userLogout",
        method:"POST"
    },
    //User Profile
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
    },
    UserMarksSubmission:{
        url:backendUrl+"/api/userMarksSubmission",
        method:"POST"
    },

    //Alumni
    AlumniFetch:{
        url:backendUrl+"/api/alumniView",
        method:"GET"
    },
    AlumniSearch:{
        url:backendUrl+"/api/alumniSearch",
        method:"POST"
    },
    AlumniApplicationSave:{
        url:backendUrl+"/api/alumniTempSave",
        method:"POST"
    },

    //Notice

    NoticeEntery:{
        url:backendUrl+"/api/noticeEntery",
        method:"POST"
    },
    NoticeFetch:{
        url:backendUrl+"/api/noticeFetch",
        method:"GET"
    }
}


export default SummaryApi