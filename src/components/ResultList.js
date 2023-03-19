import { List, ListItem, ListItemText, Typography } from "@mui/material"

export default function ResultList({ children }){

    return <List sx={{ color:'#000', backgroundColor:'#fff', mb:2, borderRadius:3 }}>
        <ListItem>
            <ListItemText primary={<Typography sx={{ fontWeight:'bold' }}>Chat</Typography>} sx={{display:'flex', justifyContent:'center' }}/>
        </ListItem>
        { children }
    </List>
}