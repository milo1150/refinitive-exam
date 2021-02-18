import React, { FunctionComponent, useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Input } from 'antd';
import styled from 'styled-components';

const TableBox = styled.div`
  display: flex;
  padding: 20px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const InputBox = styled.div`
  width: 50%;
  padding-bottom: 10px;
`;

interface CategoriesData {
  key: number;
  categories: string;
}

const ExampleTable: FunctionComponent = () => {
  const [data, setData] = useState<Array<CategoriesData>>([]);
  const [subData, setSubData] = useState<Array<CategoriesData>>([]);

  // Onload page
  useEffect(() => {
    const url: string = 'https://api.publicapis.org/categories';
    const arr: Array<CategoriesData> = [];
    axios.get(url).then((res) => {
      const data: string[] = res.data;
      for (let i = 0; i < data.length; i++) {
        arr.push({
          key: i + 1,
          categories: data[i],
        });
      }
      setData(arr);
      setSubData(arr);
    });
  }, []);

  // Function
  function filter(event: { target: HTMLInputElement }): void {
    const input: string = event.target.value;
    const data2: Array<CategoriesData> = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].categories.includes(input)) data2.push(data[i]);
    }
    return setSubData(data2);
  }

  // Table config
  const columns = [
    {
      title: 'Categories',
      dataIndex: 'categories',
    },
  ];

  return (
    <TableBox>
      <InputBox>
        <Input placeholder="Search" onChange={(e) => filter(e)} />
      </InputBox>
      <Table
        style={{ width: '50%' }}
        columns={columns}
        dataSource={subData}
        pagination={{
          defaultPageSize: 12,
        }}
      />
    </TableBox>
  );
};

export default ExampleTable;
