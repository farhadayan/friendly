import { Box } from "@mui/material";
import { useState } from "react";
import React from "react";

function MainContent(){

    const [count, setCount] = useState<number>(0);

    return (
        <Box sx={{width:"100%", height:"80vh"}}>
        <div>
            <h1>I am Main Body</h1>
            <button onClick={()=> setCount(count+1)}>
                Clicked {count} times
            </button>
        </div>
        </Box>
    )
}

export default MainContent;