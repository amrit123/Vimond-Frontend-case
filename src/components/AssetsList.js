import React, { Component } from 'react'
import axios from 'axios';
import Assets from "./Assets";

export default class AssetsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            assetsList: null

        }
    }

    componentWillMount() {
        //extracting the assets from the api
        const apiUrl = "https://vimond-rest-api.ha.expo-first.vimondtv.com/api/web/search/categories/root/assets";
        axios.get(apiUrl)
            .then((response) => {
                console.log(response.data.assets.asset);
                this.setState({ assetsList: response.data.assets.asset });
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    topFunction = () => { //function to scroll to the top from the bottom
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;

    }

    render() {
        let assetsItem
        if (this.state.assetsList != null) {
          assetsItem = this.state.assetsList.map((item, i) => ( //for each assets map it to a asset component
                <Assets key={i} assets={item} />
            ));
        }

        return (
            <div className="container">
                <div className="widget">
                    <h1 className="widget-header">Available Assets List:</h1>
                    {assetsItem}
                    <button onClick={this.topFunction} >Go to top</button>

                </div>


            </div>
        )
    }
}
