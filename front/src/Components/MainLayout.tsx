import {useNavigate} from 'react-router-dom';
import React, { useEffect, useState, useRef } from 'react';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Logo from '../assets/react.svg';
import { Label } from '@mui/icons-material';
import SocialLogin from "@biconomy/web3-auth"
import { ChainId } from "@biconomy/core-types";
import { Signer, ethers } from 'ethers'
import { IBundler, Bundler } from '@biconomy/bundler'
import { BiconomySmartAccount,BiconomySmartAccountConfig, DEFAULT_ENTRYPOINT_ADDRESS } from "@biconomy/account";
import { IPaymaster, BiconomyPaymaster,} from '@biconomy/paymaster'
import Counter from './Counter';

const pages = ['Send'];

const bundler: IBundler = new Bundler({
  bundlerUrl: 'https://bundler.biconomy.io/api/v2/5/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44', // you can get this value from biconomy dashboard.     
  chainId: ChainId.GOERLI,
  entryPointAddress: DEFAULT_ENTRYPOINT_ADDRESS,
})

const paymaster: IPaymaster = new BiconomyPaymaster({
  paymasterUrl: 'https://paymaster.biconomy.io/api/v1/5/XoAFWgAVQ.67c786ef-58ec-4aa3-a2a9-d45b969766bf'
})
function MainLayout() {
  const navigate = useNavigate();
  const [smartAccount, setSmartAccount] = useState<any>(null)
  const [interval, enableInterval] = useState(false)
  const sdkRef = useRef<SocialLogin | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [provider, setProvider] = useState<any>(null);

  useEffect(() => {
    let configureLogin:any
    if (interval) {
      configureLogin = setInterval(() => {
        if (!!sdkRef.current?.provider) {
          setupSmartAccount()
          clearInterval(configureLogin)
        }
      }, 1000)
    }
  }, [interval])

  async function login() {
    if (!sdkRef.current) {
      const socialLoginSDK = new SocialLogin()
      const signature1 = await socialLoginSDK.whitelistUrl('http://127.0.0.1:5173/')
      await socialLoginSDK.init({
        chainId: ethers.utils.hexValue(ChainId.GOERLI).toString(),
        network: "testnet",
        whitelistUrls: {
          'http://127.0.0.1:5173': signature1,
        }
      })
      sdkRef.current = socialLoginSDK
    }
    if (!sdkRef.current.provider) {
      sdkRef.current.showWallet()
      enableInterval(true)
    } else {
      setupSmartAccount()
    }
  }

  async function setupSmartAccount() {
    if (!sdkRef?.current?.provider) return
    sdkRef.current.hideWallet()
    setLoading(true)
    const web3Provider = new ethers.providers.Web3Provider(
      sdkRef.current.provider
    )
    setProvider(web3Provider)
    
    try {
      const biconomySmartAccountConfig: BiconomySmartAccountConfig = {
        signer: web3Provider.getSigner(),
        chainId: ChainId.GOERLI,
        bundler: bundler,
        paymaster: paymaster
      }
      console.log("signer: ", web3Provider.getSigner());
      let biconomySmartAccount = new BiconomySmartAccount(biconomySmartAccountConfig)
      biconomySmartAccount =  await biconomySmartAccount.init()
      console.log("owner: ", biconomySmartAccount.owner)
      console.log("address: ", await biconomySmartAccount.getSmartAccountAddress())
      console.log("deployed: ", await biconomySmartAccount.isAccountDeployed( await biconomySmartAccount.getSmartAccountAddress()))

      setSmartAccount(biconomySmartAccount)
      setLoading(false)
    } catch (err) {
      console.log('error setting up smart account... ', err)
    }
  }

  const logout = async () => {
    if (!sdkRef.current) {
      console.error('Web3Modal not initialized.')
      return
    }
    await sdkRef.current.logout()
    sdkRef.current.hideWallet()
    setSmartAccount(null)
    enableInterval(false)
  }
  const [address, setAddress] = useState();


  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleLogoClick = () => {
    navigate("/");
  };

  const handleCloseNavMenu = (key: string) => {
    if(key == "Send"){
      navigate("/Send");
    }
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {
    if (address) getBalance(address);
  }, [address]);
  
  return (
    <AppBar position="static" style={{ background: "linear-gradient(269.67deg, #CCE1FA -10.61%, #C6EEEA 113.26%)" }} >
      <Container maxWidth="xl" >
        <Toolbar disableGutters >
      {/* {
        !!smartAccount && (
          <div className="buttonWrapper">
            <Counter smartAccount={smartAccount} provider={provider} />
          </div>
        )
      } */}
          <img src={Logo} width={40} onClick={handleLogoClick} />
          <Box  sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={()=>handleCloseNavMenu(page)}
                sx={{ my: 2, color: '#352D50', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
          {!!smartAccount && (<Button sx={{ color: 'white', my: 1, mx: 1.5 }} disabled >{smartAccount.address}</Button>)}
          {loading && <p>Loading account details...</p>}
          {!!smartAccount && <Button variant="outlined" sx={{ color: 'white', my: 1, mx: 1.5 }} className="logout" onClick={logout}>
               log out
             </Button>}
          { !smartAccount && !loading && <Button onClick={login}>Login</Button>}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default MainLayout;