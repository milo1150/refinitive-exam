import React, { FunctionComponent, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Input, Select } from 'antd';
const { Option } = Select;

const Box = styled.div`
  padding: 30px;
  display: flex;
  width: 100%;
  height: 50vh;
`;

const Col1 = styled.div`
  box-sizing: border-box;
  min-width: 200px;
  border: 1px solid;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Col2 = styled.div`
  box-sizing: border-box;
  width: 100vw;
  min-width: 100px;
  border: 1px solid;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Col3 = styled.div`
  box-sizing: border-box;
  min-width: 300px;
  border: 1px solid;
  display: flex;
  justify-content: center;
  align-items: center;
`;

type choices = 'isPrime' | 'isFibonacci';

const ThreeColumns: FunctionComponent = () => {
  const [sum, setSum] = useState<boolean>(true);
  const [input, setInput] = useState<string>('');
  const [select, setSelect] = useState<choices>('isPrime');

  //Function
  const validateInput = (e: { target: HTMLInputElement }): void => {
    const reg: RegExp = /[^0-9]/g;
    let value: string = e.target.value;
    if (reg.test(value) === true) setInput('1');
    else if (reg.test(value) === false) setInput(value);
  };

  const updateSelect = (value: choices) => setSelect(value);

  const isPrime = (input: number): void => {
    // console.log('isPrime:', input);
    if (input <= 1) return setSum(false);
    let prime: boolean = true;
    for (let i = 2; i < input; i++) {
      if (input % i === 0) {
        prime = false;
        break;
      }
    }
    if (prime) return setSum(true);
    else return setSum(false);
  };

  const isFibonacci = (input: number): void => {
    // console.log('isFibo:', input);
    const arr: number[] = [0, 1];
    let sum: number = 0;
    let fibo: boolean = false;
    while (sum <= input) {
      if (sum === input) {
        fibo = true;
        break;
      }
      if (sum < input) {
        sum = arr[arr.length - 2] + arr[arr.length - 1];
        arr.push(sum);
      }
      sum = arr[arr.length - 1];
    }
    console.log('isfibo:', fibo);
    if (fibo) return setSum(true);
    else return setSum(false);
  };

  //on col1 or col2 change
  useEffect(() => {
    if (input === '') return setSum(false);
    else {
      if (select === 'isPrime') return isPrime(parseInt(input));
      else if (select === 'isFibonacci') return isFibonacci(parseInt(input));
    }
  }, [input, select]);

  return (
    <Box>
      <Col1>
        <Input
          style={{ width: '150px' }}
          onChange={(e) => validateInput(e)}
          value={input}
        />
      </Col1>
      <Col2>
        <Select
          defaultValue={select}
          style={{ minWidth: '50px' }}
          onChange={(e) => updateSelect(e)}
        >
          <Option value="isPrime">isPrime</Option>
          <Option value="isFibonacci">isFibonacci</Option>
        </Select>
      </Col2>
      <Col3>{sum ? <p>true</p> : <p>false</p>}</Col3>
    </Box>
  );
};
export default ThreeColumns;
