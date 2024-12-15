import StudentAppEdit from "../Schoolpages/Profile/Admin/StudentEditPopup/StudentEditPopup"

const backendUrl=import.meta.env.VITE_BACKEND_URL



const SummaryApi={
    //User sign up and sign in 
    UserSignIn:{
        url:backendUrl+"/api/userSignIn",
        method:"POST"
    },
    
    UserLogout:{
        url:backendUrl+"/api/userLogout",
        method:"POST"
    },

    ForgotPasswordOtpSend:{
        url:backendUrl+"/api/forgotpasswordotpsend",
        method:"POST"
    },

    ForgotPasswordOtpVerify:{
        url:backendUrl+"/api/forgotpasswordotpverify",
        method:"POST"
    },

    ResetPassword:{
        url:backendUrl+"/api/resetpassword",
        method:"POST"
    },

    

    //user admission
    UserAdmissionSignUp:{
        url:backendUrl+"/api/userAdmissionSignUp",
        method:"POST"
    },
    UserAdmissionFetch:{
        url:backendUrl+"/api/userAdmissionFetch",
        method:"GET"
    },
    userAdmissionAdd:{
        url:backendUrl+"/api/userAdmissionAdd",
        method:"POST"
    },
    userAdmissionAddArray:{
        url:backendUrl+"/api/userAdmissionAddArray",
        method:"POST"
    },
    UserAdmissionDelete:{
        url:backendUrl+"/api/userAdmissionDelete",
        method:"DELETE"
    },
    UserAdmissionSearch:{
        url:backendUrl+"/api/userAdmissionSearch",
        method:"POST"
    },

    //User Profile
    UserProfile:{
        url:backendUrl+"/api/userProfile",
        method:"GET"
    },
    UserSignUp:{ //User sign up
        url:backendUrl+"/api/userSignUp",
        method:"POST"
    },
    UserEdit:{
        url:backendUrl+"/api/userEdit",
        method:"PUT"
    },
    UserEditById:{
        url:backendUrl+"/api/userEditById",
        method:"PUT"
    },
    UserDelete:{
        url:backendUrl+"/api/deleteUser",
        method:"DELETE"
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
    AlumniApplicationFetch:{
        url:backendUrl+"/api/alumniApplicationView",
        method:"GET"
    },
    AlumniAccept:{
        url:backendUrl+"/api/alumniVeri",
        method:"POST"
    },
    AlumniReject:{
        url:backendUrl+"/api/alumniDelete",
        method:"DELETE"
    },
    AlumniOtpSend:{
        url:backendUrl+"/api/alumniOtp",
        method:"POST"
    },
    AlumniOtpVerify:{
        url:backendUrl+"/api/otpVerify",
        method:"POST"
    },
    AlumniDetailsFetch:{
        url:backendUrl+"/api/alumniDetails",
        method:"GET"
    },
    AlumniEdit:{
        url:backendUrl+"/api/alumniUpdateProfile",
        method:"PUT"
    },
    AlumniLogOut:{
        url:backendUrl+"/api/alumniLogOut",
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
    },
    NoticeDelete:{
        url:backendUrl+"/api/noticeDelete",
        method:"DELETE"
    },

    //user danger option

    UserGetResultPrimary:{
        url:backendUrl+"/api/getResultPrimary",
        method:"GET"
    },
    UserGetResultHigh:{
        url:backendUrl+"/api/getResultHigh",
        method:"GET"
    },

    UserChangeClass:{
        url:backendUrl+"/api/chnageYearClass",
        method:"PUT"
    },

    //Message
    Message:{
        url:backendUrl+"/api/message",
        method:"POST"
    },

    //is admission ongoing
    AdmissionFetch: {
        url: backendUrl + "/api/admissionFetch", 
        method: "GET",
    },
    EventEdit: {
        url: backendUrl + "/api/eventEdit", 
        method: "PUT",
    },
    MarksSubmissionFetch: {
        url: backendUrl + "/api/marksSubmissionFetch", 
        method: "GET",
    },
    EventToggle: {
        url: backendUrl + "/api/eventToggle", 
        method: "PUT",
    },
    Eventfetch: {
        url: backendUrl + "/api/eventFetch", 
        method: "GET",
    },

    UserEditById: {
        url: backendUrl + "/api/userEditById", 
        method: "PUT",
    },

    //Blog
    BlogFetch: {
        url: backendUrl + "/api/blogFetch", 
        method: "GET",
    },
    BlogDelete: {
        url: backendUrl + "/api/blogDelete", 
        method: "DELETE",
    },
    BlogAdd: {
        url: backendUrl + "/api/blogAdd", 
        method: "POST",
    },

}   


export default SummaryApi