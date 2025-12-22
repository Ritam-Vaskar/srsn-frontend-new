import StudentAppEdit from "../Schoolpages/Profile/Admin/StudentEditPopup/StudentEditPopup"

// Use relative URLs - nginx will proxy /api requests to backend
// Browser → /api/... → nginx → http://backend:8000/api/...
// In development, Vite proxy will handle this (if configured)
// In production, nginx reverse proxy handles this
// Always use /api prefix - proxy routes it to backend
const apiURI=import.meta.env.VITE_BACKEND_URL||"http://api.srsnrng.in";
const apiBase = apiURI+"/api";

const SummaryApi={
    //fcm token
    FcmTokenSend:{
        url:apiBase+"/save-token",
        method:"POST"
    },
    //User sign up and sign in 
    UserSignIn:{
        url:apiBase+"/userSignIn",
        method:"POST"
    },
    
    UserLogout:{
        url:apiBase+"/userLogout",
        method:"POST"
    },

    UserRefreshToken:{
        url:apiBase+"/refresh-token",
        method:"POST"
    },

    ForgotPasswordOtpSend:{
        url:apiBase+"/forgotpasswordotpsend",
        method:"POST"
    },

    ForgotPasswordOtpVerify:{
        url:apiBase+"/forgotpasswordotpverify",
        method:"POST"
    },

    ResetPassword:{
        url:apiBase+"/resetpassword",
        method:"POST"
    },

    UserGoogleLogin:{
        url:apiBase+"/userGoogleLogin",
        method:"POST"
    },

    //user admission
    UserAdmissionSignUp:{
        url:apiBase+"/userAdmissionSignUp",
        method:"POST"
    },
    UserAdmissionFetch:{
        url:apiBase+"/userAdmissionFetch",
        method:"GET"
    },
    userAdmissionAdd:{
        url:apiBase+"/userAdmissionAdd",
        method:"POST"
    },
    userAdmissionAddArray:{
        url:apiBase+"/userAdmissionAddArray",
        method:"POST"
    },
    UserAdmissionDelete:{
        url:apiBase+"/userAdmissionDelete",
        method:"DELETE"
    },
    UserAdmissionSearch:{
        url:apiBase+"/userAdmissionSearch",
        method:"POST"
    },

    //User Profile
    UserProfile:{
        url:apiBase+"/userProfile",
        method:"GET"
    },
    UserSignUp:{ //User sign up
        url:apiBase+"/userSignUp",
        method:"POST"
    },
    UserEdit:{
        url:apiBase+"/userEdit",
        method:"PUT"
    },
    UserEditById:{
        url:apiBase+"/userEditById",
        method:"PUT"
    },
    UserDelete:{
        url:apiBase+"/deleteUser",
        method:"DELETE"
    },
    StudentFetch:{
        url:apiBase+"/studentFetch",
        method:"GET"
    },
    TeacherFetch:{
        url:apiBase+"/teacherFetch",
        method:"GET"
    },
    UserMarksSubmission:{
        url:apiBase+"/userMarksSubmission",
        method:"POST"
    },

    //Alumni
    AlumniFetch:{
        url:apiBase+"/alumniView",
        method:"GET"
    },
    AlumniSearch:{
        url:apiBase+"/alumniSearch",
        method:"POST"
    },
    AlumniApplicationSave:{
        url:apiBase+"/alumniTempSave",
        method:"POST"
    },
    AlumniApplicationFetch:{
        url:apiBase+"/alumniApplicationView",
        method:"GET"
    },
    AlumniAccept:{
        url:apiBase+"/alumniVeri",
        method:"POST"
    },
    AlumniReject:{
        url:apiBase+"/alumniDelete",
        method:"DELETE"
    },
    AlumniOtpSend:{
        url:apiBase+"/alumniOtp",
        method:"POST"
    },
    AlumniOtpVerify:{
        url:apiBase+"/otpVerify",
        method:"POST"
    },
    AlumniDetailsFetch:{
        url:apiBase+"/alumniDetails",
        method:"GET"
    },
    AlumniEdit:{
        url:apiBase+"/alumniUpdateProfile",
        method:"PUT"
    },
    AlumniLogOut:{
        url:apiBase+"/alumniLogOut",
        method:"POST"
    },
    AlumniGoogleLogin:{
        url:apiBase+"/alumniGoogleLogin",
        method:"POST"
    },

    //Notice

    NoticeEntery:{
        url:apiBase+"/noticeEntery",
        method:"POST"
    },
    NoticeFetch:{
        url:apiBase+"/noticeFetch",
        method:"GET"
    },
    NoticeDelete:{
        url:apiBase+"/noticeDelete",
        method:"DELETE"
    },

    //user danger option

    UserGetResultPrimary:{
        url:apiBase+"/getResultPrimary",
        method:"GET"
    },
    UserGetResultHigh:{
        url:apiBase+"/getResultHigh",
        method:"GET"
    },

    UserChangeClass:{
        url:apiBase+"/chnageYearClass",
        method:"PUT"
    },

    //Message
    Message:{
        url:apiBase+"/message",
        method:"POST"
    },

    //is admission ongoing
    AdmissionFetch: {
        url: apiBase + "/admissionFetch", 
        method: "GET",
    },
    EventEdit: {
        url: apiBase + "/eventEdit", 
        method: "PUT",
    },
    MarksSubmissionFetch: {
        url: apiBase + "/marksSubmissionFetch", 
        method: "GET",
    },
    EventToggle: {
        url: apiBase + "/eventToggle", 
        method: "PUT",
    },
    Eventfetch: {
        url: apiBase + "/eventFetch", 
        method: "GET",
    },

    UserEditById: {
        url: apiBase + "/userEditById", 
        method: "PUT",
    },

    //Blog
    BlogFetch: {
        url: apiBase + "/blogFetch", 
        method: "GET",
    },
    BlogDelete: {
        url: apiBase + "/blogDelete", 
        method: "DELETE",
    },
    BlogAdd: {
        url: apiBase + "/blogAdd", 
        method: "POST",
    },

}   


export default SummaryApi