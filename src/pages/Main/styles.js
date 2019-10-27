import styled, { keyframes, css } from 'styled-components';

export const Form = styled.form`
  margin-top: 30px;
  display: flex;
  flex-direction: row;

  .content {
    flex: 1;
  }

  input {
    width: 100%;
    border: 1px solid #eee;
    border-radius: 4px;
    padding: 10px 15px;
    font-size: 16px;
    border-color: ${props => (props.error ? '#e74c3c' : '#eee')};
  }

  .error {
    width: 100%;
    margin-top: 10px;
    font-size: 12px;
    padding: 10px;
    color: #c0392b;
    background: #e74c3c47;
    border-radius: 4px;
    display: inline-block;
    text-align: center;
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const SubmitButton = styled.button.attrs(props => ({
  type: 'submit',
  disabled: props.loading,
}))`
  background: #7159c1;
  border: 0;
  padding: 0 15px;
  margin-left: 10px;
  border-radius: 4px;
  height: 40px;

  display: flex;
  justify-content: center;
  align-items: center;

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }

  ${props =>
    props.loading &&
    css`
      svg {
        animation: ${rotate} 2s linear infinite;
      }
    `}
`;

export const List = styled.ul`
  list-style: none;
  margin-top: 30px;

  li {
    padding: 15px 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    & + li {
      border-top: 1px solid #eee;
    }

    a {
      color: #7159c1;
      text-decoration: none;
    }
  }
`;
