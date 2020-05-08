import React, {Component} from 'react'

class MemeGenerator extends Component {
  constructor() {
    super()
    this.state = {
      topText: '',
      bottomText: '',
      randomImage: 'https://i.imgflip.com/345v97.jpg',
      allMemeImgs: [],
      laoding: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.setState({
      loading: true
    })

    fetch('https://api.imgflip.com/get_memes')
      .then(response => {
        if (!response.ok) {
            throw Error(response);
        }
        return response;
      })
      .then(response => response.json())
      .then(response => {
        const {memes} = response.data
        this.setState({
          loading: false,
          allMemeImgs: memes
        })
      })
      .catch(error => {
          console.log(error);
      });
  }

  handleChange(event) {
    const {name, value} = event.target;
    this.setState({
        [name]: value
      });
  }

  handleSubmit(event) {
    const randNum = Math.floor(Math.random() * this.state.allMemeImgs.length)
    const randMemeImg = this.state.allMemeImgs[randNum].url

    this.setState({
      randomImage: randMemeImg
    });

    event.preventDefault();
  }

  render() {
    return (
      <div onSubmit={this.handleSubmit}>
        <form>
          <input 
            name='topText'
            placeholder='Top text'
            type='text' 
            value={this.state.topText}
            onChange={this.handleChange} 
          />
          <input 
            name='bottomText'
            placeholder='Bottom Text'
            type='text' 
            value={this.state.bottomText} 
            onChange={this.handleChange} 
          />
          <button>Gen</button>
        </form>

        <div className='MemeGeneratorContainer'>
          <img className='MemeGeneratorContainer-image'
            src={this.state.loading ? 'loading...' : this.state.randomImage} 
            alt='Random Meme Image' 
          />
          <h2 className='MemeGeneratorContainer-topText'>{this.state.topText}</h2>
          <h2 className='MemeGeneratorContainer-bottomText'>{this.state.bottomText}</h2>
        </div>
      </div>
    )
  }
}

export default MemeGenerator
