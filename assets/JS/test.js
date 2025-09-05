fetch("https://fakestoreapi.com/users").then((res)=>res.json()).then((data)=>{
    console.log(data[0]);
})