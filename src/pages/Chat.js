import { Box } from "@mui/material";
import {
    InputSearch,
    ResultList,
    ItemResult } from "../components";
import { useAppContext } from "../tools/AppContext";


export default function Chat(){
    const [ {conversation}] = useAppContext()

    return <div className="App">
        <div className="App-header">
            <Box sx={{ width:'50%', backgroundColor:'#fff5', p:2, borderRadius:3 }}>
                <ResultList>
                    {conversation.map( item => <ItemResult key={item.id} message={item.choices[0].message.content} role={item.choices[0].message.role} />)}
                </ResultList>
                <InputSearch />
            </Box>
        </div>
    </div>
}