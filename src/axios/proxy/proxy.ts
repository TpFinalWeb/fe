import http from "../http-common.ts"


// this is a test function to see if the connection is working
export async function getTestings() {
    try {
        return await http.get("/v2/products/").then(
            res => {
                console.log(res.data);
                return res.data;
            }
        )
    }catch(error){
        console.log(error);
    }
}