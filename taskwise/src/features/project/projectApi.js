import { axiosi } from "../../config/axios";

export const fetchProjects=async(userId)=>{
    try{
        const res=await axiosi.get(`/workspaces/user/${userId}/projects`);
        return {data:res.data}
    }catch(error){
        throw error.response.data
    }
}
export const fetchProjectById=async(id)=>{
    try{
        const res=await axiosi.get(`/projects/${id}`);
        return res.data
    }catch(error){
        throw error.response.data
    }
}

export const addProject=async(data)=>{
    try{
        const res=await axiosi.post(`/projects`,data);
        return res.data
    }catch(error){
        throw error.response.data
    }
}

export const addTask=async(task,id)=>{
    console.log(task,id,"project slice")
    try{
        const res=await axiosi.post(`/projects/${id}/tasks`,task);
        return res.data
    }catch(error){
        throw error.response.data
    }
}

export const moveTask=async(data,idObject)=>{
    const { id, taskId } = idObject;
    try{
        const res=await axiosi.put(`/projects/${id}/tasks/${taskId}/move`,data)
        return res.data
    }catch(error){
        throw error.response.data
    }
}

export const addColumn=async(data,id)=>{
    try{
        const res=await axiosi.post(`/projects/${id}/columns`,data);
        return res.data
    }catch(error){
        throw error.response.data
    }
}
export const editColumn=async(data,idObject)=>{
    try{
        const { id, columnId } = idObject;
        const res=await axiosi.put(`/projects/${id}/columns/${columnId}`,data);
        return res.data
    }catch(error){
        throw error.response.data
    }
}

export const editTask=async(data,idObject)=>{
    try{
        const { id, taskId } = idObject;
        console.log(data,"editdata")
        const res=await axiosi.put(`/projects/${id}/tasks/${taskId}`,data);
        return res.data
    }catch(error){
        throw error.response.data
    }
}

export const fetchWorkspaceMembers=async(workspaceId)=>{
    try{
        const res=await axiosi.get(`/workspaces/${workspaceId}/members`);
        return {data:res.data}
    }catch(error){
        throw error.response.data
    }
  }

export const columnOrderChange=async({order,projectId})=>{
    console.log(order,projectId)
    try{
        const res=await axiosi.put(`/projects/${projectId}/order`,{order});
        return res.data
    }catch(error){
        throw error.response.data
    }
}

export const deactivateTask=async(idObject)=>{
    const {projectId, taskId}=idObject;
    console.log(idObject,"idObject")
    try{
        const res=await axiosi.put(`/projects/${projectId}/tasks/${taskId}/deactivate`);
        return res.data
    }catch(error){
        throw error.response.data
    }
}

export const createProjectAI=async(data)=>{
    try{
        const res=await axiosi.post(`projects/createAI`,data);
        return res.data
    }catch(error){
        throw error.response.data
    }
}
