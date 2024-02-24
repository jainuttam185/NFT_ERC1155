"use client";
import Image from "next/image";
import { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import nft from "../frontend/app/artifacts/contracts/nft.sol/nft.json";
import styles from "./page.module.css";
import spidermanImage from "./spiderman.jpeg";
const ethers = require("ethers");

class CampaignIndex extends Component {
  state = {
    token: 0,
    outputValue: "",
    contract: "",
    Provider: "",
    ipfsaddress:
      "ipfs://bafkreidblxpobb5frd57djj43mavu2ixtbyrofqq3ieflpwavaoqq524yq",
    toaddress: "0xf261F307159B06BeAAB840fe4281d456F5156A50",
    contractAddress: "0xf8d1f53b958d76Aa1297389166BeC71124fcaC83",
    loading: false,
    isloading: false,
    burnloading: false,
    mintPrice: 0,
    burnPrice: 0,
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
        contract: contract,
      });
      this.setState({
        Provider: signer,
      });
      this.setState({
        mintPrice: await contract.Price(),
      });
      this.setState({
        burnPrice: await contract.BuurnPrice(),
      });
      // this.setState.Token1Contract=Token1Contract;
      // this.setState.Token2Contract=Token2Contract;
      // this.setState.Provider=signer;
      console.log("line1", parseInt(this.state.mintPrice));
    } else {
      alert("Metamask is not installed.");
    }

    // this.setState({
    //   reserveOut: await contract.reserve1()
    // });
    // this.setState.reserveOut = await contract.reserve1();
    // console.log("line1", parseInt(this.state.reserveIn));
    // console.log("line2", parseInt(this.state.reserveOut));
  }
  onSubmit = async (event) => {
    try {
      console.log(this.state.contract);
      event.preventDefault();
      this.setState({ loading: true });
      this.setState({ isloading: true });
      const price = await this.state.contract.Price();
      const mint = await this.state.contract.mint(this.state.ipfsaddress, {
        value: price,
      });
      this.state.loading && toast("Please wait for few seconds");
      //toast(mint ,{pending:"Please wait for few seconds",success:"Mint Successfull",error:"Sorry,Mint failed"});
      await mint.wait();
      // this.setState({ loading: false });
      toast("Mint Successfull");
      this.setState({
        mintPrice: await this.state.contract.Price()
      });
      this.setState({
        burnPrice: await this.state.contract.BuurnPrice()
      });
    } catch (error) {
      const errorMessage = error.message.split("(")[0];
      const fullMessage = errorMessage[0].toUpperCase() + errorMessage.slice(1);
      toast(fullMessage);
    } finally {
      this.setState({ loading: false });
      this.setState({ isloading: false });
    }
  };

  onSubmitBurn = async (event) => {
    try {
      console.log(this.state.contract);
      event.preventDefault();
      this.setState({ loading: true });
      this.setState({ burnloading: true });
      const burn = await this.state.contract.burn();
      this.state.loading && toast("Please wait for few seconds");
      await burn.wait();
      toast("Burn Successfull");
      this.setState({
        mintPrice: await this.state.contract.Price()
      });
      this.setState({
        burnPrice: await this.state.contract.BuurnPrice()
      });
    } catch (error) {
      const errorMessage = error.message.split("(")[0];
      const fullMessage = errorMessage[0].toUpperCase() + errorMessage.slice(1);
      toast(fullMessage);
    } finally {
      this.setState({ loading: false });
      this.setState({ burnloading: false });
    }
  };

  render() {
    return (
      <div className={styles.full}>
        <ToastContainer />
        <div className={styles.header}>
          <h2 className={styles.header2}>UTTAM MINT NFT</h2>
        </div>
        <div className={styles.top}>
          <div className={styles.box}>
            <div className={styles.token1}>SpiderMan NFT</div>
            <div className={styles.imageContainer}>
              <Image
                src={spidermanImage}
                alt="Spiderman"
                className={styles.image}
              />
            </div>
            <button
              disabled={this.state.isloading}
              className={styles.button}
              onClick={this.onSubmit}
            >
              {this.state.isloading ? (
                <p className={styles.spinner}></p>
              ) : (
                "Mint"
              )}
            </button>
            <div className={styles.price}>
                   <div>{this.state.mintPrice.toString()}</div>
                   <div>{this.state.burnPrice.toString()}</div> 
            </div>
                <button
                  disabled={this.state.burnloading}
                  className={styles.buttonBurn}
                  onClick={this.onSubmitBurn}
                >
                  {this.state.burnloading ? (
                    <p className={styles.spinner}></p>
                  ) : (
                    "Burn"
                  )}
                </button>
              </div>
            </div>
          </div>
    );
  }
}

export default CampaignIndex;
