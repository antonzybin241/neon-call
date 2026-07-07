import "./WalletDashboard.css"

import React from "react"

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

export const WalletDashboard = () => {
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
