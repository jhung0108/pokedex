import React from 'react'
import Relay from 'react-relay'
import classes from './ListPage.css'

class PokemonPreview extends React.Component {
  static propTypes = {
    pokemon: React.PropTypes.object,
    router: React.PropTypes.object,
  }
  render () {
    let pokemon = this.props.pokemon
    return (
      
      <div>
        <img src={pokemon.url}></img>
        Pokemon name: {pokemon.name}
      </div>
    )
  }
}

let PokemonPreviewContainer = Relay.createContainer(
  PokemonPreview,
  {
    fragments: {
      pokemon: () => Relay.QL`
        fragment on Pokemon {
          name
          id
          url
        }
      `,
    },
  }
)

class ListPage extends React.Component {
  static propTypes = {
    viewer: React.PropTypes.object,
  }
  render () {
    let pokemons = this.props.viewer.allPokemons.edges
      .map(edge => edge.node)
      .map(pokemon => <PokemonPreviewContainer key={pokemon.id} pokemon={pokemon} />)
    return (
      <div className={classes.root}>
        {pokemons}
      </div>
    )
  }
}

export default Relay.createContainer(
  ListPage, {
    fragments: {
      viewer: () => Relay.QL`
        fragment on Viewer {
          id
          allPokemons(first: 500) {
            edges {
              node {
                name
                ${PokemonPreviewContainer.getFragment('pokemon')}
              }
            }
          }
        }
      `,
    },
  }
)

