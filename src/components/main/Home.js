/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import React from 'react';
import { Container, Box } from './HomeStyles';

// eslint-disable-next-line react/function-component-definition
// eslint-disable-next-line react/prop-types
export default function Home({ boxData }) {
  return (
    <div>
      
      <Container>
        {boxData.map((box) => (
          <Box key={box.id} bgColor={box.bgColor}>
            <span>Hello</span>
          </Box>
        ))}
      </Container>
    </div>
  );
}
