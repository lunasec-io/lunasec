import React from 'react';
import { Button, ButtonGroup, Spinner } from 'react-bootstrap';

import api from '../../../api';

interface TagGroupProps<O extends string> {
  options: Array<O>;
  selectedOption: O | null;
  setSelectedOption: (option: O | null) => void;
}

export const TagGroup = <O extends string>({ options, selectedOption, setSelectedOption }: TagGroupProps<O>) => {
  const { data, isLoading } = api.useGetAllCvssAdjustments();

  if (isLoading) {
    return <Spinner animation="border" />;
  }
  const onOptionChanged = (option: O) => {
    // If we click an already selected option, unset it
    if (selectedOption === option) {
      return setSelectedOption(null);
    }
    setSelectedOption(option);
  };

  return (
    <ButtonGroup>
      {options.map((option, value) => {
        return (
          <Button
            key={option}
            variant={selectedOption === option ? 'primary' : 'outline-secondary'}
            name={option}
            value={value}
            id={option}
            onClick={(_e) => onOptionChanged(option)}
          >
            <span className="text-capitalize">{option}</span>
          </Button>
        );
      })}
    </ButtonGroup>
  );
};
