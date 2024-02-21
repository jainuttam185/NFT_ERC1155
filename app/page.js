"use client";
import styles from "./page.module.css";
import React, { Component } from "react";
const ethers = require("ethers");
import nft from "../frontend/app/artifacts/contracts/nft.sol/nft.json";
import Image from "next/image";
import spidermanImage from './spiderman.jpeg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class CampaignIndex extends Component {
  state = {
  token: 0, outputValue: "", contract:"", Provider:"",ipfsaddress:"ipfs://bafkreidblxpobb5frd57djj43mavu2ixtbyrofqq3ieflpwavaoqq524yq" ,toaddress:"0xf261F307159B06BeAAB840fe4281d456F5156A50", contractAddress: "0xA7bec887322DF05a20eBCe37B82d0a3ab4Db9706",loading:false
};

  async componentDidMount() {

    const provider = new ethers.BrowserProvider(window.ethereum);
      if (provider) {
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        //setAccount(address);
        // const contractAddress = "0xcC680Ce60E640F8BEF955AC5fDe00F4700DC97D3";
        console.log(provider);
        const contract = new ethers.Contract(
          this.state.contractAddress,
          nft.abi,
          signer
        );
        
        //this.setState.contract=contract;
        this.setState({
          contract: contract
        });
        this.setState({
          Provider:signer
        });
        // this.setState.Token1Contract=Token1Contract;
        // this.setState.Token2Contract=Token2Contract;
        // this.setState.Provider=signer;
      } else {
        alert("Metamask is not installed.");
      }


    // this.setState({
    //   reserveIn: await contract.reserve0()
    // });
    // this.setState({
    //   reserveOut: await contract.reserve1()
    // });
    // this.setState.reserveOut = await contract.reserve1();
    // console.log("line1", parseInt(this.state.reserveIn));
    // console.log("line2", parseInt(this.state.reserveOut));
  }
  onSubmit = async (event) => {
    console.log(this.state.contract)
    event.preventDefault();
    const mint = await this.state.contract.mint(this.state.ipfsaddress,{value:ethers.parseEther("0.0001")});
    await mint.wait();
  };

  onSubmitBurn = async (event) => {
    console.log(this.state.contract)
    event.preventDefault();
    const burn = await this.state.contract.burn(this.state.token);
    await burn.wait();
  };



  /* static async getIntialProps(){

      onSubmit=async (event)=>{
           event.preventDefault();

           const accounts=await web3.eth.getAccounts();
           await factory.methods.swap(this.state.token)
           .send({
               from : accounts[0]
           });
      };
   }*/
  render() {
    return (
      <div className={styles.full}>
        <ToastContainer />
        <div className={styles.header}><h2 className={styles.header2}>UTTAM MINT NFT</h2></div>
        <div className={styles.top}>
          <div className={styles.box}>
            <div className={styles.token1}>SpiderMan NFT</div>
                 <div className={styles.imageContainer}><Image src={spidermanImage} alt="Spiderman" className={styles.image}/></div>
                <button className={styles.button} onClick={this.onSubmit}>MINT</button>
                <div className={styles.token1}>Enter the Token Id you want to Burn</div>
                <div className={styles.burn}>
                <input
              type="number"
              className={styles.input1}
              placeholder="0"
              value={this.state.token}
              onChange={event => this.setState({
                token: event.target.value
              })}
            />
              <div>
                <button className={styles.buttonBurn} onClick={this.onSubmitBurn}>BURN</button>
              </div>
              </div>  
              </div>
        </div>
      </div>
    );
  }
}

export default CampaignIndex;



