import React, { Component } from 'react'
import firebase from './firebase.js'

import './App.css'

class App extends Component {

  state = {
    currentItem: '',
    username: '',
    items: []
  }

  componentDidMount () {
    const itemsRef = firebase.database().ref('items')
    itemsRef.on('value', (snapshot) => {
      let items = snapshot.val()
      let newState = []
      for (let item in items) {
        newState.push({
          id: item,
          title: items[item].title,
          user: items[item].user
        })
      }
      this.setState({ items: newState })
    })
  }

  render() {

    let potluckItems = this.state.items.map((item) => {
      return (
        <li key={item.id}>
          <h3>{item.title}</h3>
          <p>brought by: {item.user}</p>
          <button onClick={() => this.removeItem(item.id)}>Remove Item</button>
        </li>
      )
    })

    return (
      <div className='app'>
        <header>
            <div className='wrapper'>
              <h1>Fun Food Friends</h1>
              
            </div>
        </header>
        <div className='container'>
          <section className='add-item'>
              <form onSubmit={this.handleSubmit}>
                <input
                  type="text"
                  name="username"
                  placeholder="What's your name?"
                  onChange={this.handleChange}
                  value={this.state.username} />
                <input
                  type="text"
                  name="currentItem"
                  placeholder="What are you bringing?"
                  onChange={this.handleChange}
                  value={this.state.currentItem} />
                <button>Add Item</button>
              </form>
          </section>
          <section className='display-item'>
            <div className='wrapper'>
              <ul>
                { potluckItems }
              </ul>
            </div>
          </section>
        </div>
      </div>
    )
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const itemsRef = firebase.database().ref('items')
    const item = {
      title: this.state.currentItem,
      user: this.state.username
    }
    itemsRef.push(item)
    this.setState({
      currentItem: '',
      username: ''
    })
  }

  removeItem = (itemId) => {
    const itemRef = firebase.database().ref(`/items/${itemId}`)
    itemRef.remove()
  }
}
export default App