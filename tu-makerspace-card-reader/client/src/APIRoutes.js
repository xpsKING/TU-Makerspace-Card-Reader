

export function getUser(id) {
    return{
        method: 'get',
        url: 'http://localhost:8080/api/users/' + id,
        proxy: {
            host: 'localhost',
            port: 8080
        }
    }
}
export function disableMachine(id) {
   return{
        method: 'get',
        url: "http://localhost:8080/api/machines/disable/" + id, 
        proxy: {
            host: 'localhost',
            port: 8080
        }
    }
}
export function toggleMachine(machineid, userID) {
    return{
         method: 'put',
         data: { "userID": userID }, 
         url: "http://localhost:8080/api/machines/toggle/" + machineid, 
         proxy: {
             host: 'localhost',
             port: 8080
         }
     }
 }
export function getAllMachines(machineGroup) {
    return{
        method:'get',
        url: "http://localhost:8080/api/machines/group/" + machineGroup,
        proxy: {
            host: 'localhost',
            port: 8080
        }
    }
}