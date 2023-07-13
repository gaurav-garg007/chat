let BASE_URL = 'https://chat-app-dusky-tau.vercel.app/api/v1'
export const API_URLs={
    login: `${BASE_URL}/login`,
    register: `${BASE_URL}/register`,
    userList: `${BASE_URL}/getuserlist`,
    getProfile: `${BASE_URL}/profile`,
    initializeChat: (id)=>{
        return `${BASE_URL}/initlizechat/${id}`
    },
    sendChat: (txnId)=>{
        return `${BASE_URL}/add-chat/${txnId}`
    },
    getChat: (txnId)=>{
        return `${BASE_URL}/get-chat/${txnId}`
    }
}