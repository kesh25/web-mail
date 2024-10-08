import {getDoc, postDoc, patchDoc} from '@/utils/api-calls';

export const login = async (data: {email: string, password: string}) => {
  const res = await postDoc (`/auth/login`, data, true);
  if (res?.status === "success") {
    let user = res.data; 
    let token = res.token; 
    return {user, token}; 
  }  
  return null; 
};
 

export const requestPasswordToken = async (data: {email: string}, admin?: boolean) => {
  const res = await patchDoc(`/auth/password?type=forgot${admin ? "&role=admin": ""}`, data, true); 
  if (res?.status === 'success')  return res.message; 
  return false; 
}

export const resetPassword = async (data: {password: string, passwordConfirm: string}, token: string, admin?: boolean) => {
  const res = await patchDoc(`/auth/password?type=reset&token=${token}${admin ? "&role=admin": ""}`, data, true); 
  if (res?.status === "success") return res.message; 
  return false; 
}
