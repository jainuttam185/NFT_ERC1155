"use client";
import styles from "./page.module.css";
import React, { Component } from "react";
const ethers = require("ethers");
import nft from "../frontend/app/artifacts/contracts/nft.sol/nft.json";
import Image from "next/image";
import spidermanImage from './spiderman.jpeg';


class CampaignIndex extends Component {
  state = {
  token: 2, outputValue: "", contract:"", Provider:"",ipfsaddress:"ipfs://bafkreidblxpobb5frd57djj43mavu2ixtbyrofqq3ieflpwavaoqq524yq" ,toaddress:"0xf261F307159B06BeAAB840fe4281d456F5156A50", contractAddress: "0x96aE869d6b5E45eD78609747775b835947491FDe"
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
    const mint = await this.state.contract.mint(this.state.toaddress, this.state.ipfsaddress);
    await mint.wait();
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
        <div className={styles.header}><h2 className={styles.header2}>UTTAM MINT NFT</h2></div>
        <div className={styles.top}>
          <div className={styles.box}>
            <div className={styles.token1}>SpiderMan NFT</div>
                 <div className={styles.imageContainer}><Image src={spidermanImage} alt="Spiderman" className={styles.image}/></div>
                <button className={styles.button} onClick={this.onSubmit}>MINT</button>
              </div>
        </div>
      </div>
    );
  }
}

export default CampaignIndex;



