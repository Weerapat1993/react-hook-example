import React, { useState } from 'react'
import uniq from 'lodash/uniq'
import { random } from '../../utils/random'
import { useFetchPokemon } from './hooks/hooks';
import { pokemonSelector } from './hooks/selectors'
import { Row, Col } from '../../components/Grid';
import { Button } from '../../components/Button';

const Pokedex = () => {
  const [number, setNumber] = useState(1);
  const [list, setList] = useState([1]); 
  const [{ state, setPokemonNumber }] = useFetchPokemon();
  const { data, loading, error } = pokemonSelector(state, number)

  const handleRandom = () => {
    const num = random(1, 251);
    setNumber(num)
    if(list.filter(item => item === num).length === 0) {
      setList(uniq([ ...list, num]))
      setPokemonNumber(num)
    }
  }

  const handlePokemon = (num) => {
    setNumber(num)
  }
  return (
    <div>
      <h1>Pokedex</h1>
      <p align="center">
        <Button color="#00AA00" onClick={() => handleRandom()}>
          Random
        </Button>
      </p>
      <Row>
        <Col>
          {error && <div>{error}</div>}
          {loading ? (
            <p align="center">Loading ...</p>
          ) : (
            <div>
              {data.id ? (
                <p align="center">
                  <img alt={data.name} src={`https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/${data.name}.png`} />
                  <br />
                  <b>#{data.id}</b>
                  <br />
                  <b>{data.name}</b>
                </p>
              ) : null}
              {/* <pre>{JSON.stringify(data, null, '  ')}</pre> */}
            </div>
          )}
        </Col>
        <Col>
          <ul>
            {list.sort((a, b) => a - b).map((num) => {
              return (
                // eslint-disable-next-line jsx-a11y/anchor-is-valid
                <li key={num}><a href="#" onClick={() => handlePokemon(num)}>{num}</a></li>
              )
            })}
          </ul>
        </Col>
      </Row>
    </div>
  )
}

export default Pokedex
