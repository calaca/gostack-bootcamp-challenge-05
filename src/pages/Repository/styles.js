import styled from 'styled-components';

export const Tabs = styled.div`
  margin-top: 30px;
  padding-top: 30px;
  display: flex;
  justify-content: center;
`;

export const Button = styled.button.attrs(props => ({
  disabled: props.disabled,
}))`
  border: 1px solid #7159c1;
  border-radius: 4px;
  margin: 0 5px;
  background: ${props => (props.active ? '#7159c1' : 'transparent')};
  padding: 5px 10px;
  color: ${props => (props.active ? '#fff' : '#7159c1')};
  font-size: 14px;
  opacity: 1;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  transition: all 0.4s ease-in-out;

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
    color: #ddd;
    border-color: #ddd;
  }

  &:hover {
    opacity: 0.6;
  }
`;

export const Owner = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;

  a {
    color: #7159c1;
    text-decoration: none;
    font-size: 16px;
    display: flex;
    align-items: center;
    align-self: flex-start;

    svg {
      margin-right: 4px;
      transition: all 0.4s ease-in-out;
    }

    &:hover {
      svg {
        margin-left: -5px;
      }
    }
  }

  img {
    width: 120px;
    border-radius: 50%;
    margin-top: 20px;
  }

  h1 {
    font-size: 24px;
    margin-top: 10px;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
    line-height: 1.4;
    text-align: center;
    max-width: 400px;
  }
`;

export const IssueList = styled.div`
  padding-top: 30px;
  margin-top: 30px;
  list-style: none;

  li {
    display: flex;
    padding: 15px 10px;
    border: 1px solid #eee;
    border-radius: 4px;

    & + li {
      margin-top: 10px;
    }

    img {
      height: 36px;
      width: 36px;
      border-radius: 50%;
      border: 2px solid #eee;
    }

    div {
      flex: 1;
      margin-left: 15px;

      strong {
        font-size: 16px;

        a {
          text-decoration: none;
          color: #333;
          transition: all 0.4s ease-in-out;

          &:hover {
            color: #7159c1;
          }
        }

        span {
          background: #eee;
          color: #333;
          font-size: 12px;
          border-radius: 2px;
          font-weight: 600;
          height: 20px;
          padding: 3px 4px;
          margin-left: 10px;
          display: inline-block;
        }
      }

      p {
        margin-top: 5px;
        font-size: 12px;
        color: #999;
      }
    }
  }
`;

export const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-top: 30px;

  .current {
    width: 100%;
    text-align: center;
    margin-bottom: 10px;
    font-size: 12px;
    color: #666;
  }
`;
