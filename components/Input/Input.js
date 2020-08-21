import React from "react";
import styled from "styled-components/native";
import Proptypes from "prop-types";

const TextInput = styled.TextInput`
  background-color: white;
  margin: 0px 30px 30px 30px;
  padding: 10px 20px;
  border-radius: 15px;
`;

const Input = ({ placeholder, value, onChange, onSubmit }) => (
  <TextInput
    placeholder={placeholder}
    value={value}
    onChangeText={onChange}
    onSubmitEditing={onSubmit}
    returnKeyType={"search"}
    autoCorrect={false}
    autoCapitalize={"none"}
  />
);

Input.propTypes = {
  placeholder: Proptypes.string.isRequired,
  value: Proptypes.string.isRequired,
  onChange: Proptypes.func.isRequired,
  onSubmit: Proptypes.func.isRequired,
};

export default Input;
