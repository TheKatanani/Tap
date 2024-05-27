import * as React from 'react';
import PropTypes from 'prop-types';
import { Select as BaseSelect } from '@mui/base/Select';
import UnfoldMoreRoundedIcon from '@mui/icons-material/UnfoldMoreRounded';
import { Listbox, Option, Popper, StyledButton } from './styled';

const Select = React.forwardRef(function Select(props, ref) {
  const slots = {
    root: CustomButton,
    listbox: Listbox,
    popper: Popper,
    ...props.slots,
  };

  return <BaseSelect {...props} ref={ref} slots={slots} />;
});

export default function UnstyledSelectBasic({ options, loading, error,handleSelectChange,category ,defultValue }) {
  if (loading) return <p>Loading...</p>;
  if (error) return <h1>{error.message}</h1>;


  return (
    <Select 
    value={category}
    onChange={handleSelectChange}
    >
         <Option value="" disabled>
        <em>{defultValue}</em>
      </Option>
      {options.map((option) => (
        <Option value={option?.type} key={option?.id}>
          {option?.type}
        </Option>
      ))}
    </Select>
  );
}

const CustomButton = React.forwardRef(function CustomButton(props, ref) {
  const { ownerState, ...other } = props;
  return (
    <StyledButton type="button" {...other} ref={ref}>
      {other.children}
      <UnfoldMoreRoundedIcon />
    </StyledButton>
  );
});

CustomButton.propTypes = {
  children: PropTypes.node,
  ownerState: PropTypes.object.isRequired,
};
