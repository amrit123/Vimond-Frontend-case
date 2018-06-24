import React, { Component } from 'react'
import Modal from "react-modal";


class MetadataModal extends Component {
  constructor(props) {
    super(props);
    let title, descriptionShort, genre, tags;
    if (props.metadataDetails.metadata.title !== undefined) {
      title = props.metadataDetails.metadata.title["$"];
    }
    else {
      title = "Title not available";
    }
    if (props.metadataDetails.metadata["description-short"] !== undefined) {
      descriptionShort = props.metadataDetails.metadata["description-short"]["$"];
    }
    else {
      descriptionShort = "Description not available";
    }
    if (props.metadataDetails.metadata.genre !== undefined) {
      genre = props.metadataDetails.metadata.genre["$"];
    }
    else {
      genre = "Genre not Available";
    }
    if (props.metadataDetails.metadata.tags !== undefined) {
      tags = props.metadataDetails.metadata.tags["$"];
    }
    else {
      tags = "Tags not Available";
    }
    this.state = {
      edit: false,
      title: title,
      descriptionShort: descriptionShort,
      genre: genre,
      tags: tags
    }
  }

  onChangeTitle = (e) => {
    this.setState({ title: e.target.value });

  }
  onChangeDescription = (e) => {
    this.setState({ descriptionShort: e.target.value });

  }
  onChangeGenre = (e) => {
    this.setState({ genre: e.target.value });

  }
  onChangeTags = (e) => {
    this.setState({ tags: e.target.value });

  }

  onSubmit = (e) => {
    e.preventDefault();
    this.setState({ edit: false });
  }

  changeEditStatus = () => {
    this.setState({ edit: true });
  }
  

  render() {
    let metadataDisplay;  //checking if the metadata is in edit mode or read mode
    if (this.state.edit) {
      metadataDisplay = (
        <div>
        <h2>Edit Metadata Details</h2>
          <form onSubmit={this.onSubmit}>
             {this.props.metadataDetails.metadata.title && <p> Title: <input size="35" type="text" name="title" onChange={this.onChangeTitle} value={this.state.title} /></p> } 
            {this.props.metadataDetails.metadata["description-short"] && <p> Description short:  <input type="text" size="35" name="descriptionShort" onChange={this.onChangeDescription} value={this.state.descriptionShort} /></p> } 
            {this.props.metadataDetails.metadata.genre && <p> Genre:  <input type="text" size="35" name="genre" onChange={this.onChangeGenre} value={this.state.genre} /></p> } 
            {this.props.metadataDetails.metadata.tags && <p>Tags:  <input type="text" size="35" name="tags" onChange={this.onChangeTags} value={this.state.tags} /> </p> }
            <br /> <br />
            <button type="submit" name="button1">submit</button> 
          </form>
        </div>
      );

    }
    else {
      metadataDisplay = (
        <div>
        <h2>Metadata Details</h2>
          <p> <b>Asset Id</b>:{this.props.videoInfo.playback["@assetId"]} </p>

          {this.props.metadataDetails.metadata.title && <p><b> Title</b>:{this.state.title} </p>}
          {this.props.metadataDetails.metadata["description-short"] && <p> <b>Description short</b>:{this.state.descriptionShort} </p>}


          {this.props.metadataDetails.metadata["parental-guidance"] && <p><b>Parental Guidance</b>:{this.props.metadataDetails.metadata["parental-guidance"]["$"]} </p>}
          {this.props.metadataDetails.metadata["production-year"] && <p> <b>Production year</b>:{this.props.metadataDetails.metadata["production-year"]["$"]} </p>}



          {this.props.metadataDetails.metadata.episode && <p> <b>Episode</b>:{this.props.metadataDetails.metadata.episode["$"]} </p>}

          {this.props.metadataDetails.metadata.genre && <p><b> Genre</b>:{this.state.genre} </p>}
          {this.props.metadataDetails.metadata.hd && <p> <b>Quality</b>:{this.props.metadataDetails.metadata.hd["$"]} </p>}
          {this.props.metadataDetails.metadata.tags && <p> <b>Tags</b>:{this.state.tags} </p>}
          <br />
          <button onClick={this.changeEditStatus}>Edit Metadata</button>
        </div>


      );

    }
// checking if the video stream url is available or not
    let video;
    if (this.props.videoInfo.playback.items === "") {
      video = (
        <p> No Video Playback Available </p>
      );
    }
    else if (this.props.videoInfo.playback.items.item.length > 0) {
      video = (
        <video controls width="320" height="240" src={this.props.videoInfo.playback.items.item[0].url}> video source</video>
      );
    }
    else {
      video = (
        <video controls width="320" height="240" src={this.props.videoInfo.playback.items.item.url}> video source</video>
      );
    }
    return (
      <div>
        <Modal
          isOpen={!!this.props.modalOpen}
          onRequestClose={this.props.clearSelectedOption}
          ariaHideApp={false}
          contentLabel="Selected Asset"
          className="modal"
          closeTimeoutMS={200} >

          <h2 className="modal__title">Metadata Details</h2>
          <div className="modal__body">
            <h2>Available Video Stream</h2>
            {video}        
            {metadataDisplay}
            <hr />
            <button className="button-modal" onClick={this.props.clearSelectedOption}>Close</button>
          </div>
        </Modal>
      </div>
    )
  }
}
export default MetadataModal;