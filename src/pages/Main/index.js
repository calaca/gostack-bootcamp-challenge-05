import React, { Component } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import Container from '../../components/Container';
import { Form, SubmitButton, List } from './styles';

export default class Main extends Component {
  state = {
    newRepo: '',
    repositories: [],
    loading: false,
    error: false,
  };

  // get repos saved in localStorage
  componentDidMount() {
    const repositories = localStorage.getItem('repositories');

    if (repositories) {
      this.setState({ repositories: JSON.parse(repositories) });
    }
  }

  // save repos in localStorage
  componentDidUpdate(_, prevState) {
    const { repositories } = this.state;

    if (prevState.repositories !== repositories) {
      localStorage.setItem('repositories', JSON.stringify(repositories));
    }
  }

  // update new repository full name
  handleInputChange = e => {
    this.setState({ newRepo: e.target.value });
  };

  // validate input, get new repository info and save new repository to repositories state
  handleSubmit = async e => {
    e.preventDefault();

    this.setState({ loading: true, error: false });

    const { newRepo, repositories } = this.state;

    try {
      if (newRepo === '') {
        throw new Error('Repositório inválido.');
      }

      const repoExists = repositories.find(repo => repo.name === newRepo);

      if (repoExists) {
        throw new Error('Repositório duplicado.');
      }

      const response = await api.get(`/repos/${newRepo}`);

      const data = {
        name: response.data.full_name,
      };

      this.setState({
        repositories: [...repositories, data],
        newRepo: '',
        loading: false,
      });
    } catch (err) {
      this.setState({
        error: err.response.status
          ? 'Repositório não encontrado.'
          : err.message,
      });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { newRepo, repositories, loading, error } = this.state;

    return (
      <Container>
        <h1>
          <FaGithubAlt /> Repositórios
        </h1>
        <Form onSubmit={this.handleSubmit} error={error ? 1 : 0}>
          <div className="content">
            <input
              type="text"
              placeholder="Adicionar repositório"
              value={newRepo}
              onChange={this.handleInputChange}
            />
            {error && <small className="error">{error}</small>}
          </div>

          <SubmitButton loading={loading ? 1 : 0}>
            {loading ? (
              <FaSpinner color="#fff" size={14} />
            ) : (
              <FaPlus color="#fff" size={14} />
            )}
          </SubmitButton>
        </Form>

        <List>
          {repositories.map(repository => (
            <li key={repository.name}>
              <span>{repository.name}</span>
              <Link to={`/repository/${encodeURIComponent(repository.name)}`}>
                Detalhes
              </Link>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}
