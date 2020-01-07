import React, { useState } from 'react'
import uniq from 'lodash/uniq'
import { random } from '../../utils/random'
import { useFetchPokemon } from './hooks/hooks';
import { pokemonSelector } from './hooks/selectors'
import { Row, Col } from '../../components/Grid';
import Countdown from '../../components/Countdown';

const Pokedex = () => {
  const [number, setNumber] = useState(1);
  const [show, setShow] = useState(false);
  const [endDate, setDate] = useState(new Date());
  const [list, setList] = useState([1]); 
  const [{ state, setPokemonNumber }] = useFetchPokemon();
  const { data, loading, error } = pokemonSelector(state, number)

  const handleRandom = () => {
    const num = random(1, 251);
    setNumber(num)
    setShow(false)
    if(list.filter(item => item === num).length === 0) {
      setList(uniq([ ...list, num]))
      setPokemonNumber(num)
    }
    handleTime()
  }

  const handleTime = () => {
    const endDate = new Date();
    endDate.setSeconds(endDate.getSeconds() + 31);
    setDate(endDate)
  }

  const handlePokemon = (num) => {
    setNumber(num)
  }
  return (
    <div>
      <h1>Pokedex</h1>
      {!loading ? <Countdown endDate={endDate} onRandom={() => handleRandom()} onTimeup={() => setShow(true)} /> : null}
      <Row>
        <Col>
          {error && <div>{error}</div>}
          {loading ? (
            <p align="center">Loading ...</p>
          ) : (
            <div>
              {data.id ? (
                <div align="center">
                  <img alt={data.name} src={`https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/${data.name}.png`} />
                  {show ? (
                    <div>
                      <b>#{data.id}</b>
                      <br />
                      <b>{data.name}</b>
                    </div>
                  ) : null}
                </div>
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
