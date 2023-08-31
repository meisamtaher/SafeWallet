import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Stack, SvgIcon } from '@mui/material';
import { styled } from '@mui/material/styles';
import {useNavigate} from 'react-router-dom';
import venomPNG from '../assets/venom.png';
import venomBridgePNG from '../assets/venom bridge.png';


function SendPage() {
    const navigate = useNavigate()
    const Transfer = ()=>{
    }
  return (
    <Stack direction={'column'} padding = {5} alignItems={'center'} justifyContent={'center'} spacing={5}>
        <TextField required id="RecieverAddress" label="Reciever Address"
            placeholder="0xhj7802hasnJASKLdh..sa35d"
            name= "name"
            />

        <Button sx={{width:300}} >Send</Button>
        <Stack sx ={{ width:"100%"}} direction={'row'} padding={5} justifyContent={'center'}>
            
            <Stack sx ={{width:"100%"}} direction={'column'} spacing={5} paddingTop={10}>
            </Stack>
        </Stack>
    </Stack>
  );
}
  
export default SendPage;