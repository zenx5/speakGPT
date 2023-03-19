import { ListItem, ListItemText } from "@mui/material"

export default function ItemResult( props ){

    const { message, role } = props

    return <ListItem >
    <ListItemText
        primary={ message }
        sx={{
            display:'flex',
            justifyContent: role==='assistant'?'flex-end':'flex-start'
        }}
        />
    </ListItem>
}