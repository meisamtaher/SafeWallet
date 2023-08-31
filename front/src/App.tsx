import './App.css'
import "@Biconomy/web3-auth/dist/src/style.css"
import { useState, useEffect, useRef } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Signer, ethers } from 'ethers'
import { BiconomySmartAccount,BiconomySmartAccountConfig, DEFAULT_ENTRYPOINT_ADDRESS, SmartAccount } from "@biconomy/account";
import MainLayout from './Components/MainLayout';
import SendPage from './pages/SendPage';
import Paymaster from './pages/Paymaster';
import Escrow from './pages/Escrow';
// import styles from '@/styles/Home.module.css'

export default function Home() {
  const [smartAccount, setSmartAccount] = useState<any>(null)
  const [provider, setProvider] = useState<any>(null);
  return (
      <BrowserRouter>
      <MainLayout smartAccount = {smartAccount} provider= {provider} setSmartAccount = {setSmartAccount} setProvider= {setProvider}/>
      <Routes>

          <Route path = "/Send" element = {<SendPage smartAccount = {smartAccount} provider= {provider}/>} />
          <Route path = "/Paymaster" element = {<Paymaster smartAccount = {smartAccount} provider= {provider}/>} />
          <Route path = "/Escrow" element = {<Escrow smartAccount = {smartAccount} provider= {provider}/>} />
          {/*<Route path = "/venomDAOBuilder-front/ExploreDAO" element={<ExploreDAO venomConnect = {venomConnect}/>} />
          <Route path = "/venomDAOBuilder-front/CreateDAOIntro" element={<CreateDAOIntro />} />
          <Route path = "/venomDAOBuilder-front/CreateDAO" element={<CreateDAO venomConnect= {venomConnect} venomProvider= {venomProvider} address = {address}/>} />
          <Route path = "/venomDAOBuilder-front/ExploreDAO/:DAOId" element={<DAODetails venomConnect= {venomConnect} />} />
          <Route path = "/venomDAOBuilder-front/ExploreDAO/:DAOId/:ProposalId" element={<ProposalDetails venomConnect= {venomConnect} venomProvider= {venomProvider} address = {address}/>} />
          <Route path = "/venomDAOBuilder-front/ExploreDAO/:DAOId/CreateNewPropoal" element={<CreateProposal venomConnect= {venomConnect} venomProvider= {venomProvider} address = {address}/>} /> */}
          {/* <Route path="blogs" element={<Blogs />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} /> */}

      </Routes>
    </BrowserRouter>
  )
}



