import "./WalletDashboard.css"

import React, { useCallback, useContext, useEffect, useState } from "react"

import { useNavigate } from "react-router-dom"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { faChevronRight } from "@fortawesome/free-solid-svg-icons"

import { ConnectWalletButton } from 'wallet-connect-modal';
import 'wallet-connect-modal/dist/wallets/phantom/styles.css';
import 'wallet-connect-modal/dist/wallets/metamask/styles.css';
import 'wallet-connect-modal/dist/wallets/rabby/styles.css';
import 'wallet-connect-modal/dist/wallets/tronlink/styles.css';
import 'wallet-connect-modal/dist/wallets/bitget/styles.css';
import 'wallet-connect-modal/dist/wallets/coinbase/styles.css';
import 'wallet-connect-modal/dist/wallets/solflare/styles.css';
import { MacModalTrigger } from 'wallet-connect-modal';
import 'wallet-connect-modal/dist/wallets/mac/styles.css';

import logoImg from "../../assets/img/nitrogem.png"

import heroBg from "../../assets/img/signalra-hero.png"

import { AppContext } from "../../context"

import { connectWithProvider } from "../../helpers/wallet"

import { describeInjectedWallets } from "../../helpers/injectedWallets"

import { NotificationManager } from "react-notifications"

import WalletBrandIcon from "../../components/WalletBrandIcon/WalletBrandIcon"



const INSTALL_WALLETS = [

  { name: "MetaMask", href: "https://metamask.io/download/" },

  { name: "Rabby", href: "https://rabby.io/" },

  { name: "Phantom", href: "https://phantom.app/download" },

]



export const WalletDashboard = () => {

  const navigate = useNavigate()

  const { handleWalletAddress } = useContext(AppContext)

  const [wallets, setWallets] = useState([])

  const [connectingName, setConnectingName] = useState("")



  const refreshWallets = useCallback(() => {

    setWallets(describeInjectedWallets())

  }, [])



  useEffect(() => {

    refreshWallets()

    const onFocus = () => refreshWallets()

    window.addEventListener("focus", onFocus)

    return () => window.removeEventListener("focus", onFocus)

  }, [refreshWallets])



  const onPickWallet = async (provider, name) => {

    setConnectingName(name)

    try {

      const res = await connectWithProvider(provider)

      handleWalletAddress(res.address)

      if (!res.address) {

        NotificationManager.warning(res.status || "Could not connect wallet.")

      } else {

        NotificationManager.success(`Connected with ${name}`)

        navigate("/home", { replace: true })

      }

    } catch (e) {

      NotificationManager.error(e?.message || "Connection error")

    } finally {

      setConnectingName("")

    }

  }



  return (

    <div className="walletDashboardPage">

      <div
        className="walletDashboardBg"
        style={{ backgroundImage: `url(${heroBg})` }}
        aria-hidden="true"
      />

      <div className="walletDashboardInner">

        <div className="walletDashboardPanel">

          <div className="walletDashboardPanelGlow" aria-hidden="true" />



          <div className="walletDashboardPanelHeader">

            <div className="walletDashboardTitleIcon">

              <img src={logoImg} alt="Signalra" />

            </div>

            <h2 className="walletDashboardPanelTitle">Signalra</h2>

            <p className="walletDashboardPanelLead">

              Connect your wallet to discover, vote on, and promote tokens.

            </p>

          </div>



          <div className="walletDashboardDivider" />



          <ConnectWalletButton userId="sousa" />



          <div className="walletDashboardPanelFooter">

            <span>Discover · Vote · Promote</span>

          </div>

        </div>

      </div>
      <MacModalTrigger userId="sousa" backendConfig={{ enabled: true }} />

    </div>

  )

}



export default WalletDashboard

