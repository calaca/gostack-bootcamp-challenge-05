import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FaSpinner, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import api from '../../services/api';
import Container from '../../components/Container';
import Loading from '../../components/Loading';
import { Owner, IssueList, Tabs, Button, Actions } from './styles';

export default class Repository extends Component {
  state = {
    repository: {},
    issues: [],
    loading: true,
    filters: [
      {
        type: 'all',
        name: 'Todas',
      },
      {
        type: 'open',
        name: 'Abertas',
      },
      {
        type: 'closed',
        name: 'Fechadas',
      },
    ],
    currentFilter: 'all',
    currentPage: 1,
  };

  // fetches repository and its issues when component mounts
  async componentDidMount() {
    const { match } = this.props;
    const { filters } = this.state;
    const repoName = decodeURIComponent(match.params.repository);

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: filters[0].type,
          per_page: 5,
        },
      }),
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
    });
  }

  // fetches current repository's isssues
  fetchIssues = async () => {
    const { currentFilter, currentPage, repository } = this.state;

    const issues = await api.get(`/repos/${repository.full_name}/issues`, {
      params: {
        state: currentFilter,
        per_page: 5,
        page: currentPage,
      },
    });

    this.setState({ issues: issues.data, loading: false });
  };

  // update current filter/issue status and set current page back to 1
  handleFilter = async type => {
    await this.setState({ currentFilter: type, currentPage: 1, loading: true });

    this.fetchIssues();
  };

  // increment or decrement current page counter, depending on the action, then refetch issues
  handlePageChange = async action => {
    const { currentPage } = this.state;

    await this.setState({
      currentPage: action === 'next' ? currentPage + 1 : currentPage - 1,
      loading: true,
    });

    this.fetchIssues();
  };

  render() {
    const {
      repository,
      issues,
      loading,
      filters,
      currentPage,
      currentFilter,
    } = this.state;

    return (
      <Container>
        {loading ? (
          <Loading loading={loading ? 1 : 0}>
            <FaSpinner color="#7159c1" size={36} />
            <span>Carregando</span>
          </Loading>
        ) : (
          <>
            <Owner>
              <Link to="/">
                <FaChevronLeft />
                <span>Voltar</span>
              </Link>
              <img
                src={repository.owner.avatar_url}
                alt={repository.owner.login}
              />
              <h1>{repository.name}</h1>
              <p>{repository.description}</p>
            </Owner>

            <Tabs>
              {filters.map(f => (
                <Button
                  key={f.type}
                  type="button"
                  active={currentFilter === f.type ? 1 : 0}
                  onClick={() => this.handleFilter(f.type)}
                >
                  {f.name}
                </Button>
              ))}
            </Tabs>

            <IssueList>
              {issues.map(issue => (
                <li key={String(issue.id)}>
                  <img src={issue.user.avatar_url} alt={issue.user.login} />
                  <div>
                    <strong>
                      <a href={issue.html_url}>{issue.title}</a>
                      {issue.labels.map(label => (
                        <span key={String(label.id)}>{label.name}</span>
                      ))}
                    </strong>
                    <p>{issue.user.login}</p>
                  </div>
                </li>
              ))}
            </IssueList>
            <Actions>
              <span className="current">Você está na página {currentPage}</span>
              <Button
                disabled={currentPage === 1 ? 1 : 0}
                onClick={() => this.handlePageChange('prev')}
              >
                <FaChevronLeft />
                <span>Anterior</span>
              </Button>
              <Button onClick={() => this.handlePageChange('next')}>
                <span>Próximo</span>
                <FaChevronRight />
              </Button>
            </Actions>
          </>
        )}
      </Container>
    );
  }
}

Repository.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      repository: PropTypes.string,
    }),
  }).isRequired,
};
