// export const baseUrl = "http://139.59.16.130:3010/";
// export const baseUrl = "http://localhost:3010/";
// export const baseUrl = 'http://192.168.158.5:5000/'

export const baseUrl = 'http://127.0.0.1:5000/'
export const ImageBaseUrl = baseUrl + 'uploads/'


//apis

export const getFacultyAPI = baseUrl + 'users'
export const deleteFacultyAPI = (id) => baseUrl + `users/${id}`

export const registerUser = baseUrl + `users/register`;

export const addCourseAPI = baseUrl + 'courses'
export const getCourseAPI = baseUrl + 'courses'
export const deleteCourseAPI = (id) => baseUrl + `courses/${id}`

export const addStudentAPI = baseUrl + 'students/register'
export const getStudentAPI = baseUrl + 'students'
export const deleteStudentAPI = (id) => baseUrl + `students/${id}`


export const getActivitiesAPI = baseUrl + 'activities'
export const addActivitesAPI = baseUrl + 'activities'

export const CommiteeAPI = baseUrl + 'commitee'
export const StudentAPI = baseUrl + 'student'
export const LoginAPI = baseUrl + "login"
export const FacultyAPI = baseUrl + 'faculty'

export const RegisterAPI = baseUrl + 'register'
export const UploadAPI = baseUrl + 'upload'

export const CommiteeUpdatesAPI = baseUrl + 'commiteeUpdate'