import { Typography, Button } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import React from 'react';
import styled from 'styled-components';

const CustomCardHeader = styled(CardHeader)`
  background-color: bisque;
`;

const CustomButton = styled(Button)`
  background-color: green;
`;

export const StyledComponentsExample: React.FunctionComponent = () => (
  <Card>
    <CustomCardHeader title='Styled Component Example' />
    <CardContent>
      <Typography>
        This is an example of styled component.
      </Typography>
      <CustomButton>Custom button</CustomButton>
    </CardContent>
  </Card>
);
