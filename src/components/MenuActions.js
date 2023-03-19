import { useState } from 'react';
import { ButtonBase, Typography, Menu, MenuItem } from '@mui/material';
import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material';

export default function MenuActions( props ) {
    const { items, onAction } = props
    const [option, setOption] = useState(1)
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handlerClose = (value = 0) => () => {
        setAnchorEl(null);
        if( value !== 0 ){
            setOption( prev => value )
        }
    };
    const handlerAction = () => {
        if( onAction ) onAction(option)
    }

  return (
    <>
        <Typography sx={{ display:'flex', flexDirection:'row', alignItems:'center' }}>
            <ButtonBase onClick={handlerAction}>
                { items[option - 1] }
            </ButtonBase>
            <ButtonBase
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                { anchorEl ? <ArrowDropUp /> : <ArrowDropDown />}
            </ButtonBase>
        </Typography>
        <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handlerClose(0)}
            MenuListProps={{'aria-labelledby': 'basic-button'}}
        >
            {items.map( (item, index) => <MenuItem onClick={handlerClose(index+1)}>{item}</MenuItem>)}
        </Menu>
    </>
  );
}
