import React, { Component } from 'react'
import MetadataModal from "./MetadataModal";
import axios from 'axios';

class Assets extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalOpen: undefined, //this will controll whether the modal should be open or closed
            videoInfo: null  //will have the details of the video 
        }
    }
    handlePick = () => { //extract the stream url from the api
        console.log("searching");
        const id=this.props.assets["@id"];
        const apiUrl = `https://vimond-rest-api.ha.expo-first.vimondtv.com/api/web/asset/${id}/play?protocol=mp4`;
        axios.get(apiUrl)
            .then((response) => {
                console.log(response.data);
                this.setState({ videoInfo: response.data });
            })
            .catch(function (error) {
                console.log("error in fetching " + error);
                alert(`the server responded with following error:"${error}".try another asset`);
                
            });

        this.setState({ modalOpen: true });

    }
    clearSelectedOption=()=>{
        this.setState(()=>({
            modalOpen:undefined
        }));
    }

    render() {
        let image;
        if(this.props.assets.imageUrl){
       image=(
    <img height="300" width="300" src={this.props.assets.imageUrl} />
           );
        }else{
               image=(<p>No Image Available for this Asset</p>);
        }
        return (
            <div className="asset">
                {this.state.videoInfo!=null && <MetadataModal modalOpen={this.state.modalOpen} metadataDetails={this.props.assets} videoInfo={this.state.videoInfo} clearSelectedOption={this.clearSelectedOption} />}
                <div className="asset-text">
                {image}
                <br />
              Category ID:  {this.props.assets["@categoryId"]} <br />
              Asset ID:  {this.props.assets["@id"]} <br />
              Title:  {this.props.assets.title} <br />
              Description :{this.props.assets.description} <br />
              Create Time :{this.props.assets.createTime} <br />
              
              <br />
                </div>
                   
                <button className="button" onClick={this.handlePick}>view metadata</button>  <br />
                
            </div>
        )
    }
}


/* <button onClick={(e) => {
    this.props.assets.metadata.map((item,i)=>(
         
              <AssetMetadata key={i} data={item} />
     ));
 }}>View metadata</button> */
/* 
const Assets = (props) => (
    <div className="col-md-3">
    
       {props.assets.imageUrl && <img height="200" width="200" src={props.assets.imageUrl} />}   <br/>
          Title:  {props.assets.title} <br/>
          Category Title:  {props.assets.categoryTitle} <br/>
          Description :{props.assets.description} <br/>
          id:{props.assets["@id"]} <br/>
          uri:{props.assets.category["@uri"]} 
           <br/>

        <button onClick={(e) => {
            props.assets.metadata.map((item,i)=>(
                
                     <AssetMetadata key={i} data={item} />
            ));
        }}>View metadata</button>
        

        <hr />
    </div>
); */

export default Assets;