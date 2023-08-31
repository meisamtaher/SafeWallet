import React, { useEffect, useState } from 'react';
import { BiconomySmartAccount} from "@biconomy/account"
import {  IHybridPaymaster,SponsorUserOperationDto, PaymasterMode,} from '@biconomy/paymaster'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Stack, SvgIcon } from '@mui/material';
import Counter from '../Components/Counter';
import {useNavigate} from 'react-router-dom';

interface Props {
    smartAccount: BiconomySmartAccount
    provider: any
  }

function SendPage({ smartAccount, provider } : Props) {
    const navigate = useNavigate()

    const transfer = ()=>{
      
    }
  return (
    <Stack direction={'column'} padding = {5} alignItems={'center'} justifyContent={'center'} spacing={5}>
        <TextField required id="RecieverAddress" label="Reciever Address"
            placeholder="0xhj7802hasnJASKLdh..sa35d"
            name= "name"
            />

        <Button sx={{width:300}} onClick={transfer}>Send</Button>
        <Stack sx ={{ width:"100%"}} direction={'row'} padding={5} justifyContent={'center'}>
            <Stack sx ={{width:"100%"}} direction={'column'} spacing={5} paddingTop={10}>
            </Stack>
        </Stack>
    </Stack>
  );
}
  
export default SendPage;