

export function getUser(id) {
    return{
        method: 'get',
        url: 'https://localhost:8443/api/users/' + id,
        proxy: {
            host: 'localhost',
            port: 8443
        }
    }
}
export function disableMachine(id) {
   return{
        method: 'get',
        url: "https://localhost:8443/api/machines/disable/" + id, 
        proxy: {
            host: 'localhost',
            port: 8443
        }
    }
}
export function toggleMachine(machineid, userID) {
    return{
         method: 'put',
         data: { "userID": userID }, 
         url: "https://localhost:8443/api/machines/toggle/" + machineid, 
         proxy: {
             host: 'localhost',
             port: 8443
         }
     }
 }
export function getAllMachines(machineGroup) {
    return{
        method:'get',
        url: "https://localhost:8443/api/machines/group/" + machineGroup,
        proxy: {
            host: 'localhost',
            port: 8443
        }
    }
}

export function addUser(newUser) {
    return {
        method: 'post',
        data: {id: newUser.id, name: newUser.name, email: newUser.email, splash : newUser.splash, user: newUser.authID},
        url: 'https://localhost:8443/api/users/',
        proxy: {
            host: 'localhost',
            port: 8443,
        }
    }
}