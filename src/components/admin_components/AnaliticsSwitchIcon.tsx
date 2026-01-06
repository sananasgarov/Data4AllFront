import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import { useState } from 'react';


const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 34,
    height: 20,
    padding: 0,
    display: 'flex',
    '&:active': {
        '& .MuiSwitch-thumb': {
            width: 13,
        },
        '& .MuiSwitch-switchBase.Mui-checked': {
            transform: 'translateX(9px)',
            
        },
    },
    '& .MuiSwitch-switchBase': {
        padding: 3,
        
        '&.Mui-checked': {
            transform: 'translateX(13px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: '#1890ff',
                ...theme.applyStyles('dark', {
                    backgroundColor: '#177ddc',
                }),
            },
        },
    },
    '& .MuiSwitch-thumb': {
        boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
        width: 14,
        height: 14,
        borderRadius: 12,
        
        transition: theme.transitions.create(['width'], {
            duration: 200,
        }),
    },
    '& .MuiSwitch-track': {
    borderRadius: 22 / 2,
    opacity: 1,
    backgroundColor: '#b0bfc6',
    boxSizing: 'border-box',
    ...theme.applyStyles('dark', {
        backgroundColor: '#b0bfc6',
    }),
},

}));

export default function AnaliticsSwitchIcon() {
    const [isActive,setIsActive] = useState(false)
    return (
        <FormGroup onClick={(e)=>{e.stopPropagation() ;setIsActive(!isActive)}}>
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                <AntSwitch defaultChecked inputProps={{ 'aria-label': 'ant design' }} />
            </Stack>
        </FormGroup>
    );
}