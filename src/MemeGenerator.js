import React from "react";

export default class MemeGenerator extends React.Component {
  constructor() {
    super();
    this.state = {
      top: "",
      bottom: "",
      imgSrc: "",
      allMemeImgs: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.MemeGen = this.MemeGen.bind(this);
  }

  componentDidMount() {
    fetch("https://api.imgflip.com/get_memes")
      .then(response => response.json())
      .then(response => {
        const { memes } = response.data;
        console.log(memes[0]);
        this.setState({
          allMemeImgs: memes
        });
      });
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

  MemeGen(event) {
    event.preventDefault();
    let indexNum = Math.floor(
      this.getRandomArbitrary(0, this.state.allMemeImgs.length - 1)
    );
    const newImgSrc = this.state.allMemeImgs[indexNum].url;
    this.setState({
      imgSrc: newImgSrc
    });
  }

  render() {
    return (
      <div>
        <form className="meme-form" onSubmit={this.MemeGen}>
          <input
            type="text"
            name="top"
            placeholder="Top Text"
            value={this.state.top}
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="bottom"
            placeholder="Bottom Text"
            value={this.state.bottom}
            onChange={this.handleChange}
          />
          <button>Gen</button>
        </form>
        <div className="meme">
          <h2 className="top">{this.state.top}</h2>
          <img src={this.state.imgSrc} alt="" />
          <h2 className="bottom">{this.state.bottom}</h2>
        </div>
      </div>
    );
  }
}
