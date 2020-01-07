import React, { useState } from 'react'
import uniq from 'lodash/uniq'
import styled from 'styled-components'
import { random } from '../../utils/random'
import { useFetchPokemon } from './hooks/hooks';
import { pokemonSelector } from './hooks/selectors'
import { Row, Col } from '../../components/Grid';
import { Button } from '../../components/Button';
import Countdown from '../../components/Countdown';
import Canvas from '../../components/Canvas';

const Height = styled.div`
  height: ${props => props.value};
  text-align: ${props => props.align};
`

const InputColor = styled.input`
  padding: 0;
  width: 50px;
  height: 50px;
  margin: 10px;
  margin-top: 0px;
  border: 0;
  border-radius: 25px;

  &::-webkit-color-swatch {
    border: none;
    border-radius: 25px;
    padding: 0;
  }

  &::-webkit-color-swatch-wrapper {
    border: none;
    border-radius: 25px;
    padding: 0;
  }

  &:focus {
    outline: 0;
  }
`

const MaxWidth = styled.div`
  max-width: ${props => props.value};
  margin: auto;
  text-align: ${props => props.align};
`

const Pokedex = () => {
  const [color, setColor] = useState('#000000');
  const [number, setNumber] = useState(1);
  const [show, setShow] = useState(true);
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
      <h1 align="center">Pokedex</h1>
      <Row display="block">
        <Col padding="15px">
          {error && <div>{error}</div>}
          {loading ? (
            <p align="center">Loading ...</p>
          ) : (
            <div>
              {data.id ? (
                <div align="center">
                  <Height value="100px" align="center">
                    {!loading && !show ? <Countdown endDate={endDate} onTimeup={() => setShow(true)} /> : null}
                    {show ? (
                      <Button color="#00AA00" onClick={() => handleRandom()}>
                        Random
                      </Button>
                    ) : null}
                  </Height>
                  <MaxWidth value="500px" align="left">
                    <InputColor type="color" onChange={(e) => setColor(e.target.value)} value={color} />
                  </MaxWidth>
                  <Canvas width="500px" height="500px" color={color} />
                  <MaxWidth value="500px">
                    <img alt={data.name} width="100%" src={`https://img.pokemondb.net/artwork/${data.name}.jpg`} />
                  </MaxWidth>
                  {show ? (
                    <div>
                      #{data.id}
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
      </Row>
      <Height value="100px" align="center">
        {show ? (
          <Button color="#00AA00" onClick={() => handleRandom()}>
            Random
          </Button>
        ) : null}
      </Height>
      <hr />
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
    </div>
  )
}

export default Pokedex
