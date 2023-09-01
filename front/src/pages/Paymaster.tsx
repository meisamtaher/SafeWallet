import React, { useEffect, useState } from 'react';
import { BiconomySmartAccount} from "../account"
import {  IHybridPaymaster,SponsorUserOperationDto, PaymasterMode,} from '@biconomy/paymaster'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Stack, SvgIcon } from '@mui/material';
import Counter from '../Components/Counter';
import {useNavigate} from 'react-router-dom';

interface Props {
    smartAccount: any
    provider: any
  }
  

function Paymaster({ smartAccount, provider } : Props) {
    const navigate = useNavigate()
  return (
    <Stack direction={'column'} padding = {5} alignItems={'center'} justifyContent={'center'} spacing={5}>
      {
        !!smartAccount && (
          <div className="buttonWrapper">
            <Counter smartAccount={smartAccount} provider={provider} />
          </div>
        )
      }
    </Stack>
  );
}
  
export default Paymaster;