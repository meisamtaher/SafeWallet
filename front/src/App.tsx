import './App.css'
import "@Biconomy/web3-auth/dist/src/style.css"
import { useState, useEffect, useRef } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Signer, ethers } from 'ethers'
import { BiconomySmartAccount,BiconomySmartAccountConfig, DEFAULT_ENTRYPOINT_ADDRESS } from "@biconomy/account";
import MainLayout from './Components/MainLayout';
import SendPage from './pages/SendPage';
// import styles from '@/styles/Home.module.css'

export default function Home() {
  
  return (
      <BrowserRouter>
      <MainLayout  />
      <Routes>

          <Route path = "/Send" element = {<SendPage/>} />
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



