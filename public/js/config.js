const backendDomain = 'http://ec2-43-201-110-205.ap-northeast-2.compute.amazonaws.com';
// const backendDomain = 'http://localhost:8090';


function getBackendDomain(){
    return backendDomain;
}

export { getBackendDomain };